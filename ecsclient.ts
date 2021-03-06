import * as AWS from "aws-sdk";
import * as minimist from "minimist";
import {taskDefinitionHelper} from './taskDefinitionHelper';

var ecsClient = new AWS.ECS({
    region : "eu-west-1",
    apiVersion : "2014-11-13"
});

interface inputParam{
    _ : string[];
    taskName : string;
    containerName : string;
    dockerImage : string;
}

console.log(minimist(process.argv.slice(2)));
//var argv = parseArgs(args,{});
//ecsClient.registerTaskDefinition({})

ecsClient.describeTaskDefinition({
    taskDefinition : "PDFGenerator"
},function(err,data){
    if(err != null){
        console.error(err);
    }else{
        var UpdateRequest = taskDefinitionHelper.GetTaskDefinitionUpdateRequest(data,{
            "pdfgenerator" : "lfde/pdfgenerator:jenkins_8"
        });

        ecsClient.registerTaskDefinition(UpdateRequest,function(err,data){
            if(err != null){
                console.error(err);
            }else{
                console.log(data);
            }
        });
    }
});

//ecsClient.registerTaskDefinition({})