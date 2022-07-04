FROM node:16.14-alpine

RUN echo "$PWD"

COPY ["/package.json", "./"]
#RUN echo pwd
# TODO copy only relevant packages
COPY [".","./"]

USER root

RUN npm install -g npm@8.13.1

RUN npm i


EXPOSE 4000

CMD [ "npm", "run", "start-BE" ]
