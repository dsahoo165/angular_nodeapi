pipeline {
    agent any

    stages {
        stage('Install'){
            steps {                
              sh 'npm install --legacy-peer-deps'              
            }
        }

        stage('Build'){
            steps {
              sh "npm run build"
            }
        }

        stage('Deploy') {            
            steps {
		    sh 'pwd'
		    sh 'ls'
                //sh 'docker ps -a'
                withCredentials([[
                   $class:'AmazonWebServicesCredentialsBinding',
                   credentialsId:'jenkins-user',
                   accessKeyVariable:'AWS_ACCESS_KEY_ID',
                   secretKeyVariable:'AWS_SECRET_ACCESS_KEY'
                   ]]){
			
                        // When using a GString at least later Jenkins versions could only handle the env.WORKSPACE variant:
                        echo "Current workspace is ${env.WORKSPACE}"

                        // the current Jenkins instances will support the short syntax, too:
                        echo "Current workspace is $WORKSPACE"
                        
                        
                        sh "aws s3 rm s3://dks17 --recursive"
                        sh "aws s3 cp dist/docker-website s3://dks17 --recursive"	                      
                   }         
            }            
        }

        
    }
}
