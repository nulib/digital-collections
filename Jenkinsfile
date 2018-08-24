node {
  def tag_name = env.BRANCH_NAME.split('/').last()
  if ( tag_name == "master" ) {
    tag_name = "production"
  }
  checkout scm

  BUILDFLAGS = sh (
    script: "aws --profile ${tag_name} --region us-east-1 ssm get-parameters-by-path --recursive --path \'/stack-glaze\' | jq -r \'.Parameters | map(\"-e \" + (.Name / \"/\"|last|ascii_upcase) + \"=\" + (.Value)) | join(\" \")\'",
    returnStdout: true
  ).trim()

  sh "docker run -t -v ${HOME}/.aws:/home/node/.aws -v $(pwd):/home/node/app -e AWS_DEFAULT_PROFILE=${tag_name} ${BUILDFLAGS} nulib/frontend-deploy"
}
