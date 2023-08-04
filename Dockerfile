FROM node
WORKDIR /app
COPY package.json .

RUN npm install --legacy-peer-deps 

COPY . ./
ENV PORT 3000
EXPOSE $PORT
ENV REACT_APP_SERVER=http://localhost:5000
CMD [ "npm", "start"]