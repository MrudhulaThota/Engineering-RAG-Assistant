from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class DocumentResponse(BaseModel):

    id: int

    filename: str

    original_name: str

    file_type: str

    subject: str

    pages: int

    status: str

    class Config:
        from_attributes = True