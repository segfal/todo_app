from fastapi import FastAPI
import uvicorn
from Tasks import Task
app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/add_task")
async def add_task(task: Task):
    return {"message": "Task added"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
    
