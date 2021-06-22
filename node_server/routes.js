const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    res.setHeader('Content-Type', 'text/html');
    if (url === '/') {
        res.write(`<html>
            <head><title>Testing</title></head>
                <body>
                    <h1>Hello! Write your name below please</h1>
                    <form action="/lead" method="POST">
                        <input type="text" name="name" placeholder="Juan Perez">
                        <button type="submit">Send</button>
                    </form>
                </body>
            </html>`)
        return res.end();
    }
    if (url === '/lead' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const name = parsedBody.split('=')[1];
            fs.writeFile('lead.txt', name, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.write(`<html>
            <head><title>Testing</title></head>
                <body>
                    <h1>404</h1>
                    <h2>Path not found</h2>
                </body>
            </html>`)
    return res.end();
}

module.exports = requestHandler;