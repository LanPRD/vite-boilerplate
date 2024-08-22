const aws = require("aws-sdk");
const config = { apiVersion: "latest", region: "us-east-1" };

const stage = process.argv[2];

if (!stage) {
  console.log("Missing stage param [ prod | dev | beta ]");
  process.exit(0);
}

const cloudFronts = {
  dev: [""],
  prod: [""]
};

const cloudFront = new aws.CloudFront(config);

const updateLambdaVersion = async Id => {
  console.log(`Invalidating cache from ${Id}`);
  await cloudFront
    .createInvalidation({
      DistributionId: Id,
      InvalidationBatch: { CallerReference: `${new Date().valueOf()}`, Paths: { Quantity: 1, Items: ["/*"] } }
    })
    .promise();
};

const executeDeploy = async () => {
  for (const cf of cloudFronts[stage]) {
    await updateLambdaVersion(cf).catch(err => console.log(err));
  }
};

try {
  executeDeploy();
} catch (error) {
  console.log(error);
}
