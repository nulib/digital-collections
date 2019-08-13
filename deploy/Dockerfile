FROM node:12-slim
MAINTAINER Michael B. Klein
RUN apt-get update -qq && \
  apt-get install -y libyaml-dev python3-pip jq rsync && \
  pip3 install awscli && \
  npm install yarn -g
COPY ./build /usr/local/bin
USER node
WORKDIR /home/node
CMD /usr/local/bin/build
