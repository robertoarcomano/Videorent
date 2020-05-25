pipeline {
    agent {
        dockerfile {
            args '-u root:root'
        }
    }
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
        stage('oooowwwwiii') {
            steps {
                sh 'ls'
            }
        }
        stage('Deploy') {
            steps {
                sh 'npm run build'
                sh 'rsync -av build/ /var/www/html/'
                sh 'ls -all /var/www/html -R'
            }
        }
    }
}
