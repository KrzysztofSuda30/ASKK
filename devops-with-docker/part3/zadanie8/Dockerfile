FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
FROM node:16-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/build /app/build
EXPOSE 5000
CMD ["serve", "-s", "build", "-l", "5000"]
