FROM node:6-slim

# Create app directory
WORKDIR /git/example-node

# Install app dependencies
COPY package.json /git/example-node/
RUN npm install --production

# Bundle app source
COPY . /git/example-node/

CMD [ "npm", "start" ]
