# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Copy and set up entrypoint script
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Expose the port your app listens on
EXPOSE 3000

# Start the entrypoint script when the container runs
ENTRYPOINT ["/app/docker-entrypoint.sh"]
