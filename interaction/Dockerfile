FROM python:3.8-alpine

ENV TERM linux

run apk update && apk add --no-cache bash

COPY requirements.txt /
RUN pip install -r /requirements.txt

COPY exploit1.sh /
COPY check1.py /

