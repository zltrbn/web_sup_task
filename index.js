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


app.post("/zipper", upload.single("file"), (req, res) => {

    if (!req.file) {
        return res.status(400).send("File not found");
    }

    zlib.gzip(req.file.buffer, (err, compressed) => {

        if (err) {
            return res.status(500).send("Compression error");
        }

        res.setHeader(
            "Content-Type",
            "application/gzip"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=result.gz"
        );

        res.end(compressed);
    });

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});