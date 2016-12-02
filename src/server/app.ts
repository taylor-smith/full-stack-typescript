console.log(`Node version: ${process.env.NODE_ENV}`); // NODE_ENV isn't correct, look this up later

import express from 'express';
import Sql from './sql';

const app = express();

app.use(express.static(process.env.PUBLIC_DIR));

app.get('/presentations', async (req, res) => {
    const sql = new Sql();
    try {
        await sql.open();
        const presentations = await sql.all('SELECT * FROM presentations');
        res.send(presentations);
    } catch (err) {
        res.status(500).send(JSON.stringify(err));
    } finally {
        sql.close()
    }
});

app.get('/presenters', (req, res) => {

});

app.get('/*', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <title>Fullstack Typescript</title>
        <div id="app"></div>
        <script src="client.js"></script>
    `)
})

app.listen(3000, () => {
    console.log(`Listening on port: 3000`);
});
