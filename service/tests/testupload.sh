#!/bin/bash

if [ -z "$1" ] 
then
  echo "No host supplied"
  exit 1
fi

if [ -z "$2" ] 
then
  echo "No port supplied"
  exit 1
fi


for i in {0..63}; do
  curl -F 'file=@test.html' http://$1:$2/uploadfile/ &
done
