pipeline {
    agent any

    stages {
        stage("build") {
            steps {
               echo 'building node applicaton'
            }
        }
          stage("test") {
            when {
                expression {
                    BRANCH_NAME == 'main' || BRANCH_NAME == 'master'
                }
            }
            steps {
                echo 'Testing node applicaton'
            }
        }
          stage("deploy") {
            steps {
                echo 'Deploying node applicaton'
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
