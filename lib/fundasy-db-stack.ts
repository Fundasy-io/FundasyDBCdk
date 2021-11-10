//import * as cdk from '@aws-cdk/core';
import { Construct, Duration, Stack, StackProps } from "@aws-cdk/core";
import {
  DatabaseInstance,
  DatabaseInstanceEngine,
  StorageType,
  PostgresEngineVersion,
  Credentials
} from "@aws-cdk/aws-rds";
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  SubnetType,
  Vpc,
  Port
} from "@aws-cdk/aws-ec2";
import * as cdk from "@aws-cdk/core";

export class FundasyDbStack extends Stack {
  readonly postgreSQLInstance: DatabaseInstance;
  readonly creds: Credentials;
  constructor(scope: Construct, id: string, props?: StackProps) { 
    super(scope, id, props);

    this.creds = Credentials.fromGeneratedSecret("postgres");

    const vpc = new Vpc(this, 'Vpc')

    // Place your resource definitions here
    this.postgreSQLInstance = new DatabaseInstance(this, "Instance", {
      engine: DatabaseInstanceEngine.postgres({
        version: PostgresEngineVersion.VER_12_5
      }),
      instanceType: InstanceType.of(
        InstanceClass.BURSTABLE2,
        InstanceSize.MICRO
      ),
      databaseName: "gamma",
      credentials: this.creds,
      port: 42069,
      storageType: StorageType.GP2,
      allocatedStorage: 20,
      multiAz: false,
      vpc: vpc,
      vpcPlacement: { subnetType: SubnetType.PUBLIC },
      backupRetention: Duration.days(0)
    });

    this.postgreSQLInstance.connections.allowFromAnyIpv4(Port.tcp(42069))
  }
}
