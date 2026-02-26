# client/Dockerfile

# Stage 1: Build the Vite application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve the static files
FROM nginx:alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the 'builder' stage 
# Vite typically outputs to the 'dist' folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose internal port 80 (Nginx default)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
