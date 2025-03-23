from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Hello World"}

@router.get("/items/{item_id}")
async def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}



@router.post("/items/")
async def create_item(item: Item):
    return item



