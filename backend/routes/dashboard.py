from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from routes.auth import get_current_user

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("/stats")
async def get_dashboard_stats(current_user = Depends(get_current_user)):
    """Get dashboard statistics for current user"""
    from server import db
    
    user = await db.users.find_one({"email": current_user["sub"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Calculate days since enrollment
    enrollment_date = user.get("enrollmentDate")
    days_since_enrollment = 0
    days_until_financial = 45
    
    if enrollment_date:
        if isinstance(enrollment_date, str):
            enrollment_date = datetime.fromisoformat(enrollment_date.replace('Z', '+00:00'))
        days_since_enrollment = (datetime.utcnow() - enrollment_date).days
        days_until_financial = max(0, 45 - days_since_enrollment)
    
    return {
        "coursesCompleted": 0,  # TODO: Track course progress
        "daysUntilFinancialAssistance": days_until_financial,
        "planType": user.get("plan", "basic"),
        "enrollmentDate": enrollment_date.isoformat() if enrollment_date else None,
        "daysSinceEnrollment": days_since_enrollment
    }
