const express = require('express');
const fileUpload = require('express-fileUpload');

const app = express ();

app.use(fileUpload());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
};

//Uploading Endpoint
app.post('/upload', allowCrossDomain, (req, res) => {
    if(req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'});

    };


    const file = req.files.file;

    file.mv(`${__dirname}/client/public/upload/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `/upload/${file.name}`});

        
    });
})


app.listen(5000, () => console.log('🚀 server up and ready!')); 