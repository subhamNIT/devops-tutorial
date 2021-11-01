pipeline {
    agent any
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
            // when {
            //     expression {
            //         BRANCH_NAME == 'main' || BRANCH_NAME == 'master'
            //     }
            // }
            steps {
                echo 'Testing node applicaton'
            }
        }
          stage("deploy") {
            steps {
                echo 'Deploying node applicaton'
                echo "deploy with ${SERVER_CREDENTIALS}"
                sh "${SERVER_CREDENTIALS}"
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
