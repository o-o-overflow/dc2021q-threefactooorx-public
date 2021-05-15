FROM node:buster

RUN apt-get clean \
  && apt-get update \
  && apt-get install -y \
      ca-certificates \
      fonts-liberation \
      libappindicator3-1 \
      libasound2 \
      libatk-bridge2.0-0 \
      libatk1.0-0 \
      libc6 \
      libcairo2 \
      libcups2 \
      libdbus-1-3 \
      libexpat1 \
      libfontconfig1 \
      libgbm1 \
      libgcc1 \
      libglib2.0-0 \
      libgtk-3-0 \
      libnspr4 \
      libnss3 \
      libpango-1.0-0 \
      libpangocairo-1.0-0 \
      libstdc++6 \
      libx11-6 \
      libx11-xcb1 \
      libxcb1 \
      libxcomposite1 \
      libxcursor1 \
      libxdamage1 \
      libxext6 \
      libxfixes3 \
      libxi6 \
      libxrandr2 \
      libxrender1 \
      libxss1 \
      libxtst6 \
      lsb-release \
      wget \
      xdg-utils \
      xauth \
      xvfb \
      locales locales-all \
      python3 python3-pip \
      redis-server \
  && rm -rf /var/lib/apt/lists/*

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

RUN pip3 install --no-cache-dir rq fastapi uvicorn jinja2 aiofiles python-multipart

# Debug only 
ENV DEBUG="puppeteer:*"

RUN mkdir -p /tester/ext
RUN mkdir -p /tester/output
RUN mkdir -p /tmp/img
RUN chmod -R 777 /tmp/img
WORKDIR /tester/

RUN npm i puppeteer

COPY web/ /tester/web/
RUN gcc -o /tester/web/schitzo/schitzo /tester/web/schitzo/schitzo.c
COPY ./3FACTOOORX-public /tester/ext/
RUN sed -i 's/OOO{}/OOO{themorefactorsthebetter_butyouneedatleastthree}/g' /tester/ext/background_script.js

COPY start.sh /tester
RUN chmod +x start.sh

EXPOSE 4017
CMD ./start.sh