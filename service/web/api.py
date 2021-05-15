from fastapi import FastAPI, HTTPException, Request, File, UploadFile
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from redis import Redis
from rq import Queue
import aiofiles
import tempfile
from os import path, chmod
import random
from starlette.status import HTTP_302_FOUND
from worker import runTask

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/img", StaticFiles(directory="/tmp/img"), name="img")
templates = Jinja2Templates(directory="templates")

client = Redis(host='localhost', port=6379)
q = Queue('my_queue', connection=client)


@app.get('/')
def hello(request: Request):
    return templates.TemplateResponse("welcome.html", {"request": request})


@app.get('/queueSize')
def queueSize():
    """Test endpoint"""
    return {'Queue Size': len(q)}

@app.get("/submit", response_class=HTMLResponse)
async def read_item(request: Request):
  return templates.TemplateResponse("base.html", {"request": request})

@app.get("/view/{id}", response_class=HTMLResponse)
async def viewsubmission(id: str, request: Request):
  try:
    fname = client.get(id).decode('UTF-8') 
  except:
    return RedirectResponse(url=f"/", status_code=HTTP_302_FOUND)
  if path.exists("/tmp" + fname):
    return templates.TemplateResponse("viewsubmission.html", {"request": request,"image": fname})
  elif fname == "ERROR":
    return templates.TemplateResponse("error.html", {"request": request})
  else:
    return templates.TemplateResponse("processing.html", {"request": request})


@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
  rid = random.randint(0,2**128)
  tf = tempfile.NamedTemporaryFile(delete=False,prefix=f"3factooorx-{rid}-",suffix=".html")
  async with aiofiles.open(tf.name, 'wb') as out_file:
    content = await file.read(1024*1024)  
    await out_file.write(content)  
  chmod(tf.name, 0o666)
  job = q.enqueue(runTask, tf.name, rid)
  client.set(rid, tf.name.replace(".html", ".png").replace("tmp", "img"))
  return RedirectResponse(url=f"/view/{rid}", status_code=HTTP_302_FOUND)
