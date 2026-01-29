# STABILIQ MEMBER DASHBOARD - Implementation Contracts

## AUTHENTICATION SYSTEM

### Backend Models

**User Model:**
```
{
  _id: ObjectId,
  email: string,
  name: string,
  phone: string,
  plan: "basic" | "pro",
  enrollmentDate: Date (payment completion date),
  createdAt: Date,
  isActive: boolean
}
```

### Auth Endpoints

**POST /api/auth/send-otp**
- Body: { email, phone }
- Action: Bypass - always return success
- Response: { success: true, message: "OTP sent" }

**POST /api/auth/verify-otp**
- Body: { email, phone, otp, name }
- Action: Accept ANY OTP, create user if new, generate JWT
- Response: { success: true, token: string, user: {...} }

**POST /api/auth/login**
- Body: { email }
- Action: Send OTP (bypass)
- Response: { success: true }

**GET /api/auth/me**
- Headers: Authorization: Bearer <token>
- Response: { user: {...} }

## MEMBER DASHBOARD DATA

### GET /api/dashboard/stats
- Response: { coursesCompleted, daysUntilFinancialAssistance, planType }

### GET /api/courses/modules
- Response: Array of 6 modules with lessons

### POST /api/profile/upload-resume
- Body: FormData with resume file
- Response: { success, fileUrl }

### POST /api/profile/analyze
- Body: { resumeUrl, linkedinUrl }
- Response: { analysis: {...} } (mock structured data)

### GET /api/financial-assistance/status
- Response: { isUnlocked: boolean, daysRemaining: number, enrollmentDate }

## FRONTEND ROUTES

### Public Routes:
- / → Landing page
- /login → Login page
- /signup → Signup with OTP

### Protected Routes (require auth):
- /dashboard → Main dashboard
- /dashboard/courses → AI Upskill Hub
- /dashboard/profile-analysis → Profile Analysis Tool
- /dashboard/financial-assistance → Financial Assistance

## FRONTEND STATE MANAGEMENT

**Auth Context:**
- user: User object or null
- token: JWT string
- login(token, user)
- logout()
- isAuthenticated: boolean

## DATA FLOW

### Signup Flow:
1. User enters email, phone, name
2. Click "Send OTP" → /api/auth/send-otp (bypass, always success)
3. Enter ANY OTP
4. Click "Verify" → /api/auth/verify-otp
5. Backend creates user with current date as enrollmentDate
6. Return JWT token
7. Redirect to /dashboard

### Dashboard Access:
1. Check JWT token in localStorage
2. If not found → redirect to /login
3. If found → fetch /api/auth/me to validate
4. If invalid → redirect to /login
5. If valid → show dashboard

### Financial Assistance Lock Logic:
1. Get user.enrollmentDate from backend
2. Calculate: daysSinceEnrollment = (today - enrollmentDate) / (1000*60*60*24)
3. If daysSinceEnrollment < 45 → show locked with countdown
4. If daysSinceEnrollment >= 45 → show "Request Assistance" button

## MOCK DATA

### Course Modules (6):
1. AI-Assisted Resume Writing & Optimization
2. Smart Job Search with AI Tools
3. AI-Powered Interview Preparation
4. Networking Automation with AI
5. Personal Branding with AI Content
6. AI Productivity Tools for Career Growth

Each module:
- 4-6 video lessons (dummy YouTube embed)
- 2-3 PDF resources (dummy links)
- Progress tracking (frontend state)

### Profile Analysis Mock Output:
```
{
  skillGaps: ["Python", "Machine Learning", "Data Analysis"],
  aiReadiness: 65, // percentage
  strengths: ["Communication", "Project Management"],
  careerSuggestions: [
    "Consider upskilling in Python for AI roles",
    "Add quantifiable achievements to resume",
    "Optimize LinkedIn headline for recruiters"
  ],
  resumeScore: 72
}
```

## STYLING

- Match existing STABILIQ design system
- Use Sora + Inter fonts
- Color scheme: Blue-Teal gradients, slate backgrounds
- Framer Motion animations for transitions
- Shadcn UI components
- Responsive: mobile-first approach
