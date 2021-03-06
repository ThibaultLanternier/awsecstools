"use strict";
const AWS = require("aws-sdk");
const minimist = require("minimist");
const taskDefinitionHelper_1 = require("./taskDefinitionHelper");
var ecsClient = new AWS.ECS({
    region: "eu-west-1",
    apiVersion: "2014-11-13"
});
console.log(minimist(process.argv.slice(2)));
//var argv = parseArgs(args,{});
//ecsClient.registerTaskDefinition({})
ecsClient.describeTaskDefinition({
    taskDefinition: "PDFGenerator"
}, function (err, data) {
    if (err != null) {
        console.error(err);
    }
    else {
        var UpdateRequest = taskDefinitionHelper_1.taskDefinitionHelper.GetTaskDefinitionUpdateRequest(data, {
            "pdfgenerator": "lfde/pdfgenerator:jenkins_8"
        });
        ecsClient.registerTaskDefinition(UpdateRequest, function (err, data) {
            if (err != null) {
                console.error(err);
            }
            else {
                console.log(data);
            }
        });
    }
});
//ecsClient.registerTaskDefinition({}) 
