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
        for (let ContainerName in ContainerListToUpdate) {
            let NewValue = ContainerListToUpdate[ContainerName];
            let ContainerDefinition = taskDefinitionHelper.GetContainerDefinitionByName(TaskDefinition.taskDefinition, ContainerName);
            taskDefinitionHelper.updateDockerImageInContainerDefinition(ContainerDefinition, NewValue);
        }
        let Output = {
            family: TaskDefinition.taskDefinition.family,
            volumes: TaskDefinition.taskDefinition.volumes,
            containerDefinitions: TaskDefinition.taskDefinition.containerDefinitions
        };
        return Output;
    }
}
exports.taskDefinitionHelper = taskDefinitionHelper;
