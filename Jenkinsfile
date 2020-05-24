pipeline {
    agent { dockerfile true }
    stages {
        stage('Build') {
            steps {
                sh 'npm update'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'npm run build'
                sh 'rsync -av build/ /var/www/html/'
            }
        }
    }
}
