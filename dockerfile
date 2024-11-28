FROM node:16-bullseye-slim

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8000

CMD ["npm","dev"]