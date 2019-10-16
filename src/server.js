const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCss,
  '/getLemons': htmlHandler.getImages,
  '/addLemon': jsonHandler.addLemon,
  '/getUsersMeta': jsonHandler.getUsersMeta,
  '/notFoundMeta': jsonHandler.notFoundMeta,
  notFound: jsonHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  if (parsedUrl.pathname === '/addLemon') {
    const params = query.parse(parsedUrl.query);
    console.dir(params);
    urlStruct[parsedUrl.pathname](request, response, params);
  }
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response);
  } else {
    urlStruct.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

// console.log(`Listening on 127.0.0.1: ${port}`);
