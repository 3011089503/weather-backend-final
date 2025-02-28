# 使用官方 Node.js 18 作为基础镜像
FROM node:18

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json（提高缓存效率）
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制整个项目
COPY . .

# 编译 TypeScript
RUN npx tsc

# 暴露端口
EXPOSE 3000

# 运行应用
CMD ["node", "dist/server.js"]
