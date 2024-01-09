# # Stage 1 - Build the React Application
# FROM node:20.9.0 AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . ./
# RUN npm run build


# FROM nginx:alpine AS development
# COPY --from=build /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


# FROM nginx:alpine AS production
# COPY --from=build /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


# Stage 1 - Build the React Application
FROM node:20.9.0-alpine3.17 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2 - Serve the React Application using serve
FROM node:20.9.0-alpine3.17
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 80
CMD ["npm", "run", "start"]

