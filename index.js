const express = require("express");
const multer = require("multer");
const zlib = require("zlib");

const app = express();

const upload = multer();


app.get("/login", (req, res) => {
    res.send("zltrbns");
});


app.post("/zipper", upload.any(), (req, res) => {

    const file = req.files[0];

    zlib.gzip(file.buffer, (err, result) => {

        res.end(result);
    });

});


const PORT = process.env.PORT || 3000;

app.listen(PORT);