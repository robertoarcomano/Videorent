pipeline {
    agent { dockerfile true }
    stages {
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
}
