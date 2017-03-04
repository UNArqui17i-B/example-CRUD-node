FROM node:6-slim

MAINTAINER Miguel Asencio <maasencioh@gmail.com>

# Create app directory
WORKDIR /git/example-node

# Install app dependencies
COPY package.json /git/example-node/
RUN npm install --production

# Bundle app source
COPY . /git/example-node/

EXPOSE 3000
CMD [ "npm", "start" ]