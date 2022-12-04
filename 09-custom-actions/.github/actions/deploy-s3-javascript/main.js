const core = require('@actions/core');
// const github = require('@actions/github'); // this can be used to get other context
const exec = require('@actions/exec');

function run() {
  // 1) Get some input values
  const bucket = core.getInput('bucket', { required: true });
  const bucketRegion = core.getInput('bucket-region', { required: true }); // required: true, because we need it here?
  const distFolder = core.getInput('dist-folder', { required: true });

  // 2) Update file
  const s3Uri = `s3://${bucket}`;
  // exec.exec('aws s3 sync <local-folder> <s3-bucket>)
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  core.notice('Hello from my custom JavaScript Action!');
}

run();
