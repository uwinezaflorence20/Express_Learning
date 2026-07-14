const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    if (req.method === "GET") {
        fs.readFile("output.txt", "utf8", (data, err) => {
            if (err) {
                res.writeHead(500);
                return res.end("error while reading the file")
            }
            res.writeHead(200, { "content-type": "text/plain" });
            res.end(data);
        })
    }

    if (req.method === "POST") {
        let data = "";
        res.on("data", chunk => {
            data += chunk;
        });

        req.on("end", () => {
            fs.writeFile("output.txt", data, (err) => {
                if (err) {
                    res.writeHead(500);
                    return res.end("error while writting the file")
                }
                res.writeHead(201);
                res.end("Data saved!!!");
            })
        })

    }

    else{
        res.writeHead(404);
        res.end("Not Found");
    }

    server.listen(4000,()=>{
        console.log("This is runnig locally on port 4000")
    })
})
