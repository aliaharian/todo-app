FROM node:20

WORKDIR /build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run test
RUN npm run build
EXPOSE 3000
CMD npm start