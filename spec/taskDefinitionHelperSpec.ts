import * as AWS from "aws-sdk";
import {taskDefinitionHelper} from "../taskDefinitionHelper";

describe('taskDefinitionHelperSpec class',function(){
    it('updateDockerImageInContainerDefinition() should update Docker Image name',function(){
        let testContainerDefinition : AWS.ECS.ContainerDefinition = {
            "name": "pdfgenerator",
            "image": "lfde\/pdfgenerator:jenkins_5",
            "cpu": 200,
            "memory": 200,
            "portMappings": [
            {
                "containerPort": 3000,
                "hostPort": 0,
                "protocol": "tcp"
            }
            ],
            "essential": true,
            "environment": [
            {
                "name": "LOGGLY_TOKEN",
                "value": "a331509c-342d-4788-a444-9c0c6f76730e"
            }
            ],
            "mountPoints": [
            
            ],
            "volumesFrom": [
            
            ]
        };

        let expectedContainerDefinition : AWS.ECS.ContainerDefinition = {
            "name": "pdfgenerator",
            "image": "lfde\/pdfgenerator:jenkins_6",
            "cpu": 200,
            "memory": 200,
            "portMappings": [
            {
                "containerPort": 3000,
                "hostPort": 0,
                "protocol": "tcp"
            }
            ],
            "essential": true,
            "environment": [
            {
                "name": "LOGGLY_TOKEN",
                "value": "a331509c-342d-4788-a444-9c0c6f76730e"
            }
            ],
            "mountPoints": [
            
            ],
            "volumesFrom": [
            
            ]
        }

        taskDefinitionHelper.updateDockerImageInContainerDefinition(testContainerDefinition,"lfde/pdfgenerator:jenkins_6");

        expect(testContainerDefinition).toEqual(expectedContainerDefinition); 
    });   

    it('GetContainerDefinitionByName() should return ContainerDefinition if name is correct',function(){
        let testTaskDefinition : AWS.ECS.TaskDefinition = {
            "taskDefinitionArn": "arn:aws:ecs:eu-west-1:328859304844:task-definition\/PDFGenerator:5",
            "containerDefinitions": [
            {
                "name": "pdfgenerator",
                "image": "lfde\/pdfgenerator:jenkins_5",
                "cpu": 200,
                "memory": 200,
                "portMappings": [
                {
                    "containerPort": 3000,
                    "hostPort": 0,
                    "protocol": "tcp"
                }
                ],
                "essential": true,
                "environment": [
                {
                    "name": "LOGGLY_TOKEN",
                    "value": "a331509c-342d-4788-a444-9c0c6f76730e"
                }
                ],
                "mountPoints": [
                
                ],
                "volumesFrom": [
                
                ]
            }
            ],
            "family": "PDFGenerator",
            "taskRoleArn": "arn:aws:iam::328859304844:role\/RolePDFGenerator",
            "networkMode": "bridge",
            "revision": 5,
            "volumes": [
            
            ],
            "status": "ACTIVE",
            "requiresAttributes": [
            {
                "name": "com.amazonaws.ecs.capability.task-iam-role"
            }
            ],
            "placementConstraints": [
            
            ]
        }

        let expectedContainer : AWS.ECS.ContainerDefinition = {
            "name": "pdfgenerator",
            "image": "lfde\/pdfgenerator:jenkins_5",
            "cpu": 200,
            "memory": 200,
            "portMappings": [
            {
                "containerPort": 3000,
                "hostPort": 0,
                "protocol": "tcp"
            }
            ],
            "essential": true,
            "environment": [
            {
                "name": "LOGGLY_TOKEN",
                "value": "a331509c-342d-4788-a444-9c0c6f76730e"
            }
            ],
            "mountPoints": [
            
            ],
            "volumesFrom": [
            
            ]
        };
    
        expect(taskDefinitionHelper.GetContainerDefinitionByName(testTaskDefinition,"pdfgenerator")).toEqual(expectedContainer);
    });

    it('GetContainerDefinitionByName() should throw exception if name is not correct',function(){
        let testTaskDefinition : AWS.ECS.TaskDefinition = {
            "taskDefinitionArn": "arn:aws:ecs:eu-west-1:328859304844:task-definition\/PDFGenerator:5",
            "containerDefinitions": [
            {
                "name": "pdfgenerator",
                "image": "lfde\/pdfgenerator:jenkins_5",
                "cpu": 200,
                "memory": 200,
                "portMappings": [
                {
                    "containerPort": 3000,
                    "hostPort": 0,
                    "protocol": "tcp"
                }
                ],
                "essential": true,
                "environment": [
                {
                    "name": "LOGGLY_TOKEN",
                    "value": "a331509c-342d-4788-a444-9c0c6f76730e"
                }
                ],
                "mountPoints": [
                
                ],
                "volumesFrom": [
                
                ]
            }
            ],
            "family": "PDFGenerator",
            "taskRoleArn": "arn:aws:iam::328859304844:role\/RolePDFGenerator",
            "networkMode": "bridge",
            "revision": 5,
            "volumes": [
            
            ],
            "status": "ACTIVE",
            "requiresAttributes": [
            {
                "name": "com.amazonaws.ecs.capability.task-iam-role"
            }
            ],
            "placementConstraints": [
            
            ]
        }

        let expectedContainer : AWS.ECS.ContainerDefinition = {
            "name": "pdfgenerator",
            "image": "lfde\/pdfgenerator:jenkins_5",
            "cpu": 200,
            "memory": 200,
            "portMappings": [
            {
                "containerPort": 3000,
                "hostPort": 0,
                "protocol": "tcp"
            }
            ],
            "essential": true,
            "environment": [
            {
                "name": "LOGGLY_TOKEN",
                "value": "a331509c-342d-4788-a444-9c0c6f76730e"
            }
            ],
            "mountPoints": [
            
            ],
            "volumesFrom": [
            
            ]
        };
    
        expect(function(){
            taskDefinitionHelper.GetContainerDefinitionByName(testTaskDefinition,"pdfgenerator_XXXX");
        }).toThrow();
    });

    it('',function(){
        let testTaskDefinitionResponse : AWS.ECS.DescribeTaskDefinitionResponse = {
            "taskDefinition": {
                "taskDefinitionArn": "arn:aws:ecs:eu-west-1:328859304844:task-definition\/PDFGenerator:5",
                "containerDefinitions": [
                {
                    "name": "pdfgenerator",
                    "image": "lfde\/pdfgenerator:jenkins_5",
                    "cpu": 200,
                    "memory": 200,
                    "portMappings": [
                    {
                        "containerPort": 3000,
                        "hostPort": 0,
                        "protocol": "tcp"
                    }
                    ],
                    "essential": true,
                    "environment": [
                    {
                        "name": "LOGGLY_TOKEN",
                        "value": "a331509c-342d-4788-a444-9c0c6f76730e"
                    }
                    ],
                    "mountPoints": [
                    
                    ],
                    "volumesFrom": [
                    
                    ]
                }
                ],
                "family": "PDFGenerator",
                "taskRoleArn": "arn:aws:iam::328859304844:role\/RolePDFGenerator",
                "networkMode": "bridge",
                "revision": 5,
                "volumes": [
                
                ],
                "status": "ACTIVE",
                "requiresAttributes": [
                {
                    "name": "com.amazonaws.ecs.capability.task-iam-role"
                }
                ],
                "placementConstraints": [
                
                ]
            }
        };

        let expectedRegisterTaskRequest : AWS.ECS.RegisterTaskDefinitionRequest = {
            "containerDefinitions": [
                {
                    "name": "pdfgenerator",
                    "image": "lfde\/pdfgenerator:jenkins_256",
                    "cpu": 200,
                    "memory": 200,
                    "portMappings": [
                    {
                        "containerPort": 3000,
                        "hostPort": 0,
                        "protocol": "tcp"
                    }
                    ],
                    "essential": true,
                    "environment": [
                    {
                        "name": "LOGGLY_TOKEN",
                        "value": "a331509c-342d-4788-a444-9c0c6f76730e"
                    }
                    ],
                    "mountPoints": [
                    
                    ],
                    "volumesFrom": [
                    
                    ]
                }
                ],
                "family": "PDFGenerator",
                "volumes": []
        }

        expect(
            taskDefinitionHelper.GetTaskDefinitionUpdateRequest(
                testTaskDefinitionResponse,
                {"pdfgenerator":"lfde/pdfgenerator:jenkins_256"}
            )
        ).toEqual(expectedRegisterTaskRequest);
    });
    
});