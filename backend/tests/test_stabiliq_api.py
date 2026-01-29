"""
STABILIQ API Backend Tests
Tests for authentication, dashboard, courses, profile analysis, and financial assistance endpoints
"""
import pytest
import requests
import os
import random
import string

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test user credentials
TEST_EMAIL = f"test_user_{random.randint(1000, 9999)}@example.com"
TEST_PHONE = "9876543210"
TEST_NAME = "Test User"
TEST_OTP = "123456"

class TestHealthCheck:
    """Basic API health check tests"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"✓ API root returns: {data['message']}")

    def test_status_endpoint(self):
        """Test status endpoint"""
        response = requests.get(f"{BASE_URL}/api/status")
        assert response.status_code == 200
        print("✓ Status endpoint working")


class TestAuthentication:
    """Authentication flow tests"""
    
    @pytest.fixture(scope="class")
    def test_user_email(self):
        """Generate unique test email"""
        return f"test_user_{random.randint(10000, 99999)}@example.com"
    
    def test_send_otp_signup(self, test_user_email):
        """Test send OTP for signup"""
        response = requests.post(f"{BASE_URL}/api/auth/send-otp", json={
            "email": test_user_email,
            "phone": TEST_PHONE
        })
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print(f"✓ Send OTP successful for {test_user_email}")
    
    def test_verify_otp_and_signup(self, test_user_email):
        """Test OTP verification and user signup"""
        response = requests.post(f"{BASE_URL}/api/auth/verify-otp", json={
            "email": test_user_email,
            "phone": TEST_PHONE,
            "otp": TEST_OTP,
            "name": TEST_NAME,
            "plan": "basic"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "token" in data
        assert "user" in data
        assert data["user"]["email"] == test_user_email
        print(f"✓ User signup successful: {data['user']['name']}")
        return data["token"]
    
    def test_login_existing_user(self, test_user_email):
        """Test login for existing user"""
        # First signup
        requests.post(f"{BASE_URL}/api/auth/verify-otp", json={
            "email": test_user_email,
            "phone": TEST_PHONE,
            "otp": TEST_OTP,
            "name": TEST_NAME,
            "plan": "basic"
        })
        
        # Then login
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": test_user_email
        })
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print(f"✓ Login OTP sent for existing user")
    
    def test_login_nonexistent_user(self):
        """Test login for non-existent user returns 404"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "nonexistent_user_xyz@example.com"
        })
        assert response.status_code == 404
        print("✓ Login correctly rejects non-existent user")
    
    def test_get_me_without_token(self):
        """Test /me endpoint without token returns 401"""
        response = requests.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code == 401
        print("✓ /me endpoint correctly requires authentication")


class TestAuthenticatedEndpoints:
    """Tests for authenticated endpoints"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Create test user and get auth token"""
        email = f"auth_test_{random.randint(10000, 99999)}@example.com"
        response = requests.post(f"{BASE_URL}/api/auth/verify-otp", json={
            "email": email,
            "phone": TEST_PHONE,
            "otp": TEST_OTP,
            "name": "Auth Test User",
            "plan": "basic"
        })
        if response.status_code == 200:
            return response.json()["token"]
        pytest.skip("Failed to create test user")
    
    @pytest.fixture(scope="class")
    def auth_headers(self, auth_token):
        """Get authorization headers"""
        return {"Authorization": f"Bearer {auth_token}"}
    
    def test_get_current_user(self, auth_headers):
        """Test getting current user details"""
        response = requests.get(f"{BASE_URL}/api/auth/me", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert "user" in data
        assert "email" in data["user"]
        assert "name" in data["user"]
        print(f"✓ Get current user: {data['user']['name']}")


class TestDashboard:
    """Dashboard endpoint tests"""
    
    @pytest.fixture(scope="class")
    def auth_headers(self):
        """Create test user and get auth headers"""
        email = f"dashboard_test_{random.randint(10000, 99999)}@example.com"
        response = requests.post(f"{BASE_URL}/api/auth/verify-otp", json={
            "email": email,
            "phone": TEST_PHONE,
            "otp": TEST_OTP,
            "name": "Dashboard Test User",
            "plan": "pro"
        })
        if response.status_code == 200:
            token = response.json()["token"]
            return {"Authorization": f"Bearer {token}"}
        pytest.skip("Failed to create test user")
    
    def test_get_dashboard_stats(self, auth_headers):
        """Test dashboard stats endpoint"""
        response = requests.get(f"{BASE_URL}/api/dashboard/stats", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "coursesCompleted" in data
        assert "daysUntilFinancialAssistance" in data
        assert "planType" in data
        assert "daysSinceEnrollment" in data
        
        # Verify data types
        assert isinstance(data["coursesCompleted"], int)
        assert isinstance(data["daysUntilFinancialAssistance"], int)
        assert data["daysUntilFinancialAssistance"] >= 0
        assert data["daysUntilFinancialAssistance"] <= 45
        
        print(f"✓ Dashboard stats: {data['daysSinceEnrollment']} days enrolled, {data['daysUntilFinancialAssistance']} days until financial assistance")
    
    def test_dashboard_stats_without_auth(self):
        """Test dashboard stats requires authentication"""
        response = requests.get(f"{BASE_URL}/api/dashboard/stats")
        assert response.status_code == 401
        print("✓ Dashboard stats correctly requires authentication")


class TestCourses:
    """Course modules endpoint tests"""
    
    @pytest.fixture(scope="class")
    def auth_headers(self):
        """Create test user and get auth headers"""
        email = f"courses_test_{random.randint(10000, 99999)}@example.com"
        response = requests.post(f"{BASE_URL}/api/auth/verify-otp", json={
            "email": email,
            "phone": TEST_PHONE,
            "otp": TEST_OTP,
            "name": "Courses Test User",
            "plan": "basic"
        })
        if response.status_code == 200:
            token = response.json()["token"]
            return {"Authorization": f"Bearer {token}"}
        pytest.skip("Failed to create test user")
    
    def test_get_course_modules(self, auth_headers):
        """Test getting all course modules"""
        response = requests.get(f"{BASE_URL}/api/courses/modules", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "modules" in data
        modules = data["modules"]
        assert len(modules) == 6  # Should have 6 modules
        
        # Verify module structure
        for module in modules:
            assert "id" in module
            assert "title" in module
            assert "description" in module
            assert "lessons" in module
            assert "pdfs" in module
            assert "progress" in module
            assert len(module["lessons"]) > 0
            
            # Verify lesson structure
            for lesson in module["lessons"]:
                assert "id" in lesson
                assert "title" in lesson
                assert "duration" in lesson
                assert "videoUrl" in lesson
        
        print(f"✓ Got {len(modules)} course modules with lessons and PDFs")
    
    def test_get_specific_module(self, auth_headers):
        """Test getting a specific module"""
        response = requests.get(f"{BASE_URL}/api/courses/modules/module-1", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        
        assert data["id"] == "module-1"
        assert "title" in data
        assert "lessons" in data
        print(f"✓ Got specific module: {data['title']}")
    
    def test_get_nonexistent_module(self, auth_headers):
        """Test getting non-existent module returns 404"""
        response = requests.get(f"{BASE_URL}/api/courses/modules/nonexistent-module", headers=auth_headers)
        assert response.status_code == 404
        print("✓ Non-existent module correctly returns 404")
    
    def test_mark_lesson_complete(self, auth_headers):
        """Test marking a lesson as complete"""
        response = requests.post(
            f"{BASE_URL}/api/courses/modules/module-1/lessons/l1/complete",
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print("✓ Lesson marked as complete")
    
    def test_courses_without_auth(self):
        """Test courses endpoint requires authentication"""
        response = requests.get(f"{BASE_URL}/api/courses/modules")
        assert response.status_code == 401
        print("✓ Courses endpoint correctly requires authentication")


class TestProfileAnalysis:
    """Profile analysis endpoint tests"""
    
    @pytest.fixture(scope="class")
    def auth_headers(self):
        """Create test user and get auth headers"""
        email = f"profile_test_{random.randint(10000, 99999)}@example.com"
        response = requests.post(f"{BASE_URL}/api/auth/verify-otp", json={
            "email": email,
            "phone": TEST_PHONE,
            "otp": TEST_OTP,
            "name": "Profile Test User",
            "plan": "basic"
        })
        if response.status_code == 200:
            token = response.json()["token"]
            return {"Authorization": f"Bearer {token}"}
        pytest.skip("Failed to create test user")
    
    def test_analyze_profile_with_linkedin(self, auth_headers):
        """Test profile analysis with LinkedIn URL"""
        response = requests.post(
            f"{BASE_URL}/api/profile/analyze",
            headers=auth_headers,
            json={
                "resumeUrl": None,
                "linkedinUrl": "https://linkedin.com/in/testuser"
            }
        )
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert data["success"] == True
        assert "analysis" in data
        analysis = data["analysis"]
        
        # Verify analysis fields
        assert "resumeScore" in analysis
        assert "aiReadiness" in analysis
        assert "skillGaps" in analysis
        assert "strengths" in analysis
        assert "careerSuggestions" in analysis
        assert "keywordOptimization" in analysis
        assert "linkedinOptimization" in analysis
        
        # Verify score ranges
        assert 0 <= analysis["resumeScore"] <= 100
        assert 0 <= analysis["aiReadiness"] <= 100
        
        print(f"✓ Profile analysis: Resume Score {analysis['resumeScore']}, AI Readiness {analysis['aiReadiness']}")
    
    def test_analyze_profile_with_resume_url(self, auth_headers):
        """Test profile analysis with resume URL"""
        response = requests.post(
            f"{BASE_URL}/api/profile/analyze",
            headers=auth_headers,
            json={
                "resumeUrl": "/uploads/test_resume.pdf",
                "linkedinUrl": None
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print("✓ Profile analysis with resume URL successful")
    
    def test_analyze_profile_without_inputs(self, auth_headers):
        """Test profile analysis without any inputs returns 400"""
        response = requests.post(
            f"{BASE_URL}/api/profile/analyze",
            headers=auth_headers,
            json={
                "resumeUrl": None,
                "linkedinUrl": None
            }
        )
        assert response.status_code == 400
        print("✓ Profile analysis correctly requires at least one input")
    
    def test_profile_analysis_without_auth(self):
        """Test profile analysis requires authentication"""
        response = requests.post(
            f"{BASE_URL}/api/profile/analyze",
            json={"linkedinUrl": "https://linkedin.com/in/test"}
        )
        assert response.status_code == 401
        print("✓ Profile analysis correctly requires authentication")


class TestFinancialAssistance:
    """Financial assistance endpoint tests"""
    
    @pytest.fixture(scope="class")
    def auth_headers(self):
        """Create test user and get auth headers"""
        email = f"financial_test_{random.randint(10000, 99999)}@example.com"
        response = requests.post(f"{BASE_URL}/api/auth/verify-otp", json={
            "email": email,
            "phone": TEST_PHONE,
            "otp": TEST_OTP,
            "name": "Financial Test User",
            "plan": "basic"
        })
        if response.status_code == 200:
            token = response.json()["token"]
            return {"Authorization": f"Bearer {token}"}
        pytest.skip("Failed to create test user")
    
    def test_get_financial_assistance_status(self, auth_headers):
        """Test getting financial assistance status"""
        response = requests.get(
            f"{BASE_URL}/api/financial-assistance/status",
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "isUnlocked" in data
        assert "daysRemaining" in data
        assert "message" in data
        
        # For new user, should be locked with ~45 days remaining
        assert data["isUnlocked"] == False
        assert data["daysRemaining"] >= 44  # Allow for test timing
        assert data["daysRemaining"] <= 45
        
        print(f"✓ Financial assistance status: {data['daysRemaining']} days remaining, unlocked: {data['isUnlocked']}")
    
    def test_get_required_documents(self, auth_headers):
        """Test getting required documents list"""
        response = requests.get(
            f"{BASE_URL}/api/financial-assistance/documents-required",
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "documents" in data
        assert "submitEmail" in data
        
        documents = data["documents"]
        assert len(documents) == 6  # Should have 6 required documents
        
        # Verify document structure
        for doc in documents:
            assert "id" in doc
            assert "title" in doc
            assert "description" in doc
            assert "required" in doc
        
        print(f"✓ Got {len(documents)} required documents, submit to: {data['submitEmail']}")
    
    def test_request_financial_assistance_locked(self, auth_headers):
        """Test requesting financial assistance when locked returns 403"""
        response = requests.post(
            f"{BASE_URL}/api/financial-assistance/request",
            headers=auth_headers,
            json={}
        )
        assert response.status_code == 403
        data = response.json()
        assert "not yet available" in data["detail"].lower() or "wait" in data["detail"].lower()
        print("✓ Financial assistance request correctly blocked for new users")
    
    def test_financial_assistance_without_auth(self):
        """Test financial assistance requires authentication"""
        response = requests.get(f"{BASE_URL}/api/financial-assistance/status")
        assert response.status_code == 401
        print("✓ Financial assistance correctly requires authentication")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
