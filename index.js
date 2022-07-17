const http2 = require("http2");
const fs = require("fs")

const port = 443;

const server = http2.createSecureServer({
    key: fs.readFileSync("localhost-privkey.pem"),
    cert: fs.readFileSync("localhost-cert.pem")
})

server.listen(port, console.log(`Listening on port ${port}`))

server.on("stream", (stream, headers) => {
    console.log("A request was received")
    stream.respond({ ":status": 200});
    stream.end("Personal Website")
})