const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    // Serve index.html
    fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading index.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const data = JSON.parse(body);

      const total =
        data.tamil + data.english + data.maths + data.science + data.social;
      const average = total / 5;
      const pass = [
        data.tamil,
        data.english,
        data.maths,
        data.science,
        data.social,
      ].every((m) => m >= 35);
      const result = pass ? "Pass" : "Fail";

      const response = {
        name: data.name,
        class: data.class,
        total,
        average,
        result,
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(4001, () => {
  console.log("Server running at http://localhost:4001");
});
