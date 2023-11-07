const fs = require('fs').promises; // Use promises-based filesystem module

const express = require('express');

var http = require('http');

const bodyParser = require('body-parser');

const app = express();

const port = 3000;

const regex = /^\S+$/; //regex for null or empty or white space

const cors = require('cors');

const { exec } = require('child_process');

app.use(cors());

 

const corsOptions = {

  origin: 'http://myazedlap0010.aiaazure.biz:3000', // Replace with your frontend's URL

  methods: 'POST',

  allowedHeaders: 'Content-Type',

};

 

// Handle pre-flight requests for all routes

app.options('*', cors(corsOptions));

 

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
// Endpoint for Git clone operation
app.post('/executeGitClone', (req, res) => {
    const serverName = req.body.serverName;
    const repositoryName = req.body.repositoryName;
    const ProjectName = req.body.ProjectName;
    // Construct the Git clone command
    const gitCloneCommand = `git clone https://vishnusangaraju@bitbucket.org/myaia/${serverName}.git`;
    var script= exec(`bash /opt/wm/git/git-clone-script.sh "${gitCloneCommand}" "${serverName}" "${ProjectName}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing git clone: ${error.message}`);
            res.status(500).send(`Error executing git clone: ${error.message}`);
        } else {
            console.log(`Git clone command output: Success`);
        }
    });
});
// Endpoint for copying files
app.post('/copyFiles', (req, res) => {
    const requestBody = req.body;
    console.log(requestBody);
    const srcDir = req.body.srcDir;
    const destDir = req.body.destDir;
    console.log(srcDir);
    console.log(destDir);
    var script = exec(`bash /opt/wm/git/copyFiles.sh "${srcDir},${destDir}"`,
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            } else {
                res.send('Moved package');
            }
        });
});
// Endpoint for moving folders
app.post('/moveFolder', (req, res) => {
    const requestBody = req.body;
    console.log(requestBody);
    const packageName = req.body.packageName;
    const serverName = req.body.serverName;
    var script = exec(`bash /opt/wm/git/moveFolder.sh "${packageName},${serverName}"`,
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            } else {
                console.log(packageName);
                res.send('Moved package');
            }
        });
});
// Endpoint for creating a branch
app.post("/createBranch", (req, res) => {
    const branchName = req.body.projectName;
  
    const branchCategory = req.body.branchCategory;
  
    const branchType = req.body.branchType;
  
    const serverName = req.body.serverName;
  
    // Directory where you want to save the file
  
    const directoryPath = "/opt/wm/node/clone/projectNames"; // Replace with the actual directory path
  
    // File name
  
    const fileName = `${branchName}`;
  
    // Combine the server and project names
  
    const content = `${serverName}`;
  
    fs.writeFile(`${directoryPath}/${fileName}.txt`, content, "utf-8")
  
      .then(() => {
        console.log(
          `Server and Project names have been saved to ${directoryPath}/${fileName}`
        );
      })
  
      .catch((err) => {
        console.error(`Error while saving the file: ${err}`);
      });
  
    console.log(`${branchType}`);
  
    console.log(`${branchCategory}`);
  
    console.log(`${serverName}`);
  
    console.log(`${branchName}`);
  
    if (regex.test(branchName)) {
      if (branchCategory == "develop") {
        if (
          branchType == "bugfix/" ||
          branchType == "hotfix/" ||
          branchType == "release/" ||
          branchType == "other" ||
          branchType == "feature/"
        )
          var script = exec(
            `bash /opt/wm/git/git-createBranch-script.sh "${branchName},${serverName},${branchType},${branchCategory}"`,
  
            (error, stdout, stderr) => {
              console.log(stdout);
  
              console.log(stderr);
  
              if (error !== null) {
                console.log(`exec error: ${error}`);
              } else {
                res.send(`Branch Created Successfully In Develop`);
  
                console.log("project created");
              }
            }
          );
      } else if (branchCategory == "master") {
        if (
          branchType == "bugfix/" ||
          branchType == "hotfix/" ||
          branchType == "release/" ||
          branchType == "other"
        ) {
          var script = exec(
              `bash /opt/wm/git/git-createBranch-script.sh "${branchName},${serverName},${branchType},${branchCategory}"`,
  
            (error, stdout, stderr) => {
              console.log(stdout);
  
              console.log(stderr);
  
              if (error !== null) {
                console.log(`exec error: ${error}`);
              } else {
                res.send(`Branch Created Successfully In Master`);
  
                console.log("project created");
              }
            }
          );
        } else {
          res.send(`Branch Not Created`);
  
          console.log("project not created");
        }
      } else {
        res.send(`Branch Not Created`);
  
        console.log("project not created");
      }
    } else {
      res.send(`Branch Not Created`);
  
      console.log("project not created");
    }
  });
  
app.listen(port, () => {
    console.log(`Node.js server listening on port ${port}`);
});