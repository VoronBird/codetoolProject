from pydantic import BaseModel, Field
from typing import Optional 
from datetime import datetime


class Codecut(BaseModel):
    title: str
    description: str
    code: str

class CodecutOut(BaseModel):
    id: int
    title: str
    description: str
    code: str