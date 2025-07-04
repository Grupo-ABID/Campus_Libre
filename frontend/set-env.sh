#!/bin/sh

mkdir -p /usr/share/nginx/html/assets

cat <<EOF > /usr/share/nginx/html/assets/env.js
window['env'] = {
  apiUrl: '${API_URL}'
};
EOF
