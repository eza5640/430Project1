const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const images = `${__dirname}/../client/images/`;

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCss = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getImages = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html'});
  fs.readdir(images, (err, lemonImages) => {
    if(err)
    {
      console.log(err);
    }
    lemonImages.forEach(file => {
      response.write(`<img src='${images}${file}' alt='${file.toString()}'></img>`);
    });
    response.end();
  });  
}

module.exports.getIndex = getIndex;
module.exports.getCss = getCss;
module.exports.getImages = getImages;
