node {
  withCredentials([string(credentialsId: 'honeybadger-glaze', variable: 'api_key')]) {
    def tag_name = env.BRANCH_NAME.split('/').last()
    if ( tag_name == "master" ) {
      tag_name = "production"
    }

    checkout scm
    sh "docker run -t \
      -v /home/ec2-user/.aws:/home/node/.aws \
      -v jenkins-data:/var/jenkins_home \
      -e SOURCE=\$(pwd) \
      -e AWS_DEFAULT_PROFILE=${tag_name} \
      -e REACT_APP_HONEYBADGER_API_KEY=${api_key} \
      -e REACT_APP_HONEYBADGER_ENV=${tag_name} \
      nulib/frontend-deploy"

    def repo = sh(script: "git remote get-url origin", returnStdout: true).trim()
    def sha = sh(script: "git log -n 1 --pretty=format:'%h'", returnStdout: true).trim()
    httpRequest "https://api.honeybadger.io/v1/deploys?api_key=${api_key}&deploy[environment]=${tag_name}&deploy[repository]=${repo}&deploy[local_username]=jenkins&deploy[revision]=${sha}"
  }
}
