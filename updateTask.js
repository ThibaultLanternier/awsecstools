"use strict";
const AWS = require("aws-sdk");
const minimist = require("minimist");
const taskDefinitionHelper_1 = require("./taskDefinitionHelper");
var ecsClient = new AWS.ECS({
    region: "eu-west-1",
    apiVersion: "2014-11-13"
});
var requestParams = minimist(process.argv.slice(2));
ecsClient.describeTaskDefinition({
    taskDefinition: requestParams.taskName
}, function (err, data) {
    if (err != null) {
        console.error(err);
    }
    else {
        var containerImageValues = {};
        containerImageValues[requestParams.containerName] = requestParams.dockerImage;
        var UpdateRequest = taskDefinitionHelper_1.taskDefinitionHelper.GetTaskDefinitionUpdateRequest(data, containerImageValues);
        ecsClient.registerTaskDefinition(UpdateRequest, function (err, data) {
            if (err != null) {
                console.error(err);
            }
            else {
                console.log(`${data.taskDefinition.family}:${data.taskDefinition.revision}`);
            }
        });
    }
});
