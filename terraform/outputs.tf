output "aws_region" {
  value = "${var.aws_region}"
}

output "environment" {
  value = "${var.environment}"
}

output "dns_zone" {
  value = "${var.dns_zone}"
}

output "stack_name" {
  value = "${var.stack_name}"
}

output "tags" {
  value = "${var.tags}"
}

output "endpoint" {
  value = "http://${aws_route53_record.fen_dns.fqdn}/"
}
