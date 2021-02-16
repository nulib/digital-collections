terraform {
  backend "s3" {}
}

provider "aws" {
  region = var.aws_region
}

locals {
  fen_dns_name = local.public_zone_name
  # TODO do we need fen aliases?
  fen_aliases = concat(list(local.fen_dns_name), var.fen_dns_names)
}

resource "aws_s3_bucket" "static_fen_bucket" {
  bucket = local.fen_dns_name
  acl    = "private"
  tags   = local.common_tags
}

resource "aws_ssm_parameter" "fen_bucket_name" {
  name      = "/${var.stack_name}/s3_bucket"
  value     = aws_s3_bucket.static_fen_bucket.id
  type      = "String"
  overwrite = true
}

resource "aws_cloudfront_origin_access_identity" "fen_origin_access_identity" {
  comment = local.namespace
}

data "aws_iam_policy_document" "fen_bucket_policy" {
  statement {
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.static_fen_bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.fen_origin_access_identity.iam_arn]
    }
  }

  statement {
    effect    = "Allow"
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.static_fen_bucket.arn]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.fen_origin_access_identity.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "allow_cloudfront_fen_access" {
  bucket = aws_s3_bucket.static_fen_bucket.id
  policy = data.aws_iam_policy_document.fen_bucket_policy.json
}

resource "aws_cloudfront_distribution" "fen" {
  origin {
    domain_name = aws_s3_bucket.static_fen_bucket.bucket_domain_name
    origin_id   = "${local.namespace}-origin"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.fen_origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Fen"
  default_root_object = "index.html"
  web_acl_id          = var.waf_acl
  
  aliases = local.fen_aliases

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${local.namespace}-origin"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn            = var.fen_certificate
    ssl_support_method             = "sni-only"
  }

  price_class = "PriceClass_100"
  tags        = local.common_tags
}

data "aws_route53_zone" "app_zone" {
  name = var.dns_zone
}

resource "aws_route53_record" "fen_dns" {
  zone_id = data.aws_route53_zone.app_zone.id
  name    = local.fen_dns_name
  type    = "CNAME"
  ttl     = "900"
  records = [aws_cloudfront_distribution.fen.domain_name]
}
