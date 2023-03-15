FROM node:latest
COPY ./server/package*.json ./server/
# RUN cd ./server && npm install --registry=https://registry.npm.taobao.org
RUN cd ./server && npm install
COPY ./web/package*.json ./web/
RUN cd ./web && npm install 

COPY . .
RUN ls -al && pwd
RUN cd ./web && npm run build

EXPOSE 8000
CMD ["node", "./server/index.js" ]