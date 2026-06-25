# 🚀 Dockerized Cloud-Native Profile Web Application

A fully containerized, production-grade profile management web application built with **Node.js** and deployed on **Amazon Web Services (AWS)** using an automated **CI/CD** pipeline and **Infrastructure as Code (IaC)**. 

Originally built as a local multi-container Docker stack, **Version 2.0** completely re-engineers the infrastructure layout into a secure, isolated cloud environment.

---

## 🏗️ Architecture Overview

[ GitHub Actions ] --(Pushes Image)--> [ Amazon ECR ]
        |
    (SSH Deploy)
        |
        v
 [ AWS Custom VPC ]
     └── [ Public Subnet ]
              └── [ EC2 Instance (Docker Engine) ] <───> [ Amazon DynamoDB ]
              
Key Technical Upgrades (v2.0):
Infrastructure as Code: 100% of the AWS infrastructure (VPC, Subnets, Gateways, IAM Roles, ECR, EC2, DynamoDB) is declared and managed via Terraform.

Isolated Networking: Bypassed default AWS routing to construct a dedicated, custom VPC with a secure public subnet, custom route tables, and strict firewall security groups.

Serverless Data Layer: Migrated the backend storage architecture from a localized database container to a scalable, managed Amazon DynamoDB database.

Least-Privilege Security: Utilized AWS IAM Instance Profiles to grant the EC2 runtime secure, programmatic access to AWS services without hardcoding static API credentials.

🛠️ Tech Stack & Tooling
Frontend/Backend: Node.js, Express, HTML5, CSS3

Containerization: Docker (Optimized Multi-stage Alpine builds)

Infrastructure Layer: Terraform (AWS Provider)

Cloud Services (AWS): EC2, ECR, DynamoDB, VPC, IAM

CI/CD Automation: GitHub Actions (Appleboy SSH engine, AWS Authentication hooks)

📁 Repository Structure
Plaintext
├── .github/workflows/   # Automated GitHub Actions deployment CI/CD files
├── app/                 # Node.js application core code context
│   ├── server.js        # AWS DynamoDB client application logic
│   ├── package.json     # Node engine dependency definitions
│   └── index.html       # Web UI profile dashboard layout
├── terraform/           # IaC declaration infrastructure modules
│   ├── main.tf          # Core infrastructure topology (VPC, EC2, DB)
│   ├── variables.tf     # Configurable project inputs
│   └── outputs.tf       # Target runtime public endpoints
├── Dockerfile           # Optimized light-footprint container manifest
└── README.md            # System documentation matrix
🤖 Automated CI/CD Pipeline Workflow
Every code change pushed to the main branch triggers an automated deployment via GitHub Actions:

Lint & Verify: Checks structural codebase integrity.

Build & Optimize: Packages the Node.js application into an isolated Docker container context.

Registry Delivery: Authenticates securely with AWS and pushes the tagged image asset directly to Amazon ECR.

Remote CD Orchestration: Establishes a secure SSH connection to the EC2 target instance, logs into ECR, pulls down the latest container image tag, drops the old container instance, and boots the new application bundle flawlessly.

🚀 Local & Sandbox Deployment Blueprint
Prerequisite Checklist
Installed local Terraform CLI Engine

Configured local AWS CLI profile credentials

Installed Docker Desktop Runtime

1. Initialize & Spin Up Cloud Infrastructure
Navigate to the terraform configuration workspace directory to initialize providers and provision resources:

Bash
cd terraform
terraform init
terraform apply -auto-approve
Note the terminal execution output blocks for your unique target ec2_public_ip and container ecr_repository_url parameters.

2. Configure Automation Variables
Map the infrastructure endpoints into your repository settings at Settings ──> Secrets and variables ──> Actions inside GitHub:

AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY

EC2_PUBLIC_IP

EC2_SSH_PRIVATE_KEY (Your .pem Keypair)

ECR_REPOSITORY_URL

3. Deploy
Push a code correction or manually trigger the GitHub workflow runner action to see the environment build out live across the network pipeline!

🧹 Teardown Protocol
To easily destroy all live cloud resources and avoid unnecessary charges, run the following command within the Terraform directory:

Bash
cd terraform
terraform destroy -auto-approve
