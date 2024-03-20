
pipeline {
    agent any

    stages {
        stage('remove previous docker container and image') {
            steps {
                echo 'Remove Docker Process and Image'
                sh '''if [ "$(docker ps -a -q -f name=docker-frontend)" ]; then
                    docker stop docker-frontend
                    if [ "$(docker ps -aq -f status=exited -f name=docker-frontend)" ]; then
                        docker rm docker-frontend
                    fi
                fi'''
            }
        }
        stage('copy env before build') {
            steps {
                withCredentials([file(credentialsId: 'react-env', variable: 'env')]) {
                    script {
                        sh 'chmod 755 $env'
                        sh 'cp -f -R $env frontend/voda/.env'
                    }
                }
            }
        }
        stage('build npm') {
            steps {
                echo 'Build Npm'
                script {
                    sh 'docker build -t image-frontend .'
                    sh 'docker run -d -v html:/voda/dist --name docker-frontend image-frontend'
                    sh "docker cp image-frontend:/voda/dist frontend"
                }
            }
            post {
                success {
                    echo "build success"
                    // 빌드가 성공했을 때 GitLab에 성공 상태를 알려줌
                    updateGitlabCommitStatus name: 'build', state: 'success'
                }

                failure {
                    echo "build failed"
                    // 빌드가 실패했을 때 GitLab에 실패 상태를 알려줌
                    updateGitlabCommitStatus name: 'build', state: 'failed'
                }
            }
        }
    }
}
