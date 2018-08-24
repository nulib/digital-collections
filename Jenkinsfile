node {
  def tag_name = env.BRANCH_NAME.split('/').last()
  if ( tag_name == "master" ) {
    tag_name = "production"
  }
  checkout scm
  sh "docker run -t -v /home/ec2-user/.aws:/home/node/.aws -v jenkins-data:/var/jenkins_home -e SOURCE=\$(pwd) -e AWS_DEFAULT_PROFILE=${tag_name} nulib/frontend-deploy"
}
