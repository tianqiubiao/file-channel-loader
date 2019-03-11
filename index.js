let fs = require("fs");
let path = require("path");

module.exports = function (source, map, meta) {
    // fs.readFileSync('ccc.js')
    let query =
        this.resourceQuery && this.resourceQuery.replace("?", "") ?
        this.resourceQuery.replace("?", "").split("&") : [],
        queryObj = {};
    if (query.length) {
        query.forEach(item => {
            let obj = item.split("=");
            queryObj[obj[0]] = obj[1];
        });
    }
    let reqList = this.request.split("!");
    let req = reqList[reqList.length - 1];
    req = req.replace(this.resourceQuery, "");
    let channel = "";
    if (queryObj.channel) {
        channel = queryObj.channel + "\\";
    }
    let fileName = null,
        newFilePath = "",
        newfileObject = "",
        filePathList = req.split("\\"),
        fileName = filePathList.pop(),
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
    newFilePath += newfileObject + channel + fileName;
    let text = fs.readFileSync(newFilePath, "utf-8");

    console.log(`1---------------`);
    console.log(source);
    console.log(`1---------------`);
    return `${text}`;
};