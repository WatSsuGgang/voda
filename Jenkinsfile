
sdfsdfs
pipeline {
    agent any
    stages {
        stage('copy yml before build') {
            steps {
                withCredentials([file(credentialsId: 'datasource-credentials', variable: 'dbConfigFile'),
                                 file(credentialsId: 'file-credentials', variable: 'fileConfigFile'),
                                 file(credentialsId: 'file-server-credentials', variable: 'pathConfigFile')]) {
                    script {
                        sh 'chmod 755 $dbConfigFile'
                        sh 'chmod 755 $fileConfigFile'
                        sh 'chmod 755 $pathConfigFile'
                        sh 'cp -f $dbConfigFile backend/src/main/resources/application-datasource.yml'
                        sh 'cp -f $fileConfigFile backend/src/main/resources/application-file.yml'
                        sh 'cp -f $pathConfigFile onterview-storage/src/main/resources/application-path.yml'
                    }
                }
            }
        }
        
        stage('Build Gradle') {
            steps {
                echo 'Build Gradle'
                dir('backend') {
                    sh """
						  chmod +x ./gradlew
						  ./gradlew bootJar
					  """

                    script {
                        docker.build("${BACKEND_DOCKER_IMAGE}")
                    }
                }

                dir('onterview-storage') {
                    sh """
						  chmod +x ./gradlew
						  ./gradlew bootJar
					  """

                    script {
                        docker.build("${FILE_SERVER_DOCKER_IMAGE}")
                    }
                }
            }
            post {
                success {
                    echo "build success"
                    // 빌드가 성공했을 때 GitLab에 성공 상태를 알립니다.
                    updateGitlabCommitStatus name: 'build', state: 'success'
                }
                failure {
                    echo "build failed"
                    // 빌드가 실패했을 때 GitLab에 실패 상태를 알립니다.
                    updateGitlabCommitStatus name: 'build', state: 'failed'
                }
            }
        }
    }
}
