// generally the following code is waiting for an ask, and responding if it knows how to respond 
// if you have outlined a way for it to respond it will do that
// if not, it will give you a 404 
const http = require('http'); // setup server, listen to requests and respond
const fs = require('fs') // look at the disk and grab the module off of the drive
const url = require('url'); // helps look at the url to see what is requested 
const querystring = require('querystring');
const figlet = require('figlet') // figlet has an ascii art 404, any string can be turned into asci art 

// url is the interface

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherpage') {
    fs.readFile('otherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('student' in params){
      if(params['student']== 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "leon",
          status: "Boss Man",
          currentOccupation: "Baller"
        }
        res.end(JSON.stringify(objToJson));
      }//student = leon
      else if(params['student'] != 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "unknown",
          status: "unknown",
          currentOccupation: "unknown"
        }
        res.end(JSON.stringify(objToJson));
      }//student != leon
    }//student if
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
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
});

server.listen(8000);
