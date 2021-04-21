FROM node:14.10.0

#Папка приложения
ARG APP_DIR=meet
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

#Установка зависимостей
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

COPY . .
EXPOSE 3000

CMD ["npm", "start"]
