// Stand-in for the company's lead endpoint (CRM / email service). Records every lead it receives.
const http = require("http"); const fs = require("fs");
let fail = false; const log = process.argv[2];
http.createServer((req, res) => {
  if (req.url === "/fail/on") { fail = true; return res.end("fail on"); }
  if (req.url === "/fail/off") { fail = false; return res.end("fail off"); }
  let body = ""; req.on("data", c => body += c); req.on("end", () => {
    if (fail) { res.statusCode = 500; return res.end("down"); }
    fs.appendFileSync(log, JSON.stringify({ secret: req.headers["x-webhook-secret"] || null, lead: JSON.parse(body) }) + "\n");
    res.setHeader("content-type", "application/json"); res.end('{"ok":true}');
  });
}).listen(4010, () => console.log("webhook on 4010"));
