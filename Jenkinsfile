pipeline {
    agent any
    stages {
    	stage('remove previous docker container and image') {
            steps{
            echo 'Remove Docker Process and Image'
		sh '''if [ "$(docker ps -a -q -f name=docker-backend)" ]; then
			docker stop docker-backend 
			if [ "$(docker ps -aq -f status=exited -f name=docker-backend)" ]; then
				docker rm docker-backend
                docker rmi image-backend
			fi
		fi'''
        }
	}
        stage('copy yml before build') {
            steps {
                withCredentials([file(credentialsId: 'application-credentials', variable: 'defaultConfigFile'),
                                 file(credentialsId: 'application-oauth-credentials', variable: 'oauthConfigFile'),
                                 file(credentialsId: 'application-secret-credentials', variable: 'secretConfigFile'),
                                 file(credentialsId: 'application-redis-credentials', variable: 'redisConfigFile'),
				 file(credentialsId: 'application-api-credentials', variable: 'apiConfigFile')]) {
                    script {
                        sh 'chmod 755 $defaultConfigFile'
                        sh 'chmod 755 $oauthConfigFile'
                        sh 'chmod 755 $secretConfigFile'
                        sh 'chmod 755 $redisConfigFile'
			sh 'chmod 755 $apiConfigFile'
                        sh 'cp -f -R $defaultConfigFile backend/src/main/resources/application.yml'
                        sh 'cp -f -R $oauthConfigFile backend/src/main/resources/application-oauth.yml'
                        sh 'cp -f -R $secretConfigFile backend/src/main/resources/application-secret.yml'
                        sh 'cp -f -R $redisConfigFile backend/src/main/resources/application-redis.yml'
			sh 'cp -f -R $apiConfigFile backend/src/main/resources/application-api.yml'
                    }
                }
            }
        }

        stage('build gradle') {
            steps {
                echo 'Build Gradle'
                dir('backend') {
                    sh "chmod +x ./gradlew"
                    sh "./gradlew clean build -x check --parallel"
                }
		echo 'Docker Build'
		sh "docker build --build-arg JAR_FILE=backend/build/libs/voda-0.0.1-SNAPSHOT.jar -t image-backend ."
		
		echo 'Docker Run'
		sh "docker run -d -p 7777:7777 --name docker-backend image-backend"

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
