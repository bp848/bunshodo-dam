#!/bin/bash

# Setup GCP credentials
echo $GOOGLE_CREDENTIALS > gcp-credentials.json

# Download and install Cloud SQL Proxy
wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
chmod +x cloud_sql_proxy

# Start Cloud SQL Proxy in the background
./cloud_sql_proxy -instances=aisanbo:asia-northeast1:bp-dam=tcp:5432 -credential_file=gcp-credentials.json &

# Wait for the proxy to start
sleep 5

# Run the build commands
pnpm db:migrate && pnpm db:seed && next build
