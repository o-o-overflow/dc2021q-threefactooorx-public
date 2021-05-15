import time
import subprocess
from redis import Redis

PROCESS_ARGS="/tester/web/schitzo/schitzo 10 /usr/local/bin/node puppeteer/chrome-ext.js".split()

def runTask(fname, redis_id):
  client = Redis(host='localhost', port=6379)
  
  PROCESS_ARGS.append(fname)
  sb = subprocess.run(PROCESS_ARGS)
  if sb.returncode != 0:
    client.set(redis_id, "ERROR")

  return {'group_name': 'task complete'}