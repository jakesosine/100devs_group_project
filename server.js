const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

function flipCoin(){
  return Math.ceil(Math.random()*2) === 1 ? 'heads':'tails' 

}
const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  const getPages = (fileName,contentType) => {
    fs.readFile(fileName, function(err, data) {
      res.writeHead(200, {'Content-Type': contentType});
      res.write(data);
      res.end();
      });
  }
  switch (page){
    case '/': 
      getPages('index.html','text/html')
      break;
    case '/otherpage':
      getPages('otherpage.html','text/html')
      break;
    case '/otherotherpage':
      getPages('otherotherpage.html','text/html')
      break;
    case '/css/style.css':
      getPages('css/style.css','')
      break;
    case '/js/main.js':
      getPages('js/main.js','text/javascript')
      break;
    case '/api':
      let personName 
      let personOccupation 
      let personStatus
      let flipValue = flipCoin()
      console.log(params['student'])
      switch(params['student']){
        case 'leon':
          personName = 'leon';
          personOccupation = 'Boss Man';
          personStatus = 'Baller'
          break;
        default: 
          personName = personName;
          personOccupation = personOccupation;
          personStatus = personStatus;
      }
      res.writeHead(200,{'Content-Type':'application/json'});
        const objToJson = {
          name: personName,
          status: personStatus,
          currentOccupation: personOccupation,
          flipStatus: flipValue,
        }
      res.end(JSON.stringify(objToJson))
      break;
    default:
        figlet('404!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.write(data);
        res.end();
      });
    }
  })
server.listen(8000);