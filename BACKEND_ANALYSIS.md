# Stabiliq Backend Analysis & Summary

## Overview
The Stabiliq backend is a FastAPI-based REST API that powers a member dashboard system for career transition and financial assistance. It uses MongoDB for data storage and implements JWT-based authentication.

## Technology Stack

### Core Framework
- **FastAPI** (v0.110.1) - Modern Python web framework
- **Uvicorn** (v0.25.0) - ASGI server
- **Motor** (v3.3.1) - Async MongoDB driver for Python

### Database
- **MongoDB** - NoSQL database
- Collections: `users`, `status_checks`

### Authentication & Security
- **PyJWT** (v2.10.1) - JWT token generation/verification
- **python-jose** (v3.5.0) - Additional JWT utilities
- **bcrypt** (v4.1.3) - Password hashing (not currently used, OTP bypass mode)
- Token expiration: 30 days
- Algorithm: HS256

### Other Key Dependencies
- **pydantic** (v2.12.5) - Data validation and serialization
- **python-dotenv** (v1.2.1) - Environment variable management
- **python-multipart** (v0.0.21) - File upload support
- **email-validator** (v2.3.0) - Email validation

## Project Structure

```
backend/
├── server.py                 # Main FastAPI application
├── models.py                 # Pydantic data models
├── requirements.txt          # Python dependencies
├── routes/
│   ├── auth.py              # Authentication endpoints
│   ├── dashboard.py         # Dashboard statistics
│   ├── courses.py           # Course modules & lessons
│   ├── profile.py           # Profile analysis & resume upload
│   └── financial_assistance.py  # Financial assistance features
└── tests/
    └── test_stabiliq_api.py  # Comprehensive test suite
```

## API Endpoints

### Base URL
- `/api/` - API root
- `/api/status` - Status check endpoints (GET, POST)

### Authentication (`/api/auth`)
- `POST /send-otp` - Send OTP (bypass mode - always succeeds)
- `POST /verify-otp` - Verify OTP and create/login user
- `POST /login` - Login (sends OTP)
- `GET /me` - Get current user (requires auth)
- `POST /logout` - Logout (client-side token removal)

### Dashboard (`/api/dashboard`)
- `GET /stats` - Get dashboard statistics (requires auth)
  - Returns: coursesCompleted, daysUntilFinancialAssistance, planType, enrollmentDate, daysSinceEnrollment

### Courses (`/api/courses`)
- `GET /modules` - Get all course modules (requires auth)
- `GET /modules/{module_id}` - Get specific module (requires auth)
- `POST /modules/{module_id}/lessons/{lesson_id}/complete` - Mark lesson complete (requires auth)

### Profile Analysis (`/api/profile`)
- `POST /upload-resume` - Upload resume file (requires auth, TODO: not fully implemented)
- `POST /analyze` - Analyze resume/LinkedIn profile (requires auth, returns mock data)

### Financial Assistance (`/api/financial-assistance`)
- `GET /status` - Get financial assistance unlock status (requires auth)
- `POST /request` - Submit financial assistance request (requires auth, 45-day lock)
- `GET /documents-required` - Get list of required documents (public endpoint)

## Data Models

### User Model
```python
{
    id: str (UUID),
    email: EmailStr,
    name: str,
    phone: str,
    plan: str ("basic" | "pro"),
    enrollmentDate: datetime (optional),
    createdAt: datetime,
    isActive: bool
}
```

### StatusCheck Model
```python
{
    id: str (UUID),
    client_name: str,
    timestamp: datetime
}
```

### Course Module Structure
- 6 predefined modules with:
  - id, title, description
  - lessons: [{id, title, duration, videoUrl, completed}]
  - pdfs: [{id, title, url}]
  - progress: int (0-100)

## Authentication Flow

1. **Signup/Login**: User provides email, phone, OTP (bypass mode - any OTP works)
2. **OTP Verification**: Creates new user or logs in existing user
3. **JWT Token**: Returns JWT token with user email and ID
4. **Protected Routes**: Require `Authorization: Bearer <token>` header
5. **Token Validation**: Middleware validates token and extracts user info

## Key Features

### 1. OTP Bypass Mode
- Currently in development mode
- Any OTP is accepted
- No actual SMS/email sending implemented

### 2. Financial Assistance Time Lock
- Unlocks 45 days after user enrollment
- Tracks days remaining until unlock
- Blocks requests until unlocked

### 3. Course Progress Tracking
- 6 predefined course modules
- Lesson completion tracking (TODO: database persistence)
- Progress calculation

### 4. Profile Analysis
- Mock analysis responses
- Resume upload endpoint (TODO: file storage)
- LinkedIn URL analysis support

### 5. CORS Configuration
- Configurable via `CORS_ORIGINS` environment variable
- Defaults to `*` (all origins)
- Supports credentials

## Environment Variables

Required:
- `MONGO_URL` - MongoDB connection string
- `DB_NAME` - Database name
- `JWT_SECRET_KEY` - Secret for JWT signing (defaults to "stabiliq_secret_key_change_in_production")

Optional:
- `CORS_ORIGINS` - Comma-separated list of allowed origins (defaults to "*")

## Testing

Comprehensive test suite covering:
- Health checks
- Authentication flows (signup, login, token validation)
- Protected endpoints
- Dashboard statistics
- Course modules
- Profile analysis
- Financial assistance status and requests

## TODOs & Incomplete Features

1. **File Storage**: Resume upload endpoint exists but doesn't store files
2. **Course Progress**: Lesson completion not persisted to database
3. **OTP Service**: Currently bypass mode, needs real SMS/email integration
4. **Profile Analysis**: Returns mock data, needs real AI/ML integration
5. **Financial Assistance Requests**: Not stored in database

## Database Collections

- `users` - User accounts and profiles
- `status_checks` - API health/status tracking

## Error Handling

- HTTP status codes: 200, 400, 401, 403, 404
- JSON error responses with `detail` field
- Token expiration handling
- User not found handling

## Logging

- Basic logging configuration
- INFO level logging
- Format: `%(asctime)s - %(name)s - %(levelname)s - %(message)s`
