FROM node:10-slim
MAINTAINER Michael B. Klein
RUN apt-get update -qq && \
    apt-get install -y awscli rsync && \
    npm install yarn -g
COPY ./build /usr/local/bin
USER node
WORKDIR /home/node
CMD /usr/local/bin/build
