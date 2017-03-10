import * as AWS from "aws-sdk";

class taskDefinitionHelper{
    public static updateDockerImageInContainerDefinition(ContainerDefinition : AWS.ECS.ContainerDefinition,DockerImage : string) : void {
        ContainerDefinition.image = DockerImage;
    }

    public static GetContainerDefinitionByName(TaskDefinition : AWS.ECS.TaskDefinition,ContainerName : string) : AWS.ECS.ContainerDefinition{
        for(let ContainerDefinition of TaskDefinition.containerDefinitions){
            if(ContainerDefinition.name == ContainerName){
                return ContainerDefinition;
            }
        }

        throw `Container named ${ContainerName} not found`;
    }

    public static GetTaskDefinitionUpdateRequest(TaskDefinition : AWS.ECS.DescribeTaskDefinitionResponse,ContainerListToUpdate : {[name:string]: string}) : AWS.ECS.RegisterTaskDefinitionRequest{
        for(let ContainerName in ContainerListToUpdate){
            let NewValue = ContainerListToUpdate[ContainerName];

            let ContainerDefinition = taskDefinitionHelper.GetContainerDefinitionByName(TaskDefinition.taskDefinition,ContainerName);
            taskDefinitionHelper.updateDockerImageInContainerDefinition(ContainerDefinition,NewValue);            
        }

        let Output : AWS.ECS.RegisterTaskDefinitionRequest = {
            family : TaskDefinition.taskDefinition.family,
            volumes : TaskDefinition.taskDefinition.volumes,
            containerDefinitions : TaskDefinition.taskDefinition.containerDefinitions
        }

        return Output;
    }
}

export {taskDefinitionHelper};