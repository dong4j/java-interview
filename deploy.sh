#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn run build

# 进入生成的文件夹

# 部署到个人服务器
cd docs
zip -r dist.zip dist
scp dist.zip root@aliyun:/home/dong4j/java-interview/
rm -rf dist.zip
rm -rf docs/dist

ssh aliyun