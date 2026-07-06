pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.54.1-noble'
            args '--ipc=host'
        }
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}