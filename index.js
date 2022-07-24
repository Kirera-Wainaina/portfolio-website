const http2 = require("http2");
const fs = require("fs");
const path = require("path");

const utils = require("./utils/MIMETypes")

const port = 443;

const server = http2.createSecureServer({
    key: fs.readFileSync("localhost-privkey.pem"),
    cert: fs.readFileSync("localhost-cert.pem")
})

server.listen(port, console.log(`Listening on port ${port}`))

server.on("stream", (stream, headers) => {
    // Respond to incoming requests

    console.log(`${new Date()}, path: ${headers[":path"]}`)
    console.log(headers);
    const filePath = createFilePath(headers[":path"]);
    const mimetype = utils.findMIMETypeFromExtension(path.extname(filePath));

    function onError(error) {
        handleStreamError(error, stream);
    }

    stream.on("error", error => handleStreamError(error))
    
    stream.respondWithFile(
        filePath, 
        { "status": 200, "content-type": mimetype }, 
        { onError });
})

function handleStreamError(error, stream) {
    if (!stream) {
        console.log(error.code);
        return ;
    }
    // Handle error event when responding with file
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


function createFilePath(filePath) {
    // Match incoming request paths to files
    if (filePath == "/") {
        return path.join(__dirname, "/frontend/html/home.html");
    } else {
        return path.join(__dirname, filePath)
    }
}