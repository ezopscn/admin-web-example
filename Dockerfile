# 构建环境
FROM node:lts as build-env
# 设置工作目录
WORKDIR /app
# 将项目复制到工作目录，排除某些目录
COPY . ./
# 打包
RUN npm i && npm run build

# 运行环境
FROM nginx:alpine-perl
# 复制构建产物和启动脚本到 Nginx 的默认 Web 根目录
COPY --from=build-env /app/dist /usr/share/nginx/html
COPY --from=build-env /app/docker-entrypoint.sh /usr/share/nginx/html/docker-entrypoint.sh
# 设置环境变量
ENV RUN_ENV=prod
# 删除默认配置
RUN chmod 755 /usr/share/nginx/html/docker-entrypoint.sh
# 启动服务
ENTRYPOINT ["sh", "/usr/share/nginx/html/docker-entrypoint.sh"]
