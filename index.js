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
        return res.status(400).send("No file");
    }

    zlib.gzip(req.files[0].buffer, (err, result) => {

        if (err) {
            return res.status(500).send("gzip error");
        }

        res.writeHead(200, {
            "Content-Type": "application/gzip",
            "Content-Disposition": "attachment; filename=result.gz",
            "Content-Length": result.length
        });

        res.end(result);
    });

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started ${PORT}`);
});