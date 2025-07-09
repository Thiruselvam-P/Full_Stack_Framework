const http = require("http");
const fs = require("fs");
const path = require("path");

const products = [
  {
    id: 1,
    name: "T-Shirt",
    description: "Cotton comfort wear – ₹499",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1585386959984-a415522ad83d?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: 2,
    name: "Sneakers",
    description: "Stylish running shoes – ₹999",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1606811841652-c098b0c0c49c?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: 3,
    name: "Watch",
    description: "Smart & elegant – ₹1299",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1518085250887-2f903c200fee?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: 4,
    name: "Backpack",
    description: "Durable & light – ₹799",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1612831455542-d5d54a7e195b?auto=format&fit=crop&w=600&q=60",
  },
];

const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    fs.readFile("./index.html", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading HTML");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/style.css") {
    fs.readFile("./style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
  } else if (req.url === "/api/products") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
