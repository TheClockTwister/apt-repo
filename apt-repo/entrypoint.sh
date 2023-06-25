#!/bin/bash
gpg --import /private.key

# nginx -g 'daemon on;'
cd /api
node index.js
