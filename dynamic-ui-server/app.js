const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const morgan = require('morgan');
const methodOverride = require('method-override')

const http = require('http');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const unzip = require('unzip');

const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));

app.get('/apps', (req, res) => {
    const getDirectories = sourceName => fs.readdirSync(sourceName).filter(folderName => fs.statSync(path.join(sourceName, folderName)).isDirectory());
    res.json(getDirectories(__dirname + '/public'));
});

app.get('/apps/upload', (req, res) => {
    res.render('index');
});

app.post('/apps/upload', (req, res) => {
    // Creating the upload function using multer config options
    const uploadFunction = multer({
        storage: multer.memoryStorage()
    }).single('appFile');

    uploadFunction(req, res, (err) => {
        const buffer = req.file.buffer; // get the buffer of file before writing it
        const magic = buffer.toString('hex', 0, 4); // bitmap for the first byte of the buffer
        const originalFile = path.parse(req.file.originalname); // original file attributes
        const newFileName = originalFile.name + '-' + Date.now() + originalFile.ext; // new file name with a time stamp

        const ZIP_MAGIC_NUMBER = '504b0304';
        if (magic == ZIP_MAGIC_NUMBER) {
            fs.writeFile('./public/' + newFileName, buffer, 'binary', (err) => {
                if (err) throw err
                // unzip/extract the app file then delete it from the disk storage on the close event
                fs.createReadStream('./public/' + newFileName)
                    .pipe(unzip.Extract({ path: './public/' }))
                    .on('close', () => { fs.unlink('./public/' + newFileName, () => { res.status(200).send(true) }) });
            })
        }
        else {
            res.status(412).send(false);
        }
    })
})

const port = process.env.PORT || 8888
app.listen(port, () => {
    console.log(`server is listening on port ${port}!`);
})