```groovy
pipeline {
    agent any
    stages {
        stage('copy yml before build') {
            steps {
                withCredentials([file(credentialsId: 'application-credentials', variable: 'defaultConfigFile'),
									               file(credentialsId: 'application-oauth-credentials', variable: 'oauthConfigFile'),
									               file(credentialsId: 'application-secret-credentials', variable: 'secretConfigFile'),
									               file(credentialsId: 'application-redis-credentials', variable: 'redisConfigFile')]) {
                    script {
                        sh 'chmod 755 $defaultConfigFile'
                        sh 'chmod 755 $oauthConfigFile'
                        sh 'chmod 755 $secretConfigFile'
                        sh 'chmod 755 $redisConfigFile'
                        sh 'cp -f $defaultConfigFile backend/src/main/resources/application.yml'
                        sh 'cp -f $oauthConfigFile backend/src/main/resources/application-oauth.yml'
                        sh 'cp -f $secretConfigFile backend/src/main/resources/application-secret.yml'
                        sh 'cp -f $redisConfigFile backend/src/main/resources/application-redis.yml'
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
```
