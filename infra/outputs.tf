output "s3_bucket_name" {
  description = "Name of the S3 bucket for the landing page"
  value       = aws_s3_bucket.landing.bucket
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.landing.arn
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.landing.id
}

output "cloudfront_distribution_arn" {
  description = "ARN of the CloudFront distribution"
  value       = aws_cloudfront_distribution.landing.arn
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.landing.domain_name
}

output "website_url" {
  description = "URL of the landing page"
  value       = var.enable_custom_domain ? "https://${var.domain_name}" : "https://${aws_cloudfront_distribution.landing.domain_name}"
}

output "acm_certificate_arn" {
  description = "ARN of the ACM certificate"
  value       = aws_acm_certificate.landing.arn
}

output "acm_certificate_validation_records" {
  description = "DNS validation records for the ACM certificate"
  value       = aws_acm_certificate.landing.domain_validation_options
}
