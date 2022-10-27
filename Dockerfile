FROM node:18.8.0-slim

WORKDIR /home/node/app

USER node

CMD ["tail", "-f", "/dev/null"]