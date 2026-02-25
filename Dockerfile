# client/Dockerfile

# Stage 1: Build the Vite application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Accept build arguments
ARG VITE_BASE_URL
ARG VITE_ENV

# Set them as environment variables during the build
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_ENV=$VITE_ENV

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
