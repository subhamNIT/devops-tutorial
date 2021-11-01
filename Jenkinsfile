pipeline {
    agent any
    parameters {
    choice(
      name: 'version', choices: ['1.3.0', '1.2.3'],
      description:
        'Select which version'
    )
    booleanParam(name: 'executeTests', defaultValue: true, description: '')
    }
    // tools {
    //     maven "Maven"
    // }
    environment {
        NEW_VERSION = '1.3.0'
        SERVER_CREDENTIALS = credentials('admin')
    }
    stages {
        stage("build") {
            steps {
               echo 'building node applicaton'
            }
        }
          stage("test") {
            when {
                expression {
                  //  BRANCH_NAME == 'main' || BRANCH_NAME == 'master'
                    params.executeTests
                }
            }
            steps {
                echo 'Testing node applicaton'
            }
        }
          stage("deploy") {
            steps {
                echo 'Deploying node applicaton'
                echo "Deploying version ${params.version}"
                // echo "deploy with ${SERVER_CREDENTIALS}"
                // sh "${SERVER_CREDENTIALS}"
                // withCredentials ([
                //     usernamePassword(credentials: 'admin', usernameVariable: USER, passwordVariable: PWD)
                // ]) {
                //     sh "some script ${USER} ${PWD}"
                // }
            }
        }
    }
    post {
        always {
            echo 'Always Stage'
        }
        success {
            echo 'Success Stage'
        }
        failure {
            echo 'Failure Stage'
        }
    }
}
