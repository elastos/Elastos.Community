#!/bin/bash

START=`date +%s`
DEPLOY_TARGET=$1

# ./deploy.sh <DEPLOYMENT_DESTINATION>
# Example:
# $ ./deploy.sh staging

print_progress () {
  printf "\e[0;33m$1\e[0m\n"
}

print_success () {
  printf "\e[4;32m$1\e[0m\n"
}

# sync required assets for staging and prod builds
s3_sync () {
  S3_BUCKET=$1
  print_progress "Running S3 sync for bucket $S3_BUCKET"
  aws s3 sync ./dist s3://$S3_BUCKET/ --acl=public-read --delete \
    --exclude '.DS_store' \
    --exclude 'assets/.DS_store' \
    --exclude 'assets/images/.DS_store' \
    --include 'assets/images/*' \
    --include 'static/css/*' \
    --include 'static/js/*'
}

if [ $DEPLOY_TARGET = 'beta' ]; then
    print_progress "Running beta grunt build..."
    npm run build
    s3_sync ebp-beta.elastos.org
    # cf_invalidate E2Y2GDCCW2ZEU9
fi

END=`date +%s`

print_success "\nDone. Runtime: $((END-START)) seconds."
