from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.database import engine, Base
from api import rest, ws
import uvicorn

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Face Detection API", version="1.0")

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rest.router, prefix="/api")
app.include_router(ws.router)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "AI Face Detection API is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
