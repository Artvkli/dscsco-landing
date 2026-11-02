"""End-to-end QA for the DSCSCO landing page. Prints a JSON report and saves evidence screenshots."""
import json, os, sys, urllib.request
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3123"
Q = os.path.dirname(os.path.abspath(__file__))
SHOTS = os.path.join(Q, "shots"); os.makedirs(SHOTS, exist_ok=True)
LEADS = os.path.join(Q, "leads.jsonl")
R = {}

def check(name, ok, detail=""):
    R.setdefault("checks", []).append({"name": name, "pass": bool(ok), "detail": detail})

def settle(pg, sel):
    last = None
    for _ in range(30):
        pg.wait_for_timeout(150)
        top = pg.evaluate(f"document.querySelector('{sel}').getBoundingClientRect().top")
        if last is not None and abs(top - last) < 1: return top
        last = top
    return last

def leads():
    if not os.path.exists(LEADS): return []
    return [json.loads(l) for l in open(LEADS, encoding="utf-8") if l.strip()]

with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])

    # ---------- 1. Links & CTAs ----------
    for loc in ["fa", "en", "ar"]:
        ctx = b.new_context(viewport={"width": 1440, "height": 900}); pg = ctx.new_page()
        pg.goto(f"{BASE}/{loc}", wait_until="networkidle")
        anchors = pg.evaluate("""() => [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href'))""")
        broken = [h for h in set(anchors) if h != "#" and not pg.evaluate(f"!!document.getElementById('{h[1:]}')")]
        check(f"[{loc}] all {len(anchors)} in-page links have a target", not broken, ", ".join(broken) or "none broken")
        ctas = pg.locator('a[href="#contact"]:visible')
        n = ctas.count(); reached = 0
        for i in range(n):
            pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(100)
            ctas.nth(i).scroll_into_view_if_needed(); ctas.nth(i).click()
            top = settle(pg, "#contact")
            if -5 <= top <= 140: reached += 1
        check(f"[{loc}] every consultation button opens the form ({n} buttons)", n > 0 and reached == n, f"{reached}/{n} reached the form")
        for h in ["#services", "#benefits", "#international", "#process", "#why"]:
            pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(150); pg.locator(f'.navlinks a[href="{h}"]').click()
            top = settle(pg, h)
            check(f"[{loc}] menu link {h} scrolls to its section", -5 <= top <= 140, f"section top at {round(top)}px")
        ext = pg.evaluate("""() => [...document.querySelectorAll('a[href^="http"]')].map(a => a.href)""")
        check(f"[{loc}] external links point to dscsco.com", all(u.startswith("https://dscsco.com") for u in ext), ", ".join(sorted(set(ext))))
        ctx.close()

    # ---------- 2. Language switch & RTL ----------
    ctx = b.new_context(viewport={"width": 1440, "height": 900}); pg = ctx.new_page()
    pg.goto(f"{BASE}/", wait_until="networkidle")
    check("Root address opens Persian by default", pg.url.endswith("/fa"), pg.url)
    expect = {"fa": "rtl", "en": "ltr", "ar": "rtl"}
    for target in ["en", "ar", "fa"]:
        pg.locator(f'.nav .langsw a[hreflang="{target}"]').click(); pg.wait_for_url(f"**/{target}"); pg.wait_for_load_state("networkidle"); pg.wait_for_timeout(1200)
        pg.evaluate("window.scrollTo(0,0)")
        lang, d = pg.evaluate("[document.documentElement.lang, document.documentElement.dir]")
        box = lambda sel: pg.evaluate(f"(()=>{{const r=document.querySelector('{sel}').getBoundingClientRect();return {{x:r.x,width:r.width}}}})()")
        h1 = box("h1"); wrap = box("#top .wrap")
        # In RTL the headline hugs the right edge of the content area; in LTR the left.
        if d == "rtl": aligned = abs((h1["x"] + h1["width"]) - (wrap["x"] + wrap["width"] - 32)) < 40 or h1["x"] + h1["width"] > wrap["x"] + wrap["width"] / 2 + 100
        else: aligned = abs(h1["x"] - (wrap["x"] + 32)) < 40
        brand = box(".nav .brand")
        nav_side = (brand["x"] > 720) if d == "rtl" else (brand["x"] < 720)
        check(f"Switch to {target.upper()}: lang={lang}, dir={d}, text and logo aligned to the correct side",
              lang == target and d == expect[target] and aligned and nav_side, f"url {pg.url}")
        pg.screenshot(path=f"{SHOTS}/lang-{target}.png")
    ctx.close()

    # ---------- 3. Form: real submission end to end ----------
    def form_page(loc, w=390):
        c = b.new_context(viewport={"width": w, "height": 844}, is_mobile=w < 768, has_touch=w < 768); g = c.new_page()
        g.goto(f"{BASE}/{loc}", wait_until="networkidle"); g.locator("#contact").scroll_into_view_if_needed(); return c, g

    ctx, pg = form_page("fa")
    pg.locator("form button[type=submit]").click(); pg.wait_for_timeout(300)
    errs = [e.inner_text() for e in pg.locator(".err").all()]
    check("Empty form is blocked with a clear message on each required field", len(errs) == 3 and pg.locator(".alertbox").count() == 1, " | ".join(errs))
    pg.fill("#f-name", "علی رضایی"); pg.fill("#f-company", "شرکت آزمون"); pg.fill("#f-phone", "abc")
    pg.locator("form button[type=submit]").click(); pg.wait_for_timeout(300)
    check("Invalid phone number is rejected", pg.locator("#e-phone").count() == 1, pg.locator("#e-phone").inner_text() if pg.locator("#e-phone").count() else "")
    before = len(leads())
    pg.fill("#f-phone", "۰۹۱۲ ۳۴۵ ۶۷۸۹")
    pg.locator(".more-btn").click(); pg.fill("#f-email", "ali@test-company.ir"); pg.fill("#f-country", "ایران"); pg.select_option("#f-branches", "6-10"); pg.fill("#f-message", "آزمون ارسال فرم")
    pg.locator("form button[type=submit]").click(); pg.wait_for_selector(".success", timeout=8000)
    ok_msg = pg.locator(".success h3").inner_text()
    got = leads()[before:] if len(leads()) > before else []
    lead = got[-1]["lead"] if got else {}
    check("Valid form is delivered to the company's lead endpoint", bool(got) and lead.get("name") == "علی رضایی" and lead.get("phone") == "09123456789" and lead.get("branches") == "6-10",
          json.dumps({k: lead.get(k) for k in ["name", "company", "phone", "email", "country", "branches", "locale", "receivedAt"]}, ensure_ascii=False))
    check("Delivery is authenticated with the shared secret", got and got[-1]["secret"] == "demo-secret", "x-webhook-secret header received")
    check("Success message is shown after delivery", ok_msg == "درخواست شما ثبت شد", ok_msg)
    pg.screenshot(path=f"{SHOTS}/form-success-fa.png"); ctx.close()

    ctx, pg = form_page("en")
    pg.fill("#f-name", "Sara Ahmadi"); pg.fill("#f-company", "Test Co"); pg.fill("#f-phone", "+971 50 123 4567")
    pg.locator("form button[type=submit]").click(); pg.wait_for_selector(".success", timeout=8000)
    last = leads()[-1]["lead"]
    check("Minimal form (name, company, phone only) is delivered — English page", last.get("name") == "Sara Ahmadi" and last.get("locale") == "en", f"locale={last.get('locale')}, phone={last.get('phone')}")
    ctx.close()

    urllib.request.urlopen("http://127.0.0.1:4010/fail/on").read()
    ctx, pg = form_page("ar")
    n0 = len(leads())
    pg.fill("#f-name", "أحمد علي"); pg.fill("#f-company", "شركة اختبار"); pg.fill("#f-phone", "+971 50 765 4321")
    pg.locator("form button[type=submit]").click(); pg.wait_for_timeout(2500)
    err_box = pg.locator(".alertbox").inner_text() if pg.locator(".alertbox").count() else ""
    kept = pg.input_value("#f-name") == "أحمد علي"
    check("If the company endpoint is down, an error message is shown and the visitor's input is kept",
          "تعذّر" in err_box and kept and len(leads()) == n0, err_box)
    pg.screenshot(path=f"{SHOTS}/form-error-ar.png")
    urllib.request.urlopen("http://127.0.0.1:4010/fail/off").read()
    pg.locator("form button[type=submit]").click(); pg.wait_for_selector(".success", timeout=8000)
    check("Retry succeeds once the endpoint is back", len(leads()) == n0 + 1, "lead recorded on retry")
    ctx.close()

    # ---------- 4. Mobile ----------
    for loc in ["fa", "en", "ar"]:
        ctx = b.new_context(viewport={"width": 360, "height": 780}, is_mobile=True, has_touch=True); pg = ctx.new_page()
        pg.goto(f"{BASE}/{loc}", wait_until="networkidle")
        ov = pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
        minfont = pg.evaluate("""()=>{let m=99;for(const el of document.querySelectorAll('main p, main li, main label, main span, footer a, footer p, footer span')){if(el.closest('.chip,.status,.tag,.cnum,.arch-cap,.promo,.hp,.langbtn,.mono')||!el.textContent.trim())continue;const r=el.getBoundingClientRect();if(!r.width)continue;m=Math.min(m,parseFloat(getComputedStyle(el).fontSize))}return m}""")
        bodyfont = pg.evaluate("""()=>Math.min(...[...document.querySelectorAll('.hero-sub,.lead,.ctext,.btext,.cuse,.points-text,.next-t,.gets li')].filter(e=>e.getBoundingClientRect().width).map(e=>parseFloat(getComputedStyle(e).fontSize)))""")
        btn = pg.locator(".menu-btn"); btn.click(); pg.wait_for_timeout(300)
        opened = pg.locator(".menu-panel").is_visible()
        pg.locator('.menu-links a[href="#contact"]').click()
        top = settle(pg, "#contact")
        closed = not pg.locator(".menu-panel").is_visible()
        small = pg.evaluate("""()=>[...document.querySelectorAll('a,button,input,select,textarea')].filter(e=>{if(e.closest('.hp')||e.classList.contains('skip-link'))return false;const r=e.getBoundingClientRect();return r.width&&r.height&&(r.height<24||r.width<24)}).length""")
        check(f"[{loc}] phone 360px: no sideways scroll, all text ≥14px, body copy ≥16px, tap targets ≥24px",
              ov == 0 and minfont >= 14 and bodyfont >= 16 and small == 0, f"overflow {ov}px, smallest text {minfont}px, smallest body copy {bodyfont}px, small targets {small}")
        check(f"[{loc}] phone menu opens, navigates and closes", opened and closed and -5 <= top <= 140, f"contact top {round(top)}px")
        pg.goto(f"{BASE}/{loc}", wait_until="networkidle"); pg.screenshot(path=f"{SHOTS}/mobile-{loc}.png")
        ctx.close()
    b.close()

passed = sum(c["pass"] for c in R["checks"]); R["summary"] = f"{passed}/{len(R['checks'])} checks passed"
json.dump(R, open(os.path.join(Q, "e2e.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
for c in R["checks"]: print(("PASS " if c["pass"] else "FAIL ") + c["name"] + "  — " + c["detail"])
print(R["summary"])
