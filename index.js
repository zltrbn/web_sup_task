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

    zlib.gzip(req.file.buffer, (err, result) => {

        if (err) {
            res.status(500).send("error");
            return;
        }

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=result.gz"
        );

        res.send(result);
    });

});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("server started");
});