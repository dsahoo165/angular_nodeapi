pipeline {
    agent any
    
    /*Params needs to be added to Jenkins UI*/
    //parameters {    
        //[$class: 'DateParameterDefinition', dateFormat: 'yyyyMMdd_HHmm', defaultValue: 'LocalDate.now()', description: 'Bkp folder will be created with the given name', name: 'DATE_TIME'], 
        //string(defaultValue: 'configs/PII/Dev/DevR11COUI.groovy', description: 'File to pick build config data ', name: 'CONFIGFILE'), 
        //choice(choices: ['NO', 'YES'], description: '''Select YES if you want to clean the workspace when there is any package version upgrade/degrade.Build takes longer time if it is YES otherwise default is NO. ''', name: 'CLEAN_WORKSPACE')])])
    //}

    /*Variables required*/
    // environment {
    //  SCM_URL = ''
	// 	SCM_BRANCH = ''
	// 	SCM_CRED = ''
	// 	BASE_HREF = ''
	// 	BKP_FOLDER = ''
	// 	SOURCE_FOLDER = ''
	// 	TARGET_FOLDER = ''
		
	// 	ZIP_EXE = ''
    //  INSTANCE = ''
	// 	EXCLUDE_FILE_PATH = ''
    // }

    stages {
        stage('Installation'){
            steps {
                //Recreate/clean the workspace if there is any package update in terms of version change
              //cleanWs()
              sh 'npm install --legacy-peer-deps'
              
            }
        }

        stage('Build'){
            steps {
                
              echo 'ng-build block'
              sh "npm build"
            }
        }

        stage('Set Configuration') {            
            steps {
		    sh 'pwd'
		    sh 'ls'
                sh 'docker ps -a'
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
			
		    //sh "aws s3 cp ${env.WORKSPACE} s3://deepaksahoo.in.website --recursive"
		      sh "aws s3 rm s3://deepaksahoo.in.website --recursive"
		      sh "aws s3 cp dist/docker-website s3://deepaksahoo.in.website --recursive"	
                      sh "aws s3 ls" 
                      sh "aws ec2 describe-instances"
                   }         
            }            
        }

        // stage('Code checkout') {
        //     agent { 
        //         label 'master'
        //     }
        //     options {
        //         skipDefaultCheckout true
        //     }
        //     steps {
                
        //         script {
        //             if ("${env.CLEAN_WORKSPACE}" == 'YES'){

        //                 //Recreate/clean the workspace if there is any package update in terms of version change
        //                 cleanWs()

        //                 echo "Workspace cleanup done"
        //             }
        //         }

                
        //         dir("workspace"){
        //             git branch: "${env.SCM_BRANCH}", changelog: false, credentialsId: "${env.SCM_CRED}", poll: false, url: "${env.SCM_URL}" 
        //         }               
        //     }
            
        // }
        
        // stage('Package Installation') {
        //     agent { 
        //         label 'master'
        //     }
        //     options {
        //         skipDefaultCheckout true
        //     }
        //     steps {
        //         dir("workspace"){
        //             //bat 'del /F /Q package-lock.json'
        //             nodejs('nodejs') {
        //                 bat 'npm run-script'
        //                 bat 'npm audit fix'
        //                 bat 'npm install'
        //             }
        //         }
        //     }
            
        // }

        // stage('Code Build') {
        //     agent { 
        //         label 'master'
        //     }
        //     options {
        //         skipDefaultCheckout true
        //     }
        //     steps {
        //         dir("workspace"){
        //             nodejs('nodejs') {
        //                 bat "ng build --prod --aot --base-href=${env.BASE_HREF}"
        //             }                
        //         }
        //     }
            
        // }
        
        // stage('Create Artifacts') {
        //     agent { 
        //         label 'master'
        //     }
        //     options {
        //         skipDefaultCheckout true
        //     }
        //     steps {
        //         dir("workspace"){
        //             bat "${env.ZIP_EXE} a  -tzip bundle.zip dist/${env.SOURCE_FOLDER}"
        //             stash includes:'bundle.zip', name:'buildArtifacts'
        //         }
        //     }
            
        // }
        
        // stage('Code Deploy') {
        //     agent {
        //         label "${env.INSTANCE}"
        //     }
        //     options {
        //         skipDefaultCheckout true
        //     }
        //     steps {
                   
        //                 unstash 'buildArtifacts'
                    
        //             //Extract the bundle       
        //                 bat "${env.ZIP_EXE} x  bundle.zip  -aoa"
                    
        //             //Take bkp of existing app before pasting the new content
        //                 dir("${env.BKP_FOLDER}"){
        //                   bat "md ${env.DATE_TIME}"
        //                   bat "xcopy ${env.TARGET_FOLDER} ${env.DATE_TIME} /E/H/C/I/y"
        //                 }
                    
        //             //Delete content before pasting the new content
        //                 dir("${env.TARGET_FOLDER}"){ 
    	// 	                bat "FOR %%I IN (*) DO IF NOT %%I == env.js IF NOT %%I == web.config IF NOT %%I == Web.config DEL %%I"
    	// 	                bat 'FOR /D %%p IN (*) DO rmdir "%%p" /s /q'
    	// 	                //bat "del /q ${env.TARGET_FOLDER}\\*"
    	// 	                //bat 'FOR /D %%p IN (*) DO IF NOT %%p == imp rmdir "%%p" /s /q'
        //                 }
                        
                    
        //             //Paste the new content
        //                 bat "xcopy %WORKSPACE%\\dist\\${env.SOURCE_FOLDER} ${env.TARGET_FOLDER} /E/H/C/I/y/exclude:${env.EXCLUDE_FILE_PATH} "
        //     }          
        // }
	    
	    
    }
}
