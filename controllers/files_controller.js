//include files model
const Files = require('../models/files');
//include csvtojson file
const csv = require('csvtojson');
//include file system library
const fs = require('fs');
//include path library
const path = require('path');


//upload a file to the server
module.exports.uploadFile = async function (req, res) {
    try {
        //if the request has the file
        if (req.file) {
            //extract file parameters
            let fileName = req.file.originalname;
            fileName = path.parse(fileName).name;
            //create a new file
            await Files.create({
                name: fileName,
                path: req.file.filename
            });
        }

        //return success response
        return res.render('home', {
            path: "home",
            title: "Home | CSV Visualizer",
            message: "File uploaded successfuly"
        });
    } catch (err) {
        return res.render('home', {
            path: "home",
            title: "Home | CSV Visualizer",
            message: "File upload failed"
        });
    }
}

//retrieve all files
module.exports.displayAllFiles = async function (req, res) {
    try {
        //get all files
        let allFiles = await Files.find({});

        //return all files 
        return res.render('files', {
            title: "All Files",
            path: "files",
            files: allFiles
        });
    } catch (err) {
        return res.redirect('back');
    }
}

//retrieve content of a specified file
module.exports.openFile = async function (req, res) {
    try {
        //find the file document
        let fileObject = await Files.findById(req.params.id).limit(50);

        //calculate file path
        let csvFilePath = path.join(__dirname, '../', 'uploads/', fileObject.path);

        //convert data from csv to json array
        const jsonArray = await csv().fromFile(csvFilePath);

        //return success message with json data
        return res.render('visualizer', {
            title: "Visualizer",
            path: "visualizer",
            name: fileObject.name,
            jsonArray: jsonArray
        });
    } catch (err) {
        //if error
        return res.redirect('back');
    }
}