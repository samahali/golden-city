# Stage 1: Install dependencies
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Build frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production image
FROM node:18-alpine
WORKDIR /app

# Copy only production dependencies
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=frontend-builder /app/build ./build
COPY backend ./backend

# Install serve globally
RUN npm install -g serve

EXPOSE 3000 4000

# Serve frontend and run backend
CMD ["sh", "-c", "serve -s build -l 3000 & cd backend && node server.js"]