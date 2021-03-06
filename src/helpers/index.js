const fs   = require('fs-extra-promise');
const path = require('path');
const jwt            = require('jsonwebtoken');

exports.pathToFile = (pathToFile) => {
    return path.join(process.env.PWD, 'views', pathToFile);
};

exports.getFiles = function (fileNamesArray) {
    return Promise.all(
        fileNamesArray.map(fileName => fs.readFileAsync(
            path.join(process.env.PWD, 'views', fileName))
        )
    );
};

exports.decodeToken = token => {
    try {
        return jwt.verify(token, 'CHANGE-THIS-SECRET');
    } catch(err) {
        return { err };
    }
};

exports.getOpenTaskIdFromEvents = eventsArray => {
    console.log(eventsArray);
    const taskIdsObject = eventsArray.reduce((acc, curr) => { // Get taskId values only
        if(curr.taskId) acc.push(curr.taskId);
        return acc;
    },[])
    .reduce((acc, curr) => { // Count tasks of same taskId
        acc[curr] = (acc[curr] || 0) +1;
        return acc;
    },{});

    return Object.keys(taskIdsObject).filter(key => taskIdsObject[key] == 1)[0];
};

exports.isProcessAvailable = eventsArray => !eventsArray.filter(el => el.type == 'endEvent').length;

exports.validateFilesExtension = files => {
    const formats = ['pdf', 'png'];

    // Array of attachments with wrong format
    return !!files.filter(el => {
        return !formats.includes(el.mimetype.split('/')[1]) ? el : false;
    }).length;
};