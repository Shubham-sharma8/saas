# Step 1: Use the official Node.js image as the base
FROM node:20.11.0-alpine AS base

# Step 2: Set environment variables
ENV NODE_ENV=production

# Step 3: Set the working directory
WORKDIR /app

# Step 4: Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Step 5: Install only production dependencies
RUN npm install --production

# Step 6: Copy the rest of the application files
COPY . .

# Step 7: Build the Next.js application
RUN npm run build

# Step 8: Expose the application port
EXPOSE 3000

# Step 9: Start the application
CMD ["npm", "run", "start"]
