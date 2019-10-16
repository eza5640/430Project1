const fs = require('fs');
const jsonObj = {};
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const images = `${__dirname}/../client/images/`;

const gen64Asset = (filename) => {
  const readBinary = fs.readFileSync(`${images}${filename}`);
  return Buffer.from(readBinary).toString('base64');
}

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

//will move to jsonResponses if I get time
const getImages = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json'});
  
  let x = 0;
  fs.readdir(images, (err, lemonImages) => {
    if(err)
    {
      console.log(err);
    }
    lemonImages.forEach(file => {
      const img = gen64Asset(file);
      jsonObj[x] = img;
      x = x + 1;
    });
    response.write(JSON.stringify(jsonObj));
      
    let data = JSON.stringify(jsonObj, null, 2);

    fs.writeFile(`imageData.json`, data, (err) => {
      if(err) throw err;
    });
    response.end();
  });

}

module.exports.getIndex = getIndex;
module.exports.getCss = getCss;
module.exports.getImages = getImages;
module.exports.jsonObj = jsonObj;
module.exports.gen64Asset = gen64Asset;