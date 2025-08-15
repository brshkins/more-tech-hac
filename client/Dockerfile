FROM node:18 AS builder
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

RUN mkdir -p /app/dist && \
    cp -r /app/.next /app/dist/.next && \
    cp -r /app/public /app/dist/public && \
    cp -r /app/node_modules /app/dist/node_modules && \
    cp /app/package.json /app/dist/package.json

FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/dist /app

EXPOSE 3000

CMD ["npm", "start"]