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

    const fileBuffer = req.files[0].buffer;

    zlib.gzip(fileBuffer, (err, result) => {

        if (err) {
            return res.status(100).send();
        }

        res.setHeader("Content-Type", "application/gzip");
        res.end(result);
    });

});


const PORT = process.env.PORT || 3000;

app.listen(PORT);