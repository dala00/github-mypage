#==================================================
# Base Layer
FROM node:16.1.0-slim AS base
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .

#==================================================
# Build Layer
FROM base AS build
ENV NODE_ENV=production
ARG firebase_api_key
ARG firebase_auth_domain
ARG firebase_project_id
ARG firebase_storage_bucket
ARG firebase_messaging_sender_id
ARG firebase_app_id
ARG firebase_measurement_id
ENV NEXT_PUBLIC_FIREBASE_API_KEY $firebase_api_key
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN $firebase_auth_domain
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID $firebase_project_id
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET $firebase_storage_bucket
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID $firebase_messaging_sender_id
ENV NEXT_PUBLIC_FIREBASE_APP_ID $firebase_app_id
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID $firebase_measurement_id
WORKDIR /build

COPY --from=base /app ./
RUN yarn build:next

# ==================================================
# Package install Layer
FROM node:16.1.0-slim AS node_modules

WORKDIR /modules

COPY package.json yarn.lock ./
RUN yarn install --non-interactive --frozen-lockfile --production

# ==================================================
# Production Run Layer
FROM node:16.1.0-slim
ENV NODE_ENV=production
WORKDIR /app

COPY package.json yarn.lock next.config.js ./
COPY --from=build /build/public ./public
COPY --from=build /build/.next ./.next
COPY --from=node_modules /modules/node_modules ./node_modules

EXPOSE 8080

CMD ["yarn", "start"]