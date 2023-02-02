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

RUN mkdir -p /opt/ui
WORKDIR /opt/ui

COPY package.json package-lock.json tsconfig.json ./

RUN npm i

COPY src ./src
COPY public ./public

RUN npm run build

RUN mkdir -p /usr/local/nginx/conf
COPY nginx.conf /usr/local/nginx/conf

EXPOSE 80/tcp
EXPOSE 1935/tcp

CMD ["/bin/bash", "-c", "/usr/local/nginx/sbin/nginx; npm run start"]
