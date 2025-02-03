# Build stage
FROM node:18-alpine as builder

WORKDIR /app

COPY .yarn* ./
COPY yarn.lock ./
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN yarn install --frozen-lockfile
RUN yarn build

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY .yarn* ./
COPY yarn.lock ./
COPY package*.json ./
COPY --from=builder /app/dist ./dist

RUN yarn install --frozen-lockfile --production

USER node

EXPOSE 6969

CMD ["node", "dist/app.js"] 