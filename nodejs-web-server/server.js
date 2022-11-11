const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');

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
                response.end('<h1> Ini adalah halaman homepage! </h1>');
                break;
            default:
                response.statusCode = 400;
                response.end('<h1> Halaman tidak dapat diakses dengan <any> request! </h1>');
                break;
        }
    } else if (url === '/about') {
        switch (method) {
            case 'GET':
                response.statusCode = 200;
                response.end('<h1> Halo ini adalah halaman about! </h1>');
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
                    response.end(`<h1> Halo, ${name}! Ini adalah halaman about </h1>`);
                });
                break;
            default:
                response.statusCode = 400;
                response.end(`<h1> Halaman tidak dapat diakses dengan ${method} request! </h1>`);
                break;
        }
    } else {
        response.statusCode = 404;
        response.end('<h1> Halaman tidak ditemukan!</h1>');
    }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});