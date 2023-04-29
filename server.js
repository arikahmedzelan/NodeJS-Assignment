const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
  var filePath = path.join(PUBLIC_DIR, req.url);
  if (req.url === "/") {
    filePath = path.join(PUBLIC_DIR, "index.html");
  }
  fs.access(filePath, (err) => {
    if (err) {
      res.statusCode = 404;
      res.end("404 Not Found");
    } else {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        } else {
          res.end(data);
        }
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
