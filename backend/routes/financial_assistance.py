from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from routes.auth import get_current_user

router = APIRouter(prefix="/api/financial-assistance", tags=["Financial Assistance"])

@router.get("/status")
async def get_financial_assistance_status(current_user = Depends(get_current_user)):
    """Check if financial assistance is unlocked (45 days after enrollment)"""
    from server import db
    
    user = await db.users.find_one({"email": current_user["sub"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    enrollment_date = user.get("enrollmentDate")
    
    if not enrollment_date:
        return {
            "isUnlocked": False,
            "daysRemaining": 45,
            "message": "Enrollment date not found"
        }
    
    # Handle both datetime and string formats
    if isinstance(enrollment_date, str):
        enrollment_date = datetime.fromisoformat(enrollment_date.replace('Z', '+00:00'))
    
    days_since_enrollment = (datetime.utcnow() - enrollment_date).days
    days_remaining = max(0, 45 - days_since_enrollment)
    is_unlocked = days_since_enrollment >= 45
    
    return {
        "isUnlocked": is_unlocked,
        "daysRemaining": days_remaining,
        "daysSinceEnrollment": days_since_enrollment,
        "enrollmentDate": enrollment_date.isoformat(),
        "message": "Financial assistance available" if is_unlocked else f"Available in {days_remaining} days"
    }

@router.post("/request")
async def request_financial_assistance(data: dict, current_user = Depends(get_current_user)):
    """Submit financial assistance request"""
    from server import db
    
    # Check if unlocked
    status = await get_financial_assistance_status(current_user)
    
    if not status["isUnlocked"]:
        raise HTTPException(
            status_code=403, 
            detail=f"Financial assistance is not yet available. Please wait {status['daysRemaining']} more days."
        )
    
    # TODO: Store request in database
    # For now, just return success
    return {
        "success": True,
        "message": "Financial assistance request received. Our team will review and contact you soon.",
        "requestId": f"FA-{current_user['id'][:8]}-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"
    }

@router.get("/documents-required")
async def get_required_documents():
    """Get list of documents required for financial assistance"""
    return {
        "documents": [
            {
                "id": "doc-1",
                "title": "Document providing reason for job loss",
                "description": "Official termination letter or layoff notice",
                "required": True
            },
            {
                "id": "doc-2",
                "title": "Employment termination letter from employer",
                "description": "Letter on company letterhead stating termination",
                "required": True
            },
            {
                "id": "doc-3",
                "title": "Salary slips of last 3 months",
                "description": "Recent salary slips showing employment",
                "required": True
            },
            {
                "id": "doc-4",
                "title": "Form 16",
                "description": "Latest Form 16 or tax documents",
                "required": True
            },
            {
                "id": "doc-5",
                "title": "Employer's contact details",
                "description": "Phone number and email of HR/Manager",
                "required": True
            },
            {
                "id": "doc-6",
                "title": "Government ID Proof",
                "description": "Aadhaar card, PAN card, or Passport",
                "required": True
            }
        ],
        "submitEmail": "support@stabiliq.in",
        "additionalInfo": "Please compile all documents in a single PDF and email to support@stabiliq.in with subject: 'Financial Assistance Request - [Your Name]'"
    }
