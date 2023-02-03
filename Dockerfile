FROM ubuntu

RUN apt-get update && apt-get install -y wget git nodejs npm build-essential libpcre3 libpcre3-dev zlib1g zlib1g-dev libssl-dev libgd-dev libxml2 libxml2-dev uuid-dev

RUN npm i -g serve

RUN mkdir -p /opt/src
WORKDIR /opt/src

RUN git clone https://github.com/arut/nginx-rtmp-module
RUN wget http://nginx.org/download/nginx-1.20.0.tar.gz && tar -zxvf nginx-1.20.0.tar.gz

WORKDIR /opt/src/nginx-1.20.0

RUN ./configure --add-module=/opt/src/nginx-rtmp-module && \
  make CFLAGS="-pipe -O -W -Wall -Wpointer-arith -Wno-unused-parameter -g" && make install

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package.json package-lock.json tsconfig.json ./

RUN npm i

COPY src ./src
COPY public ./public

ARG UI_PASS_KEY
ARG UI_VIDEO_SOURCE
ARG UI_VIDEO_FORMAT

ARG IS_CHAT_ENABLED
ARG MAX_CHAT_MESSAGES

ENV REACT_APP_PASS_KEY=$UI_PASS_KEY
ENV REACT_APP_IS_CHAT_ENABLED=$IS_CHAT_ENABLED
ENV REACT_APP_VIDEO_SOURCE=$UI_VIDEO_SOURCE
ENV REACT_APP_VIDEO_FORMAT=$UI_VIDEO_FORMAT

RUN npm run build

RUN mkdir -p /usr/local/nginx/conf
COPY nginx.conf /usr/local/nginx/conf

ENV IS_CHAT_ENABLED=$IS_CHAT_ENABLED
ENV MAX_CHAT_MESSAGES=$MAX_CHAT_MESSAGES

COPY server ./server

EXPOSE 80/tcp
EXPOSE 1935/tcp

CMD ["/bin/bash", "-c", "/usr/local/nginx/sbin/nginx; node ./server/index.js"]
