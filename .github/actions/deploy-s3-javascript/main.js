const core = require('@actions/core');
// const github = require('@actions/github'); gives extra data to get info github.getOctokit()
const exec = require('@actions/exec');

function run() {
    // 1) Get some input values
    const bucket = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true });
    const distFolder = core.getInput('dist-folder', { required: true });

    // github.getOctokit().

    // 2) upload files
    const s3Uri = `s3:://${bucket}`;  
   
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);  //to syncronise local folder to S3 bucket

    const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
    core.setOutput('website-url', websiteUrl);  //::set-output
}

run();