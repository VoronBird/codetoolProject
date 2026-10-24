from app import models
from app.schemas import data as schemas
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


async def get_all(db: AsyncSession) -> list[models.Guide]:
  result = await db.execute(
    select(models.Guide)
    )
  return result.scalars().all()



async def get_by_id(db: AsyncSession, guide_id: int) -> models.Guide:
  result = await db.execute(
    select(models.Guide).filter(models.Guide.id == guide_id)
  )
  guide = result.scalars().first()
  if not guide: 
    raise HTTPException(
      status_code=404, 
      detail="Документация не найденна")

  return guide




async def create(
    db: AsyncSession, 
    guide_data: schemas.Guide,
    ) -> models.Guide:
  guide = models.Guide(
    title = guide_data.title,
    description = guide_data.description,
    syntax = guide_data.syntax
  ) 
  db.add(guide)
  await db.commit()
  await db.refresh(guide)
  return guide



async def delete(db: AsyncSession, guide_id: int, admin_pass: str) -> None: 
  task = await get_by_id(db, guide_id)
  if admin_pass == 'key':
    await db.delete(task)
    await db.commit()
  else:
    raise HTTPException(
      status_code=403,
      detail="В доступе отказано"
    )


async def search(db: AsyncSession, keyword: str) -> list[models.Guide]:
    result = await db.execute(
        select(models.Guide).filter(models.Guide.title.contains(keyword))
    )
    return result.scalars().all()