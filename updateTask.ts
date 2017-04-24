import * as AWS from "aws-sdk";
import * as minimist from "minimist";
import {taskDefinitionHelper} from './taskDefinitionHelper';

var ecsClient = new AWS.ECS({
    region : "eu-west-1",
    apiVersion : "2014-11-13"
});

interface updateTaskParam{
    _ : string[];
    taskName : string;
    containerName : string;
    dockerImage : string;
}

var requestParams : updateTaskParam = <updateTaskParam>minimist(process.argv.slice(2));

ecsClient.describeTaskDefinition({
    taskDefinition : requestParams.taskName
},function(err,data){
    if(err != null){
        console.error(err);
    }else{
        var containerImageValues = {};
        containerImageValues[requestParams.containerName] = requestParams.dockerImage;

        var UpdateRequest = taskDefinitionHelper.GetTaskDefinitionUpdateRequest(
            data,
            containerImageValues
        );

        ecsClient.registerTaskDefinition(UpdateRequest,function(err,data){
            if(err != null){
                console.error(err);
            }else{
                console.log(`${data.taskDefinition.family}:${data.taskDefinition.revision}`);
            }
        });
    }
});