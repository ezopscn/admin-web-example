#!/bin/sh

# 根据环境调整配置
cd /usr/share/nginx/html && cp ${RUN_ENV}.js config.js

# 启动 nginx
nginx -g "daemon off;"
