#!/bin/bash
set -eo pipefail

mkdir "$PWD/certs"

# https://letsencrypt.org/docs/certificates-for-localhost/
openssl req -x509 -out "$PWD/certs/localhost.crt" \
  -keyout "$PWD/certs/localhost.key" \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
