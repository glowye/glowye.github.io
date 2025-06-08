#!/bin/bash

echo "开始更新网站..."

# 添加所有更改的文件
git add .

# 获取更新说明
echo "请输入更新说明："
read message

# 提交更改
git commit -m "$message"

# 推送到GitHub
git push

echo "更新完成！"
echo "请等待1-3分钟，然后访问 https://glowye.github.io 查看更新后的网站" 