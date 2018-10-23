import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as cloud from "@pulumi/cloud-aws";
import * as awsinfra from "@pulumi/aws-infra";

let service = new cloud.Service("testService", {
    containers: {
        nginx: {
            image: "nginx",
            memory: 512,
            ports: [
                { port: 80 }
            ],
        },
        
    },
    replicas: 1
});


const network = cloud.getOrCreateNetwork()

let disco = new aws.servicediscovery.PrivateDnsNamespace("test", {
    description: "test",
    name: "test",
    vpc: network.vpcId
}, { dependsOn: [service] });

export const svc = service;
export const vpcId = network.vpcId;