const express = require("express");
const multer = require("multer");
const zlib = require("zlib");

const app = express();

const upload = multer({
    storage: multer.memoryStorage()
});


app.get("/login", (req, res) => {
    res.send("zltrbns");
});


app.post("/zipper", upload.any(), (req, res) => {

    if (!req.files || req.files.length === 0) {
        console.log(req.body);
        console.log(req.files);
        return res.status(404).end();
    }

    const original = req.files[0].buffer;

    zlib.gzip(original, (err, compressed) => {

        if (err) {
            return res.status(500).end();
        }

        res.writeHead(200, {
            "Content-Type": "application/octet-stream",
            "Content-Length": compressed.length
        });

        res.end(compressed);
    });

});


const PORT = process.env.PORT || 3000;

app.listen(PORT);