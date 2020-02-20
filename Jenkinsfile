node('master') {
    stage('scm') {
    	checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/robertoarcomano/Videorent.git']]])
    }
    stage('Build') {
        sh 'npm update'
    }
    stage('Test') {
        sh 'npm test'
    }
    stage('Deploy') {
        sh 'npm run build'
        sh 'sudo rsync -av build/ /web/projects/Videorent/'
    }
}
