node('master') {
    stage('scm') {
    	checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/robertoarcomano/Videorent.git']]])
    }
    stage('Build') {
        sh 'npm update'
        sh 'npm run build'
    }
    stage('Deploy') {
        sh 'rsync -av build/ /www/projects/Videorent/'
    }
}
