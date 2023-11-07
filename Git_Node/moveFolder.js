const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process'); // Import execSync
const bodyParser = require('body-parser');

const app = express();
const port = 3003;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public')); // Fix the missing closing parenthesis here
app.use(bodyParser.json());
app.post('/moveFolder', (req, res) => {
  const requestBody = req.body;
  console.log(requestBody);
  const packageName = req.body.packageName;
  const serverName = req.body.serverName;
  const projectName = req.body.projectName;

  const source = '/opt/wm/is1015/IntegrationServer/instances/esb_5255/packages/';
  const destination = `/opt/wm/git/${serverName}_${projectName}/${serverName}/IS/packages/`;

  const destinationPackageDir = path.join(destination);

  try {

    // Copy the package contents
    execSync(`rsync -av ${path.join(source, packageName)} ${destinationPackageDir}`, {
      stdio: 'inherit',
    });

    console.log(`Package '${packageName}' copied successfully to '${destinationPackageDir}'`);
    res.send(200);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
});

app.listen(port, () => {
  console.log(`Node.js server listening on port ${port}`);
});
