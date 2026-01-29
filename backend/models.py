from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
import uuid

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    name: str
    phone: str
    plan: str = "basic"  # "basic" or "pro"
    enrollmentDate: Optional[datetime] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    isActive: bool = True

class SendOTPRequest(BaseModel):
    email: EmailStr
    phone: str

class VerifyOTPRequest(BaseModel):
    email: EmailStr
    phone: str
    otp: str
    name: str
    plan: Optional[str] = "basic"

class LoginRequest(BaseModel):
    email: EmailStr

class CourseModule(BaseModel):
    id: str
    title: str
    description: str
    lessons: List[dict]
    pdfs: List[dict]
    progress: int = 0

class ProfileAnalysisRequest(BaseModel):
    resumeUrl: Optional[str] = None
    linkedinUrl: Optional[str] = None
