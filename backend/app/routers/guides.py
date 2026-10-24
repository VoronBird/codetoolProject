from fastapi import APIRouter, Depends, HTTPException
from app.schemas.data import Guide
from app.services import data_service
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import AsyncSessionLocal


router = APIRouter()


async def get_db():
  async with AsyncSessionLocal() as session:
    yield session



@router.get('/guides', response_model=list[Guide])
async def get_guides(db: AsyncSession = Depends(get_db)):
  return await data_service.get_all(db)


@router.post('/guides', response_model=Guide, status_code=201)
async def create_guide(
  guide_data: Guide, 
  admin_pass: str,
  db: AsyncSession = Depends(get_db)):
  if admin_pass == 'key':
    return await data_service.create(db ,guide_data)
  else:
    raise HTTPException(
          status_code=403,
          detail="В доступе отказано"
        )


@router.post("/guides/search", response_model=list[Guide])
async def search_guides(
  keyword: str, 
  db: AsyncSession = Depends(get_db)):
  return await data_service.search(db, keyword)