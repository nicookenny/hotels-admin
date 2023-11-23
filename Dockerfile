FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install -g typescript
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]