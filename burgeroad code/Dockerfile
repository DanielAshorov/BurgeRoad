#FROM node:15.12.0
#
#
#COPY entrypoint.sh .
#RUN chmod +x entrypoint.sh
#
#ADD . .
#
#RUN npm install --force
#
#RUN npm run build
#
#ENTRYPOINT ["/entrypoint.sh"]
#
#EXPOSE 3000
#
#CMD ["npm", "run", "start-FE"]


FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN yarn install
RUN yarn  build
EXPOSE 3000
CMD ["npm", "run", "start-FE"]