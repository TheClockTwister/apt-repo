#!/bin/bash
gpg --import /private.key

service nginx start
cd /api
node index.js
