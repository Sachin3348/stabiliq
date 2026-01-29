from fastapi import APIRouter, HTTPException, Depends, Header
from typing import Optional
import jwt
from datetime import datetime, timedelta
import os

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

# JWT Configuration
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "stabiliq_secret_key_change_in_production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 30

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.replace("Bearer ", "")
    payload = verify_token(token)
    return payload

@router.post("/send-otp")
async def send_otp(request: dict):
    """Bypass OTP - always returns success"""
    email = request.get("email")
    phone = request.get("phone")
    
    if not email or not phone:
        raise HTTPException(status_code=400, detail="Email and phone are required")
    
    return {
        "success": True,
        "message": "OTP sent successfully (bypass mode - any OTP will work)"
    }

@router.post("/verify-otp")
async def verify_otp(request: dict):
    """Verify OTP (bypass - accepts any OTP) and create/login user"""
    from server import db
    from models import User
    
    email = request.get("email")
    phone = request.get("phone")
    otp = request.get("otp")
    name = request.get("name")
    plan = request.get("plan", "basic")
    
    if not all([email, phone, otp, name]):
        raise HTTPException(status_code=400, detail="All fields are required")
    
    # Check if user exists
    existing_user = await db.users.find_one({"email": email})
    
    if existing_user:
        # User exists - login
        user_data = {
            "id": existing_user.get("id"),
            "email": existing_user.get("email"),
            "name": existing_user.get("name"),
            "phone": existing_user.get("phone"),
            "plan": existing_user.get("plan", "basic"),
            "enrollmentDate": existing_user.get("enrollmentDate"),
            "isActive": existing_user.get("isActive", True)
        }
    else:
        # New user - create account
        user = User(
            email=email,
            name=name,
            phone=phone,
            plan=plan,
            enrollmentDate=datetime.utcnow(),  # Set enrollment date on signup
            createdAt=datetime.utcnow(),
            isActive=True
        )
        
        user_dict = user.dict()
        await db.users.insert_one(user_dict)
        
        user_data = {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "phone": user.phone,
            "plan": user.plan,
            "enrollmentDate": user.enrollmentDate.isoformat() if user.enrollmentDate else None,
            "isActive": user.isActive
        }
    
    # Create JWT token
    token = create_access_token({
        "sub": user_data["email"],
        "id": user_data["id"]
    })
    
    return {
        "success": True,
        "token": token,
        "user": user_data
    }

@router.post("/login")
async def login(request: dict):
    """Send OTP for login (bypass mode)"""
    email = request.get("email")
    
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
    
    from server import db
    
    # Check if user exists
    user = await db.users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found. Please sign up first.")
    
    return {
        "success": True,
        "message": "OTP sent successfully (bypass mode - any OTP will work)"
    }

@router.get("/me")
async def get_me(current_user = Depends(get_current_user)):
    """Get current user details"""
    from server import db
    
    user = await db.users.find_one({"email": current_user["sub"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "user": {
            "id": user.get("id"),
            "email": user.get("email"),
            "name": user.get("name"),
            "phone": user.get("phone"),
            "plan": user.get("plan", "basic"),
            "enrollmentDate": user.get("enrollmentDate"),
            "isActive": user.get("isActive", True)
        }
    }

@router.post("/logout")
async def logout():
    """Logout endpoint (client-side token removal)"""
    return {"success": True, "message": "Logged out successfully"}
