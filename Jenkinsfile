node('master') {
    stage('scm') {
    	checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/robertoarcomano/Videorent.git']]])
    }
    stage('Requirements') {
        sh 'sudo apt install update; sudo apt install -y npm'
    }
    stage('Build') {
        sh 'npm update'
    }
    stage('Test') {
        sh 'npm test'
    }
    stage('Deploy') {
        sh 'npm run build'
        sh 'rsync -av build/ /www/projects/Videorent/'
    }
}
