#!/bin/bash

echo "开始更新网站..."

# 添加所有更改的文件
git add .

# 获取更新说明
echo "Enter commit message:"
read message

# 如果没有输入消息，使用默认消息
if [ -z "$message" ]; then
    message="Update website content"
fi

# 提交更改
git commit -m "$message"

# 推送到GitHub
git push origin main

echo "更新完成！"
echo "请等待1-3分钟，然后访问 https://glowye.github.io 查看更新后的网站" 