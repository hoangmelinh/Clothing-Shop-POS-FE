# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .

# Build-time argument for API Base URL
ARG VITE_API_BASE_URL=http://localhost:8080
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build-time arguments for SePay Sandbox
ARG VITE_SEPAY_BANK_ACCOUNT=0000000001
ENV VITE_SEPAY_BANK_ACCOUNT=$VITE_SEPAY_BANK_ACCOUNT

ARG VITE_SEPAY_BANK_NAME=MBBank
ENV VITE_SEPAY_BANK_NAME=$VITE_SEPAY_BANK_NAME

ARG VITE_SEPAY_ACCOUNT_NAME="Nguyen Minh Hoang"
ENV VITE_SEPAY_ACCOUNT_NAME=$VITE_SEPAY_ACCOUNT_NAME

# Build-time arguments for Cloudinary
ARG VITE_CLOUDINARY_CLOUD_NAME
ENV VITE_CLOUDINARY_CLOUD_NAME=$VITE_CLOUDINARY_CLOUD_NAME

ARG VITE_CLOUDINARY_UPLOAD_PRESET
ENV VITE_CLOUDINARY_UPLOAD_PRESET=$VITE_CLOUDINARY_UPLOAD_PRESET

RUN npm run build

# Production stage
FROM nginx:1.25-alpine

# Copy built static files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for Nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
