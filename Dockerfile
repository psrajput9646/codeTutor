FROM node:8.15-jessie
ADD . /code
WORKDIR /code
RUN npm install
CMD ["npm", "start"]
