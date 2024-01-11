# Stage 1 - Build the React Application
FROM node:20.9.0-alpine3.17 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2 - Serve the React Application using serve
FROM node:20.9.0-alpine3.17 as development
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "start"]

# prod build
FROM nginx:alpine AS prod
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
