const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/080526', (req, res) => {
    res.type('text/plain');
    res.send('zltrbns');
});

app.get('/add/:x1/:x2', (req, res) => {
    const x1 = Number(req.params.x1);
    const x2 = Number(req.params.x2);

    res.type('text/plain');
    res.send(String(x1 + x2));
});

app.get('/mpy/:y1/:y2', (req, res) => {
    const y1 = Number(req.params.y1);
    const y2 = Number(req.params.y2);

    res.type('text/plain');
    res.send(String(y1 * y2));
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});