pipeline {
    agent any
    stages {
    	stage('remove previous docker container and image') {
            steps{
            echo 'Remove Docker Process'
		sh '''if [ ! "$(docker ps -a -q -f name=docker-backend)" ]; then
			sudo docker stop docker-backend 
			if [ "$(docker ps -aq -f status=exited -f name=docker-backend)" ]; then
				sudo docker rm docker-backend
			fi
		fi'''
		echo 'Remove Docker Image'
		sh '''if [ -z "$(docker images -q image-backend 2> /dev/null)" ]; then
			sudo docker rmi image-backend
		fi'''
            }
	}
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
                        sh 'cp -f -R $defaultConfigFile backend/src/main/resources/application.yml'
                        sh 'cp -f -R $oauthConfigFile backend/src/main/resources/application-oauth.yml'
                        sh 'cp -f -R $secretConfigFile backend/src/main/resources/application-secret.yml'
                        sh 'cp -f -R $redisConfigFile backend/src/main/resources/application-redis.yml'
                    }
                }
            }
        }

        stage('build gradle') {
            steps {
                echo 'Build Gradle'
                dir('backend') {
                    sh "chmod +x ./gradlew"
                    sh "./gradlew build"
                }
		echo 'Docker Build'
		sh "sudo docker build -t image-backend"
		
		echo 'Docker Run'
		sh "sudo docker run -p 7777:7777 docker-backend"

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
