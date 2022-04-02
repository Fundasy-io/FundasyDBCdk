## Killing connections to DB

View connections
```
=> SELECT pid, client_addr, state, application_name, backend_start FROM pg_stat_activity;
```

Killing connections
```
=> SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE client_addr='<ip address>' AND state='idle';
```

# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
