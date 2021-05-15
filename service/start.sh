#!/bin/bash

XVFB_WHD=${XVFB_WHD:-1280x720x16}

# Start Xvfb
Xvfb :99 -ac -screen 0 $XVFB_WHD -nolisten tcp &
xvfb=$!
export DISPLAY=:99

cd web
service redis-server start
for i in {0..7}
do
  echo "Worker $i"
  rq worker --url redis://localhost:6379 my_queue &
done

uvicorn api:app --host 0.0.0.0 --port 4017
wait $xvfb