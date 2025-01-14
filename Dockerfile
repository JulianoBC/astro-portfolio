# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY astro-portfolio/package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY astro-portfolio .

# Build the Astro project
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "preview", "--", "--host", "--port", "3000"]

