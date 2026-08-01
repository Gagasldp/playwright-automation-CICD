pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Test') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.61.1-noble'
                    args '--ipc=host'
                }
            }

            steps {
                sh 'npm ci'
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])
        }
    }
}