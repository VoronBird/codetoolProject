from app import models
from app.schemas import codecut as schemas
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


async def get_all(db: AsyncSession, user_id: int) -> list[models.CodeCut]:

  result = await db.execute(
    select(models.CodeCut).filter(models.CodeCut.owner_id == user_id)
    )
  return result.scalars().all()



async def get_by_id(db: AsyncSession, cut_id: int, user_id: int) -> models.CodeCut:
  result = await db.execute(
    select(models.CodeCut).filter(models.CodeCut.id == cut_id, models.CodeCut.owner_id == user_id)
  )
  cut = result.scalars().first()
  if not cut: 
    raise HTTPException(
      status_code=404, 
      detail="Задача не найденна")

  return cut




async def create(
    db: AsyncSession, 
    cut_data: schemas.Codecut,
    user_id: int ) -> models.CodeCut:
  cut = models.CodeCut(
    title = cut_data.title,
    description = cut_data.description,
    code = cut_data.code,
    owner_id=user_id
  ) 
  db.add(cut)
  await db.commit()
  await db.refresh(cut)
  return cut

async def delete(db: AsyncSession, cut_id: int, user_id: int) -> None: 
  cut = await get_by_id(db, cut_id, user_id)
  await db.delete(cut)
  await db.commit()

async def search(db: AsyncSession, keyword: str, user_id) -> list[models.CodeCut]:
    result = await db.execute(
        select(models.CodeCut).filter(models.CodeCut.owner_id == user_id, models.CodeCut.title.contains(keyword))
    )
    return result.scalars().all()