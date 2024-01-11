FROM node:20.9.0-alpine3.17 AS deps
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci


FROM deps AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig.json ./
COPY . .

RUN npm run build

FROM builder AS prod
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY  --from=builder /app/node_modules ./node_modules
COPY  --from=builder /app/dist ./dist
COPY  --from=builder /app/package.json ./package.json

EXPOSE ${PORT}

CMD ["npm", "run", "start"]

# Dev build
FROM node:20.9.0-alpine3.17 AS development
WORKDIR /app

ENV NODE_ENV=development
ENV PORT=3000

COPY . .
RUN npm install

CMD ["npm", "run", "start:dev"]
