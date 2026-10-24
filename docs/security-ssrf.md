# SSRF Protection & Zero-Trust Probe Barrier
- Resolves all target URLs to IP addresses prior to dispatch.
- Blocks RFC 1918 private IPv4 subnets (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16).
- Blocks link-local (169.254.0.0/16) and cloud instance metadata (AWS, GCP, Azure, DigitalOcean).
- Blocks IPv6 loopback (::1) and IPv6 unique local (fc00::/7).
