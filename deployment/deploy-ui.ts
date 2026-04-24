import "dotenv/config";
import * as path from "node:path";
import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || "my-website-bucket";
const DIST_PATH = path.resolve(__dirname, "../dist");

export class MyWebsiteStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the S3 Bucket
    const websiteBucket = new s3.Bucket(this, "epam-shop-bucket", {
      bucketName: S3_BUCKET_NAME,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Create the CloudFront Distribution using OAC
    const distribution = new cloudfront.Distribution(
      this,
      "epam-shop-distribution",
      {
        defaultBehavior: {
          origin: new origins.S3Origin(websiteBucket),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: "index.html",
      }
    );

    // Sync local files to S3 and Invalidate CloudFront Cache
    new s3deploy.BucketDeployment(
      this,
      "epam-shop-deployment-with-invalidation",
      {
        sources: [s3deploy.Source.asset(DIST_PATH)],
        destinationBucket: websiteBucket,
        distribution,
        distributionPaths: ["/*"],
      }
    );
  }
}

const app = new cdk.App();

new MyWebsiteStack(app, "epam-shop-website-stack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
