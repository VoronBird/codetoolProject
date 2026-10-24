from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import deepApi, guides, users, codecuts

app = FastAPI(title= "Task Manager API")

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_methods=["*"],
  allow_headers=["*"]
)

app.include_router(deepApi.router)
app.include_router(guides.router)
app.include_router(codecuts.router)
app.include_router(users.router)


#@app.on_event("startup")
#async def on_startup():
  # Base.metadata.create_all(bind = engine)
  #async with engine.begin() as conn:
    #await conn.run_sync(Base.metadata.create_all)

  

@app.get('/')
async def root():
  return {"message": "WebToolProject"}