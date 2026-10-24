from fastapi import APIRouter, Depends, HTTPException
router = APIRouter()
from app.schemas.codecut import Codecut
from app.schemas.codecut import CodecutOut
from app.services import codecut_service
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import AsyncSessionLocal
from app.auth import get_current_user
from app.models import User



async def get_db():
  async with AsyncSessionLocal() as session:
    yield session


@router.get('/codecuts', response_model=list[CodecutOut])
async def get_cuts(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
  return await codecut_service.get_all(db, current_user.id)

@router.post('/codecuts', response_model=CodecutOut, status_code=201)
async def create_codecuts(
  cut_data: Codecut, 
  db: AsyncSession = Depends(get_db),
  current_user: User = Depends(get_current_user)):
  return await codecut_service.create(db ,cut_data, current_user.id)
@router.delete('/codecuts/{cut_id}', status_code=204)
async def delete_cut(
  cut_id: int, 
  db: AsyncSession = Depends(get_db), 
  current_user: User = Depends(get_current_user)):
  await codecut_service.delete(db, cut_id, current_user.id)

@router.get("/codecuts/search", response_model=list[CodecutOut])
async def search_codecuts(
  keyword: str, 
  db: AsyncSession = Depends(get_db),
  current_user: User = Depends(get_current_user)):
    return await codecut_service.search(db, keyword, current_user.id)

