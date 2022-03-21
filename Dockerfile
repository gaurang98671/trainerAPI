FROM node:14
WORKDIR /trainerApi
COPY package.json /trainerApi
RUN npm install
RUN ls

COPY . /trainerApi
ENV PORT=8080
EXPOSE ${PORT}
CMD ["node", "app.js"]

