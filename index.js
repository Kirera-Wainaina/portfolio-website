const http2 = require("http2");
const fs = require("fs");
const path = require("path");

const port = 443;

const server = http2.createSecureServer({
    key: fs.readFileSync("localhost-privkey.pem"),
    cert: fs.readFileSync("localhost-cert.pem")
})

server.listen(port, console.log(`Listening on port ${port}`))

server.on("stream", (stream, headers) => {
    console.log(`{new Date()}, path: ${stream[":path"]}`)
    console.log(headers);
    const filePath = createFilePath(headers[":path"]);
    // stream.respond({ ":status": 200});
    console.log(filePath)
    stream.respondWithFile(
        filePath, 
        { "status": 200 }, 
        { onError });
    
    function onError(error) {
        try {
            if (error.code == "ENOENT") {
                stream.respond({ ":status": 404 });
            } else {
                stream.respond({ ":status": 505})
            }
        } catch (error) {
            console.log(error)
        }
    }
    // stream.end("Personal Website")
})

function createFilePath(filePath) {
    if (filePath == "/") {
        return path.join(__dirname, "/frontend/html/home.html");
    }
}