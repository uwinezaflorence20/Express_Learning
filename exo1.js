// You are tasked with creating a basic Node.js server using the http module. 
// The server should be capable of handling two types of requests:

// GET Request: When a user sends a GET request to the server, the server should read 
// the contents of a file named input.txt
//  located in the same directory as your server script and send its contents as the response.
// POST Request: When a user sends a POST request to the server with data in the body, 
// the server
//  should write that data into a file named output.txt in the same directory.

// You can choose to implement the file operations (reading and writing) 
// either using the standard Node.js fs (File System) module or by using streams 
// for handling large files more efficiently.

// Requirements:

// Create a server using the http module.
// Handle GET and POST requests as described.
// Use the fs module to read from and write to files.
// Implement the functionality using streams if you want to handle large files more efficiently.

// Bonus:

// Ensure that the server returns appropriate status codes and error messages in case 
//  of any file operation failures.

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