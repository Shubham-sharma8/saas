# Base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire application
COPY . .

# Base environment
ENV NODE_ENV=development

# Default command
CMD ["npm", "run", "dev"]

# Builder stage (for production builds)
FROM base AS builder
ENV NODE_ENV=production
RUN npm run build
CMD ["npm", "start"]
