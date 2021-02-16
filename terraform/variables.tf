variable "fen_dns_names" {
  type    = list
  default = []
}

variable "fen_certificate" {
  type = string
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "availability_zones" {
  type    = list
  default = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

variable "honeybadger_api_key" {
  type    = string
  default = ""
}

variable "stack_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "dns_zone" {
  type = string
}

variable "tags" {
  type    = map
  default = {}
}

locals {
  namespace         = "${var.stack_name}-${var.environment}"
  public_zone_name  = "${var.stack_name}.${var.dns_zone}"
  private_zone_name = "${var.stack_name}.vpc.${var.dns_zone}"

  common_tags = merge(
    var.tags,
    map(
      "Terraform", "true",
      "Environment", local.namespace,
      "Project", "Fen"
    )
  )
}
