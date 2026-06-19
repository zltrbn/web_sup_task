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

    console.log(req.body);
    console.log(req.files);

    res.send("ok");

});


const PORT = process.env.PORT || 3000;

app.listen(PORT);