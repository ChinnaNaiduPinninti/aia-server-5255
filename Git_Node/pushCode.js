const express = require('express');
const fs = require('fs');
var http = require('http');
const {
	exec
} = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const port = 3005;

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.post('/pushCode', (req) => {
  
  const requestBody = req.body;
  console.log(requestBody);
  var branchName = req.body.branchName;
  const branchType=req.body.branchType;
  const message = req.body.message;
   
  const filePath = `/opt/wm/node/clone/projectNames/${branchName}.txt`;
  branchName=branchType+branchName; 
  // Read the file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading the file: ${err}`);
      return;
    }
     const serverName=data;
     var script = exec(`bash /opt/wm/git/push.sh "${branchName},${message},${serverName}"`,
  (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.log(`exec error: ${error}`);
              }
              else {
                  console.log(branchName);
                  console.log(message);
                 console.log(serverName);
                  }
  });
});
  });

 

app.listen(port, () => {
	console.log(`Node.js server listening on port ${port}`);
});