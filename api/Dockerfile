FROM node:20.9.0-alpine3.17 AS deps
WORKDIR /app

ENV NODE_ENV=development

COPY package.json package-lock.json ./

RUN npm ci


FROM deps AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig.json ./
COPY . .

RUN npm run build

FROM node:20.9.0-alpine3.17 AS prod
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY  --from=builder /app/node_modules ./node_modules
COPY  --from=builder /app/dist ./dist
COPY  --from=builder /app/package.json ./package.json
# COPY  --from=builder /app/.env ./.env

EXPOSE ${PORT}

CMD ["npm", "run", "start"]










# ###################
# # SHARED BASE
# ###################

# FROM node:20.3-alpine AS shared_base_image

# FROM shared_base_image AS base

# RUN npm install -g pnpm

# WORKDIR /usr/src/app

# RUN mkdir /usr/src/app/files && chown -R node:node /usr/src/app/files
# COPY --chown=node:node package.json pnpm-lock.yaml ./
# RUN pnpm install --frozen-lockfile --ignore-scripts --silent

# RUN if [ -f .env ]; then cp --chown=node:node .env .env; else touch .env && chown node:node .env; fi
# COPY --chown=node:node . .

# ###################
# # BUILD FOR LOCAL DEVELOPMENT
# ###################

# FROM base AS development

# USER node

# RUN npm config set update-notifier false
# ###################
# # BUILD FOR PRODUCTION
# ###################

# FROM base AS build

# RUN pnpm run build

# COPY --chown=node:node --from=base /usr/src/app/node_modules ./node_modules
# RUN pnpm install --frozen-lockfile --prod --ignore-scripts --silent

# ###################
# # PRODUCTION
# ###################

# FROM shared_base_image AS production

# COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node --from=build /usr/src/app/dist ./dist
# COPY --chown=node:node --from=build /usr/src/app/package.json ./package.json
# COPY --chown=node:node --from=build /usr/src/app/.env ./.env
# COPY --chown=node:node --from=build /usr/src/app/get_secrets.js ./get_secrets.js
# COPY --chown=node:node --from=build /usr/src/app/Makefile ./Makefile

# RUN apk add make

# USER node

# RUN npm config set update-notifier false

# CMD ["npm", "run", "start:prod"]

