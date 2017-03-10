import * as AWS from "aws-sdk";

var ecsClient = new AWS.ECS({
    region : "eu-west-1",
    apiVersion : "2014-11-13"
});

//ecsClient.registerTaskDefinition({})

ecsClient.describeTaskDefinition({
    taskDefinition : "PDFGenerator"
},function(err,data){
    if(err != null){
        console.error(err);
    }else{
        console.log(JSON.stringify(data)); 
    }
});

//ecsClient.registerTaskDefinition({})