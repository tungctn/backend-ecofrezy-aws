version = 0.1
[y.deploy.parameters]
stack_name = "backend-aws-ecofrenzy1"
resolve_s3 = true
s3_prefix = "backend-aws-ecofrenzy1"
region = "ap-southeast-1"
confirm_changeset = true
capabilities = "CAPABILITY_IAM"
disable_rollback = true
parameter_overrides = "EnvironmentName=\"ecofrenzy\" VpcCIDR=\"10.192.0.0/16\" PublicSubnet1CIDR=\"10.192.10.0/24\" PublicSubnet2CIDR=\"10.192.11.0/24\" PrivateSubnet1CIDR=\"10.192.20.0/24\" PrivateSubnet2CIDR=\"10.192.21.0/24\""
image_repositories = []
