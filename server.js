const http = require('http');
const url = require('url')
const fs = require('fs')
const server = new http.Server();

server.listen(1337, '127.0.0.1');

let counter = 0

server.on('request', function (req, res) {
  let info
  console.log(req.method, req.url)

  const urlParsed = url.parse(req.url, true);
  console.log(urlParsed)
  if (req.url === '/') {
    try {
      info = fs.readFileSync('index.html');
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      res.end('На сервере произошла ошибка');
      return
    }
      res.end(info);
  }
  // if (urlParsed.pathname === '/echo' && urlParsed.query.message) {
  //   res.end(urlParsed.query.message);
  // } else {
  //   res.statusCode = 404;
  //   res.end("Page not found Beach!")
  // }
  res.end();
})
