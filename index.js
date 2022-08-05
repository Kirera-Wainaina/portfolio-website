const http2 = require("http2");
const http = require("http");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv")

const utils = require("./utils/MIMETypes")

const port = process.env.PORT || 443;
const httpPort = 80;
dotenv.config();


const productionOptions = {
    key:  fs.readFileSync(`${process.env.CERTPATH}/privkey.pem`, "utf8"),
    cert: fs.readFileSync(`${process.env.CERTPATH}/fullchain.pem`, "utf8"),
    ca: fs.readFileSync(`${process.env.CERTPATH}/chain.pem`, "utf8"),
    allowHTTP1: true    
}

const devOptions = {
    key: fs.readFileSync("localhost-privkey.pem"),
    cert: fs.readFileSync("localhost-cert.pem"),
    allowHTTP1: true
}

function getOptions(){
    if (process.env.ENVIROMENT == "dev") {
        return devOptions;
    } else {
        return productionOptions;
    }    
}

const server = http2.createSecureServer(getOptions())

server.listen(port, console.log(`Listening on port ${port}`))

server.on("stream", (stream, headers) => {
    // Respond to incoming requests

    console.log(`${new Date()}, path: ${headers[":path"]}`)
    // console.log(headers);
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

server.on("error", error => {
    handleStreamError(error);
})

const httpServer = http.createServer((request, response) => {
    response
        .writeHead(301, { "Location": `https://${request.headers.host}${request.url}`})
        .end()
});
httpServer.listen(httpPort, console.log("Received a http request"));

process.on("uncaughtException", (error, origin) => {
    console.log("This error was caught by the process!");
    console.log(error);
    console.log(origin);
});

function handleStreamError(error, stream) {
    console.log("This error was caught")
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