#!/bin/bash
set -e

export REACT_APP_HONEYBADGER_API_KEY=$HONEYBADGER_API_KEY
export REACT_APP_HONEYBADGER_REVISION=$HONEYBADGER_REVISION
export REACT_APP_ELASTICSEARCH_PROXY_BASE=$(aws ssm get-parameter --name /stack-glaze/react_app_elasticsearch_proxy_base | jq -r '.Parameter.Value')
export REACT_APP_DONUT_URL=$(aws ssm get-parameter --name /stack-glaze/react_app_donut_url | jq -r '.Parameter.Value')
export REACT_APP_IIIF_LOGIN_URL=$(aws ssm get-parameter --name /stack-glaze/react_app_iiif_login_url | jq -r '.Parameter.Value')
export REACT_APP_SHARED_ITEM_PROXY_URL=$(aws ssm get-parameter --name /stack-glaze/react_app_shared_item_proxy_url | jq -r '.Parameter.Value')
S3_BUCKET=$(aws ssm get-parameter --name /dc/s3_bucket | jq -r '.Parameter.Value')
export REACT_APP_WORK_ARCHIVER_ENDPOINT=$(aws ssm get-parameter --name /stack-glaze/react_app_work_archiver_endpoint | jq -r '.Parameter.Value')
export FEN_DISTRIBUTION_ID=$(aws ssm get-parameter --name /stack-glaze/distribution_id | jq -r '.Parameter.Value')

echo "REACT_APP_ELASTICSEARCH_PROXY_BASE=$REACT_APP_ELASTICSEARCH_PROXY_BASE REACT_APP_DONUT_URL=$REACT_APP_DONUT_URL REACT_APP_IIIF_LOGIN_URL=$REACT_APP_IIIF_LOGIN_URL REACT_APP_SHARED_ITEM_PROXY_URL=$REACT_APP_SHARED_ITEM_PROXY_URL S3_BUCKET=$S3_BUCKET"

npm install
npm run-script build
echo "Build succeeded."

if [ "$DEPLOY" = "true" ]; then
  aws s3 sync --delete --exclude '*.xml.gz' --acl public-read ./build/ s3://${S3_BUCKET}/

  echo "Invalidating CloudFront Cache"
  aws cloudfront create-invalidation --distribution-id ${FEN_DISTRIBUTION_ID} --invalidation-batch "Paths={Quantity=1,Items=[/*]},CallerReference=$(date +%Y%m%d%H%M%S)"
fi
