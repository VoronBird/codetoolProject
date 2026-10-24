from sqlalchemy import Integer, String, Text, Boolean, DateTime, func, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
  pass 

class User(Base): 
  __tablename__ = "users"
  id: Mapped[int] = mapped_column(Integer, primary_key = True, index = True)
  email: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
  hashed_password: Mapped[str] = mapped_column(String, nullable=False)
  is_active: Mapped[bool] = mapped_column(Boolean, default=True)
  role: Mapped[str] = mapped_column(String, default="user")

class Guide(Base):
  __tablename__ = "guides"
  id: Mapped[int] = mapped_column(Integer, primary_key = True, index = True)
  title: Mapped[str] = mapped_column(String(300))
  description: Mapped[str | None] = mapped_column(Text, nullable = True)
  syntax: Mapped[str | None] = mapped_column(Text, nullable = False)

class CodeCut(Base):
  __tablename__ = "codecuts"
  id: Mapped[int] = mapped_column(Integer, primary_key = True, index = True)
  title: Mapped[str] = mapped_column(String(300))
  description: Mapped[str | None] = mapped_column(Text, nullable = True)
  code: Mapped[str | None] = mapped_column(Text, nullable = False)
  completed: Mapped[bool] = mapped_column(Boolean, default = False) 
  owner_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable= False)
