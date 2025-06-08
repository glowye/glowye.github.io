class ChatInterface {
    constructor() {
        this.messagesContainer = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendMessage');
        this.apiKey = ''; // 需要设置OpenAI API密钥
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // 显示用户消息
        this.addMessage(message, 'user');
        this.userInput.value = '';

        // 显示加载状态
        const loadingMessage = this.addMessage('正在思考...', 'assistant', true);

        try {
            const response = await this.getAIResponse(message);
            // 移除加载消息
            loadingMessage.remove();
            // 显示AI回复
            this.addMessage(response, 'assistant');
        } catch (error) {
            loadingMessage.remove();
            this.addMessage('抱歉，出现了一些问题。请稍后再试。', 'assistant', false, true);
            console.error('Error:', error);
        }
    }

    addMessage(text, sender, isLoading = false, isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message ${isError ? 'error' : ''}`;
        
        if (isLoading) {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="loading"></div>
                    <p>${text}</p>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${this.formatMessage(text)}</p>
                </div>
            `;
        }

        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        return messageDiv;
    }

    formatMessage(text) {
        // 简单的文本格式化，可以根据需要扩展
        return text.replace(/\n/g, '<br>');
    }

    async getAIResponse(message) {
        if (!this.apiKey) {
            throw new Error('请先设置API密钥');
        }

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{
                        role: "user",
                        content: message
                    }],
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error('API请求失败');
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    setApiKey(key) {
        this.apiKey = key;
    }
}

// 页面加载完成后初始化聊天界面
window.addEventListener('load', () => {
    window.chatInterface = new ChatInterface();
    // 提示用户设置API密钥
    console.log('请设置OpenAI API密钥: window.chatInterface.setApiKey("your-api-key")');
}); 