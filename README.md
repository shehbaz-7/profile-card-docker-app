# 🚀 Dockerized Cloud-Native Profile Web Application

A fully containerized, production-grade profile management web application built with **Node.js** and deployed on **Amazon Web Services (AWS)** using an automated **CI/CD pipeline** and **Infrastructure as Code (IaC)**.

Originally built as a local multi-container Docker stack, **Version 2.0** re-engineers the infrastructure into a secure, isolated cloud environment.

---

# 🏗️ Architecture Overview

```text
[ GitHub Actions ] --(Pushes Image)--> [ Amazon ECR ]
        |
        | (SSH Deploy)
        v
 [ AWS Custom VPC ]
        |
        └── [ Public Subnet ]
                 |
                 └── [ EC2 Instance (Docker Engine) ]
                               |
                               └── [ Amazon DynamoDB ]
```

## Key Technical Upgrades (v2.0)

### Infrastructure as Code

100% of the AWS infrastructure (VPC, Subnets, Internet Gateway, Route Tables, Security Groups, IAM Roles, ECR, EC2, and DynamoDB) is provisioned and managed using Terraform.

### Isolated Networking

A dedicated custom VPC was designed from scratch, including a public subnet, custom route tables, and tightly controlled security group rules instead of relying on AWS default networking.

### Serverless Data Layer

The application backend was migrated from a locally hosted database container to Amazon DynamoDB, providing managed scalability and high availability.

### Least-Privilege Security

AWS IAM Instance Profiles are used to grant the EC2 instance secure access to AWS services without storing long-term AWS credentials inside the application or server.

---

# 🛠️ Tech Stack

### Application Layer

* Node.js
* Express.js
* HTML5
* CSS3

### Containerization

* Docker
* Multi-stage Alpine Linux builds

### Infrastructure

* Terraform
* AWS Provider

### AWS Services

* Amazon EC2
* Amazon ECR
* Amazon DynamoDB
* Amazon VPC
* AWS IAM

### CI/CD

* GitHub Actions
* AWS Authentication Actions
* Appleboy SSH Action

---

# 📁 Repository Structure

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline

├── app/
│   ├── server.js              # Express application & DynamoDB logic
│   ├── package.json           # Node.js dependencies
│   └── index.html             # Frontend UI

├── terraform/
│   ├── main.tf                # Infrastructure resources
│   ├── variables.tf           # Input variables
│   └── outputs.tf             # Infrastructure outputs

├── Dockerfile                 # Container image definition
└── README.md                  # Project documentation
```

---

# 🤖 Automated CI/CD Workflow

Every push to the `main` branch automatically triggers the deployment pipeline:

### 1. Lint & Validation

Performs code quality checks and validates the project structure.

### 2. Build & Package

Builds the Docker image and packages the Node.js application into an isolated container.

### 3. Push to Amazon ECR

Authenticates with AWS and pushes the latest image to Amazon Elastic Container Registry (ECR).

### 4. Remote Deployment

GitHub Actions securely connects to the EC2 instance via SSH and:

* Authenticates with ECR
* Pulls the latest image
* Stops and removes the previous container
* Launches the updated application container

This enables fully automated deployments with minimal downtime.

---

# 🚀 Deployment Guide

## Prerequisites

Ensure the following tools are installed and configured:

* Terraform CLI
* AWS CLI
* Docker Desktop / Docker Engine
* AWS Account with appropriate permissions

---

## 1. Provision Infrastructure

Navigate to the Terraform directory and deploy the infrastructure:

```bash
cd terraform
terraform init
terraform apply -auto-approve
```

After deployment completes, note the following outputs:

* `ec2_public_ip`
* `ecr_repository_url`

---

## 2. Configure GitHub Secrets

Navigate to:

**Repository → Settings → Secrets and Variables → Actions**

Create the following secrets:

```text
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
EC2_PUBLIC_IP
EC2_SSH_PRIVATE_KEY
ECR_REPOSITORY_URL
```

---

## 3. Deploy the Application

Push changes to the `main` branch or manually trigger the GitHub Actions workflow.

The pipeline will:

1. Build the Docker image
2. Push it to Amazon ECR
3. Connect to EC2
4. Pull the latest image
5. Restart the containerized application

---

# 🧹 Infrastructure Cleanup

To remove all provisioned AWS resources and prevent ongoing charges:

```bash
cd terraform
terraform destroy -auto-approve
```

This command deletes all infrastructure managed by Terraform, including:

* EC2 Instance
* ECR Repository
* DynamoDB Table
* IAM Roles
* Security Groups
* Route Tables
* Internet Gateway
* VPC and Subnets
