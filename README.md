# React-shop-cloudfront

This is frontend starter project for nodejs-aws mentoring program. It uses the following technologies:

- [Vite](https://vitejs.dev/) as a project bundler
- [React](https://beta.reactjs.org/) as a frontend framework
- [React-router-dom](https://reactrouterdotcom.fly.dev/) as a routing library
- [MUI](https://mui.com/) as a UI framework
- [React-query](https://react-query-v3.tanstack.com/) as a data fetching library
- [Formik](https://formik.org/) as a form library
- [Yup](https://github.com/jquense/yup) as a validation schema
- [Vitest](https://vitest.dev/) as a test runner
- [MSW](https://mswjs.io/) as an API mocking library
- [Eslint](https://eslint.org/) as a code linting tool
- [Prettier](https://prettier.io/) as a code formatting tool
- [TypeScript](https://www.typescriptlang.org/) as a type checking tool

## Available Scripts

### `start`

Starts the project in dev mode with mocked API on local environment.

### `build`

Builds the project for production in `dist` folder.

### `preview`

Starts the project in production mode on local environment.

### `test`, `test:ui`, `test:coverage`

Runs tests in console, in browser or with coverage.

### `lint`, `prettier`

Runs linting and formatting for all files in `src` folder.

## Deployment

The UI is deployed with AWS CDK using [deployment/deploy-ui.ts](deployment/deploy-ui.ts).

Deployment stack provisions:

- S3 bucket for static website assets
- CloudFront distribution in front of the bucket
- Automatic upload of `dist` files to S3
- CloudFront cache invalidation after each deployment

Steps to deploy:

- Login to AWS sso specifying profile name
- Export profile name as env variable in terminal `export AWS_PROFILE=${name}`
- `npm run deploy:ui:cdk:bootstrap` 

## Live App

Distributed: https://d1wlashj6d8hir.cloudfront.net/
Direct S3(no Public access): https://s3-aws-shop-epam.s3.eu-north-1.amazonaws.com/index.html
