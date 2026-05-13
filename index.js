const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/login', (req, res) => {
    res.type('text/plain');
    res.send('zltrbns');
});

app.get('/id/:N', async (req, res) => {
    try {
        const { N } = req.params;

        const response = await fetch(`https://nd.kodaktor.ru/users/${N}`);

        const data = await response.json();

        res.type('text/plain');
        res.send(data.login);
    } catch (error) {
        res.status(500).send('Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});