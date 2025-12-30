# Infrastructure

Terraform configuration for the Commonwealth Labs landing page hosted on AWS S3 + CloudFront.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CloudFront                           │
│                    (CDN + HTTPS)                            │
│         commonwealthlabs.io / *.cloudfront.net              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      S3 Bucket                              │
│              (Static site hosting)                          │
│         commonwealthlabs-landing-prod                       │
└─────────────────────────────────────────────────────────────┘
```

## Prerequisites

- [Terraform](https://terraform.io) >= 1.0
- AWS CLI configured with appropriate credentials
- Domain registered (for custom domain setup)

## Quick Start

```bash
# Initialize Terraform
terraform init

# Preview changes
terraform plan

# Apply changes
terraform apply
```

## Configuration

### Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `aws_region` | AWS region | `us-east-1` |
| `environment` | Environment name | `prod` |
| `domain_name` | Primary domain | `commonwealthlabs.io` |
| `enable_custom_domain` | Enable custom domain with SSL | `false` |

### Custom Domain Setup

1. Set `enable_custom_domain = true` in your terraform.tfvars
2. Run `terraform apply`
3. Add the DNS validation records output by Terraform to your DNS provider
4. Wait for certificate validation (can take up to 30 minutes)
5. Add a CNAME record pointing your domain to the CloudFront distribution

Example terraform.tfvars:

```hcl
aws_region           = "us-east-1"
environment          = "prod"
domain_name          = "commonwealthlabs.io"
enable_custom_domain = true
```

## Deployment

The site is automatically deployed via GitHub Actions when changes are pushed to the `main` branch.

Manual deployment:

```bash
# Build the site
npm run build

# Sync to S3
aws s3 sync dist/ s3://commonwealthlabs-landing-prod --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id <DISTRIBUTION_ID> \
  --paths "/*"
```

## Costs

Estimated monthly costs:

| Resource | Monthly Cost |
|----------|-------------|
| S3 (storage + requests) | ~$0.50 |
| CloudFront (data transfer) | ~$1-2 |
| Route 53 (optional) | $0.50 |
| **Total** | **~$2-3** |

## Outputs

After applying, Terraform outputs:

- `s3_bucket_name` - S3 bucket name for deployments
- `cloudfront_distribution_id` - CloudFront distribution ID for cache invalidation
- `cloudfront_domain_name` - CloudFront URL (use this until custom domain is set up)
- `website_url` - Final website URL

## Troubleshooting

### Certificate validation stuck

DNS validation can take up to 30 minutes. Ensure the CNAME records are correctly added to your DNS provider.

### 403 Forbidden errors

Check that the S3 bucket policy correctly references the CloudFront distribution ARN.

### Changes not appearing

CloudFront caches content. After deploying, invalidate the cache:

```bash
aws cloudfront create-invalidation \
  --distribution-id <DISTRIBUTION_ID> \
  --paths "/*"
```
