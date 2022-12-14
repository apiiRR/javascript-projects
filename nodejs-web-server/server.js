const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');

    const { method, url } = request;

    // if (method === 'GET') {
    //     response.end('<h1>Hello!</h1>');
    // }

    // if (method === 'POST') {
    //     let body = [];

    //     request.on('data', (chunk) => {
    //         body.push(chunk);
    //     });

    //     request.on('end', () => {
    //         body = Buffer.concat(body).toString();
    //         const { name } = JSON.parse(body);
    //         response.end(`<h1>Hai, ${name}!</h1>`);
    //     });
    // }

    if (url === '/') {
        switch (method) {
            case 'GET':
                response.statusCode = 200;
                response.end(JSON.stringify({ message: 'Ini adalah homepage' }))
                break;
            default:
                response.statusCode = 400;
                response.end(JSON.stringify({ message: `Halaman tidak dapat diakses dengan ${method} request` }));
                break;
        }
    } else if (url === '/about') {
        switch (method) {
            case 'GET':
                response.statusCode = 200;
                response.end(JSON.stringify({ message: 'Halo! ini adalah halaman about' }));
                break;
            case 'POST':
                let body = [];

                request.on('data', (chunk) => {
                    body.push(chunk);
                });

                request.on('end', () => {
                    body = Buffer.concat(body).toString();
                    const { name } = JSON.parse(body);
                    response.statusCode = 200;
                    response.end(JSON.stringify({ message: `Halo, ${name}! Ini adalah halaman about!` }));
                });
                break;
            default:
                response.statusCode = 400;
                response.end(`<h1> Halaman tidak dapat diakses dengan ${method} request! </h1>`);
                break;
        }
    } else {
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!'
        }));
    }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});