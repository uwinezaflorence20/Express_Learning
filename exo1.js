const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    // GET: Read input.txt
    if (req.method === "GET") {
        fs.readFile("input.txt", "utf8", (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end("Error reading file");
            }

            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end(data);
        });
    }

    // POST: Write data to output.txt
    else if (req.method === "POST") {
        let data = "";

        req.on("data", chunk => {
            data += chunk;
        });

        req.on("end", () => {
            fs.writeFile("output.txt", data, (err) => {
                if (err) {
                    res.writeHead(500);
                    return res.end("Error writing file");
                }

                res.writeHead(201);
                res.end("Data saved");
            });
        });
    }

    else {
        res.writeHead(404);
        res.end("Not found");
    }

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});