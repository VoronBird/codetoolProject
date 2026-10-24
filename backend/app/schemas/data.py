from pydantic import BaseModel, Field
from typing import Optional 
from datetime import datetime


class Guide(BaseModel):
    title: str
    description: str
    syntax: str