# Ye的个人网站

一个简洁、优雅的个人展示网站，包含个人信息展示、照片轮播、作品集展示和AI助手功能。

## 功能特点

- 响应式设计，完美适配移动端和桌面端
- 现代化的UI设计，包含流畅的动画效果
- 照片轮播展示，支持触摸滑动
- 作品集网格布局展示
- 集成OpenAI API的智能助手功能
- 社交媒体链接整合

## 项目结构

```
.
├── index.html          # 主页面
├── css/
│   ├── style.css      # 主样式文件
│   └── animations.css # 动画效果样式
├── js/
│   ├── main.js        # 主要功能
│   ├── carousel.js    # 轮播图功能
│   └── chat.js        # AI聊天功能
└── images/            # 图片资源目录
```

## 使用说明

1. 克隆或下载本项目到本地
2. 在 `images` 目录中添加您的个人照片和项目展示图片
3. 修改 `index.html` 中的个人信息
4. 在 `js/main.js` 中的 `portfolioItems` 数组中添加您的项目信息
5. 如需使用AI助手功能，请在控制台中设置OpenAI API密钥：
   ```javascript
   window.chatInterface.setApiKey("your-api-key");
   ```

## 自定义配置

### 修改个人信息

在 `index.html` 中修改相关内容：
- 个人简介
- 社交媒体链接
- 联系方式

### 修改作品集

在 `js/main.js` 中的 `portfolioItems` 数组中添加项目：
```javascript
const portfolioItems = [
    {
        title: '项目名称',
        description: '项目描述',
        image: 'images/project.jpg',
        link: '项目链接'
    }
    // 添加更多项目...
];
```

### 修改样式

- 主题颜色：修改 `css/style.css` 中的 CSS 变量
- 动画效果：修改 `css/animations.css`
- 布局调整：修改 `css/style.css` 中的相关样式

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 移动端浏览器

## 开发建议

1. 使用现代浏览器进行开发和测试
2. 确保图片经过优化，建议使用 WebP 格式
3. 定期更新内容和项目展示
4. 保护好您的 API 密钥，不要将其暴露在公共代码中

## 注意事项

- AI助手功能需要有效的OpenAI API密钥
- 请确保您的服务器支持HTTPS（使用AI助手功能时需要）
- 建议使用图片压缩工具优化网站性能
- 定期更新依赖的外部资源（如Font Awesome）

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

MIT License 