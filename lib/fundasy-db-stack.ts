import * as cdk from '@aws-cdk/core';
import { VpcStack } from "../lib/vpc-stack";
import { RDSStack } from "../lib/rds-stack";

export class FundasyDbStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) { 
    super(scope, id, props);

    const vpcStackEntity = new VpcStack(this, "VpcStack");

    const rdsStack = new RDSStack(this, "RDSStack", {
      vpc: vpcStackEntity.vpc
    });
  }
}
