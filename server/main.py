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

@app.get("/get_tasks")
async def get_tasks():
    return {"message": "Tasks retrieved"}

@app.put("/update_task")
async def update_task(task: Task):
    return {"message": "Task updated"}

@app.delete("/delete_task")
async def delete_task(task: Task):
    return {"message": "Task deleted"}




if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
    
