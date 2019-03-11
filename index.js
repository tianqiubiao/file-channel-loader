let fs = require("fs");
let path = require("path");

module.exports = function (source, map, meta) {
    let query =
        (this.query && this.query.replace("?", "")) ?
        this.query.replace("?", "").split("&") : [],
        queryObj = {};
    if (query.length) {
        query.forEach(item => {
            let obj = item.split("=");
            queryObj[obj[0]] = obj[1];
        });
    }
    let reqList = this.request.split("!");
    let req = reqList[reqList.length - 1];
    req = req.replace(this.query, "");
    let channel = "";
    if (queryObj.undeed) {

    } else if (queryObj.channel) {
        channel = queryObj.channel + "\\";
    } else if (process.env.channel) {
        channel = process.env.channel + "\\";
    } else {
        return `${source}`;
    }
    let newFilePath = "",
        newfileObject = "",
        filePathList = req.split("\\"),
        fileNam = filePathList.pop(),
        urlBack = 0;
    if (queryObj.url) {
        urlBack = queryObj.url.match(/..\//g) ?
            queryObj.url.match(/..\//g).length :
            0;
        newfileObject = queryObj.url.replace(/..\//g, "");
        newfileObject = newfileObject ? newfileObject + "\\" : "";
    }
    for (let i = 0; i < filePathList.length - urlBack; i++) {
        newFilePath += filePathList[i] + "\\";
    }
    newFilePath += newfileObject + channel + fileNam;
    let text = fs.readFileSync(newFilePath, "utf-8");
    return `${text}`;
};