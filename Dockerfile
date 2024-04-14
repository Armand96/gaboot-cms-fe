# Use the official Node.js runtime as the base image
FROM node:latest as build

# SET VARIABLE
ARG BASEHREF

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Build the React app for production
# RUN npm run build --base-href=http://103.127.97.223:85/
RUN npm run build --base-href=$BASEHREF

FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build /app/dist /var/www/html/
RUN rm /etc/nginx/sites-available/default
COPY default /etc/nginx/sites-available/
EXPOSE 81
CMD ["nginx","-g","daemon off;"]
