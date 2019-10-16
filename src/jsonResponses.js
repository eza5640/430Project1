const global = require('./htmlResponses');
const fs = require('fs');
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getLemons = (request, response) => {
  const responseJSON = {
    lemons,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getLemonsMeta = (request, response) => respondJSONMeta(request, response, 200);

const addLemon = (request, response, params) => {
// if (lemons[newUser.name]) {
//   lemons[newUser.name] = newUser;
//   return respondJSON(request, response, 204, newUser);
// }
// lemons[newUser.name] = newUser;
  if(params && params.uID != "")
  {
    let numElements = Object.keys(global.jsonObj).length;
    global.jsonObj[numElements] = global.gen64Asset(`${params.uID}`);
  }
  //global.jsonObj[numElements] = newObject;
  respondJSON(request, response, 201, global.jsonObj);
};
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  addLemon,
  notFound,
  getLemons,
  getLemonsMeta,
  notFoundMeta,
};
