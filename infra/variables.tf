variable "aws_region" {
  description = "AWS region for the landing page infrastructure"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "domain_name" {
  description = "Primary domain name for the landing page"
  type        = string
  default     = "opuspopuli.org"
}

variable "subject_alternative_names" {
  description = "Additional domain names for the SSL certificate"
  type        = list(string)
  default     = ["www.opuspopuli.org"]
}

variable "enable_custom_domain" {
  description = "Whether to enable custom domain with SSL certificate"
  type        = bool
  default     = false  # Set to true once DNS is configured
}
