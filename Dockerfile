FROM node:12.16.0

WORKDIR /usr/src/canvas-chat-server

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]