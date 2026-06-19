const http = require("http");
const zlib = require("zlib");


const userLogin = "zltrbns";


function readRequest(req) {
    return new Promise((resolve, reject) => {

        let parts = [];
        req.on("data", chunk => {
            parts.push(chunk);
        });
        req.on("end", () => {
            resolve(Buffer.concat(parts));
        });
        req.on("error", error => {
            reject(error);
        });
    });
}

function extractFile(buffer, type) {

    if (!type.includes("multipart/form-data")) {
        return buffer;
    }
    const boundaryValue = type.split("boundary=")[1];

    if (!boundaryValue) {
        return buffer;
    }
    const boundary = Buffer.from("--" + boundaryValue);

    const headerEnd = buffer.indexOf(
        Buffer.from("\r\n\r\n")
    );

    if (headerEnd < 0) {
        return buffer;
    }
    let content = buffer.slice(headerEnd + 4);

    const boundaryPosition = content.indexOf(boundary);

    if (boundaryPosition >= 0) {
        content = content.slice(0, boundaryPosition - 2);
    }

    return content;
}


const app = http.createServer(async (request, response) => {
    if (request.url === "/login") {
        response.writeHead(200, {
            "Content-Type": "text/plain"
        });

        response.end(userLogin);
        return;
    }



    if (request.url === "/zipper" && request.method === "POST") {
        const requestBody = await readRequest(request);
        const fileData = extractFile(
            requestBody,
            request.headers["content-type"] || ""
        );


        zlib.gzip(fileData, (error, archive) => {
            if (error) {
                response.writeHead(500);
                response.end("gzip error");
                return;
            }

            response.writeHead(200, {
                "Content-Type": "application/gzip",

                "Content-Disposition":
                    "attachment; filename=result.gz"
            });

            response.end(archive);
        });
        return;
    }

    response.writeHead(404);
    response.end("Not found");

});

app.listen(process.env.PORT || 3000);