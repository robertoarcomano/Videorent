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
        stage('Deploy') {
            steps {
                sh 'npm run build'
                sh "rsync -avz build/ root@www.robertoarcomano.it:/var/www/html/"
            }
        }
    }
}
