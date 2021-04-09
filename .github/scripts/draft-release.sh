#!/bin/bash
JSON_STRING='{"tag_name":"'"$CI_COMMIT_TAG"'","draft":true}'
echo "🚀 Creating a draft GitHub release"
curl \
  -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token $GIT_TOKEN" \
  https://api.github.com/repos/zappar-xr/zappar-react-three-fiber/releases \
  -d $JSON_STRING
