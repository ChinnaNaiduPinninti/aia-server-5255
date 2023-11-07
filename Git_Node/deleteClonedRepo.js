const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const port = 3006;
app.use(cors());

const corsOptions = {
  origin: 'http://myazedlap0010.aiaazure.biz:3006', // Replace with your frontend's URL
  methods: 'POST',
  allowedHeaders: 'Content-Type',
};

// Handle pre-flight requests for all routes
app.options('*', cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

const fs = require('fs').promises; // Use promises-based filesystem module

app.post('/deleteClonedRepo', async (req, res) => {
  const requestBody = req.body;
  console.log(requestBody);
  const projectName = req.body.projectName;

  const filePath = `/opt/wm/node/projectNames/${projectName}.txt`;

  try {
    // Read the file
    const data = await fs.readFile(filePath, 'utf8');

    // Now, 'data' contains the contents of the file.
    // You can perform your operations on it here.
    console.log('File data:', data);

    // Example: Split the file contents by lines
    const lines = data.split('\n');
    console.log('File lines:', lines);

    // Example: Process each line
    lines.forEach(async (line, index) => {
      console.log(`Line ${index + 1}: ${line.trim()}`);
      if (line.trim() !== '') {
        // Copy the server name from the line
        serverName = line.trim();
        const folderPath = `/opt/wm/git/${serverName}_${projectName}`;
        console.log('Server Name:', serverName);

        // Use try-catch to handle folder deletion
        try {
          await fs.rm(folderPath, { recursive: true });
          console.log(`Folder ${folderPath} deleted successfully.`);
        } catch (error) {
          console.error(`Error deleting folder: ${error.message}`);
        }
      }
    });

    res.json({ message: 'Folders deleted successfully' });
  } catch (error) {
    console.error(`Error reading the file: ${error.message}`);
    res.status(500).json({ error: 'Failed to read the file' });
  }
});

app.listen(port, () => {
  console.log(`Node.js server listening on port ${port}`);
});
