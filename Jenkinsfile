
pipeline {
    agent any

    stages {
        stage('Build npm') {
            steps {
                echo 'Build Gradle'
                dir('frontend') {
                    script {
                        docker.build("${FRONTEND_DOCKER_IMAGE}")
                        sh 'docker volume rm html'
                        sh 'docker volume create html'
                        sh 'docker run --rm -v html:/app/dist --name app ${FRONTEND_DOCKER_IMAGE}'
                    }
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
