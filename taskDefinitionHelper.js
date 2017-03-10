"use strict";
class taskDefinitionHelper {
    static updateDockerImageInContainerDefinition(ContainerDefinition, DockerImage) {
        ContainerDefinition.image = DockerImage;
    }
    static GetContainerDefinitionByName(TaskDefinition, ContainerName) {
        for (let ContainerDefinition of TaskDefinition.containerDefinitions) {
            if (ContainerDefinition.name == ContainerName) {
                return ContainerDefinition;
            }
        }
        throw `Container named ${ContainerName} not found`;
    }
    static GetTaskDefinitionUpdateRequest(TaskDefinition, ContainerListToUpdate) {
        //for(let con)
    }
}
exports.taskDefinitionHelper = taskDefinitionHelper;
