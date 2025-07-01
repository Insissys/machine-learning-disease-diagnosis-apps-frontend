# Step 1: Build the Vue app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Set VITE_ env variables at build time via --build-arg
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy all source code and build the app
COPY . .
RUN npm run build

# Step 2: Serve with nginx
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for NPM
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
