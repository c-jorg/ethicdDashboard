FROM node:20-alpine

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# Copy the rest of your app
COPY . .

ENV NODE_ENV=development
ENV PORT=3000
ENV HOST=0.0.0.0
#EXPOSE 3000

CMD ["pnpm", "dev", "-H", "0.0.0.0"]
