#!/usr/bin/env python3
"""
Backend API Testing Suite for Asmit Portfolio
Tests all backend endpoints and database operations
"""

import requests
import json
import time
import os
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL')
if not BACKEND_URL:
    print("❌ REACT_APP_BACKEND_URL not found in environment")
    exit(1)

API_BASE_URL = f"{BACKEND_URL}/api"

print(f"🔗 Testing Backend API at: {API_BASE_URL}")
print("=" * 60)

class BackendTester:
    def __init__(self):
        self.test_results = []
        self.total_tests = 0
        self.passed_tests = 0
        self.failed_tests = 0
        
    def log_test(self, test_name, passed, message="", response_data=None):
        """Log test results"""
        self.total_tests += 1
        if passed:
            self.passed_tests += 1
            status = "✅ PASS"
        else:
            self.failed_tests += 1
            status = "❌ FAIL"
            
        print(f"{status} - {test_name}")
        if message:
            print(f"    {message}")
        if response_data and not passed:
            print(f"    Response: {response_data}")
        print()
        
        self.test_results.append({
            'test': test_name,
            'passed': passed,
            'message': message,
            'response': response_data
        })
    
    def test_health_check(self):
        """Test GET /api/ - Health check endpoint"""
        print("🔍 Testing Health Check Endpoint...")
        try:
            response = requests.get(f"{API_BASE_URL}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                expected_message = "Asmit Portfolio API is running!"
                expected_status = "healthy"
                
                if (data.get('message') == expected_message and 
                    data.get('status') == expected_status):
                    self.log_test(
                        "Health Check - Correct Response", 
                        True, 
                        f"Status: {response.status_code}, Response: {data}"
                    )
                else:
                    self.log_test(
                        "Health Check - Incorrect Response Format", 
                        False, 
                        f"Expected: {{'message': '{expected_message}', 'status': '{expected_status}'}}", 
                        data
                    )
            else:
                self.log_test(
                    "Health Check - Wrong Status Code", 
                    False, 
                    f"Expected: 200, Got: {response.status_code}", 
                    response.text
                )
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Health Check - Connection Error", 
                False, 
                f"Failed to connect: {str(e)}"
            )
    
    def test_contact_form_valid_submission(self):
        """Test POST /api/contact with valid data"""
        print("🔍 Testing Contact Form - Valid Submission...")
        
        valid_data = {
            "name": "Asmit Malakannawar",
            "email": "asmit.malakannawar@example.com",
            "subject": "Portfolio Inquiry",
            "message": "Hello Asmit, I'm interested in discussing a potential collaboration opportunity. Your portfolio looks impressive!"
        }
        
        try:
            response = requests.post(
                f"{API_BASE_URL}/contact", 
                json=valid_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                expected_message = "Thank you for reaching out! I'll get back to you soon."
                
                if (data.get('success') is True and 
                    data.get('message') == expected_message):
                    self.log_test(
                        "Contact Form - Valid Submission", 
                        True, 
                        f"Successfully submitted contact form"
                    )
                    return True
                else:
                    self.log_test(
                        "Contact Form - Incorrect Response Format", 
                        False, 
                        f"Expected success=True and specific message", 
                        data
                    )
            else:
                self.log_test(
                    "Contact Form - Wrong Status Code", 
                    False, 
                    f"Expected: 200, Got: {response.status_code}", 
                    response.text
                )
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Contact Form - Connection Error", 
                False, 
                f"Failed to connect: {str(e)}"
            )
        
        return False
    
    def test_contact_form_invalid_email(self):
        """Test POST /api/contact with invalid email formats"""
        print("🔍 Testing Contact Form - Invalid Email Validation...")
        
        invalid_emails = [
            "invalid-email",
            "test@",
            "@example.com",
            "test..test@example.com",
            "test@.com"
        ]
        
        for invalid_email in invalid_emails:
            test_data = {
                "name": "Test User",
                "email": invalid_email,
                "subject": "Test Subject",
                "message": "This is a test message with more than 10 characters."
            }
            
            try:
                response = requests.post(
                    f"{API_BASE_URL}/contact", 
                    json=test_data,
                    headers={'Content-Type': 'application/json'},
                    timeout=10
                )
                
                if response.status_code == 422:  # Validation error
                    self.log_test(
                        f"Email Validation - {invalid_email}", 
                        True, 
                        f"Correctly rejected invalid email"
                    )
                else:
                    self.log_test(
                        f"Email Validation - {invalid_email}", 
                        False, 
                        f"Expected: 422, Got: {response.status_code}", 
                        response.text
                    )
                    
            except requests.exceptions.RequestException as e:
                self.log_test(
                    f"Email Validation - {invalid_email}", 
                    False, 
                    f"Connection error: {str(e)}"
                )
    
    def test_contact_form_required_fields(self):
        """Test POST /api/contact with missing required fields"""
        print("🔍 Testing Contact Form - Required Fields Validation...")
        
        test_cases = [
            {"email": "test@example.com", "subject": "Test", "message": "Test message with enough characters"},  # Missing name
            {"name": "Test User", "subject": "Test", "message": "Test message with enough characters"},  # Missing email
            {"name": "Test User", "email": "test@example.com", "message": "Test message with enough characters"},  # Missing subject
            {"name": "Test User", "email": "test@example.com", "subject": "Test"},  # Missing message
        ]
        
        field_names = ["name", "email", "subject", "message"]
        
        for i, test_data in enumerate(test_cases):
            missing_field = field_names[i]
            
            try:
                response = requests.post(
                    f"{API_BASE_URL}/contact", 
                    json=test_data,
                    headers={'Content-Type': 'application/json'},
                    timeout=10
                )
                
                if response.status_code == 422:  # Validation error
                    self.log_test(
                        f"Required Field - Missing {missing_field}", 
                        True, 
                        f"Correctly rejected missing {missing_field}"
                    )
                else:
                    self.log_test(
                        f"Required Field - Missing {missing_field}", 
                        False, 
                        f"Expected: 422, Got: {response.status_code}", 
                        response.text
                    )
                    
            except requests.exceptions.RequestException as e:
                self.log_test(
                    f"Required Field - Missing {missing_field}", 
                    False, 
                    f"Connection error: {str(e)}"
                )
    
    def test_contact_form_field_length_validation(self):
        """Test POST /api/contact with field length validation"""
        print("🔍 Testing Contact Form - Field Length Validation...")
        
        # Test short message (less than 10 characters)
        short_message_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": "Short"  # Only 5 characters
        }
        
        try:
            response = requests.post(
                f"{API_BASE_URL}/contact", 
                json=short_message_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 422:
                self.log_test(
                    "Field Length - Short Message", 
                    True, 
                    "Correctly rejected message with less than 10 characters"
                )
            else:
                self.log_test(
                    "Field Length - Short Message", 
                    False, 
                    f"Expected: 422, Got: {response.status_code}", 
                    response.text
                )
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Field Length - Short Message", 
                False, 
                f"Connection error: {str(e)}"
            )
        
        # Test very long fields
        long_name = "A" * 101  # Over 100 character limit
        long_subject = "B" * 201  # Over 200 character limit
        long_message = "C" * 2001  # Over 2000 character limit
        
        test_cases = [
            ({"name": long_name, "email": "test@example.com", "subject": "Test", "message": "Valid message with enough characters"}, "Long Name"),
            ({"name": "Test", "email": "test@example.com", "subject": long_subject, "message": "Valid message with enough characters"}, "Long Subject"),
            ({"name": "Test", "email": "test@example.com", "subject": "Test", "message": long_message}, "Long Message")
        ]
        
        for test_data, test_name in test_cases:
            try:
                response = requests.post(
                    f"{API_BASE_URL}/contact", 
                    json=test_data,
                    headers={'Content-Type': 'application/json'},
                    timeout=10
                )
                
                if response.status_code == 422:
                    self.log_test(
                        f"Field Length - {test_name}", 
                        True, 
                        f"Correctly rejected {test_name.lower()}"
                    )
                else:
                    self.log_test(
                        f"Field Length - {test_name}", 
                        False, 
                        f"Expected: 422, Got: {response.status_code}", 
                        response.text
                    )
                    
            except requests.exceptions.RequestException as e:
                self.log_test(
                    f"Field Length - {test_name}", 
                    False, 
                    f"Connection error: {str(e)}"
                )
    
    def test_admin_endpoints(self):
        """Test admin endpoints for retrieving and managing contact messages"""
        print("🔍 Testing Admin Endpoints...")
        
        # Test GET /api/contact/messages
        try:
            response = requests.get(f"{API_BASE_URL}/contact/messages", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test(
                        "Admin - Get Contact Messages", 
                        True, 
                        f"Successfully retrieved {len(data)} messages"
                    )
                    
                    # If we have messages, test mark as read functionality
                    if data and len(data) > 0:
                        message_id = data[0].get('id')
                        if message_id:
                            self.test_mark_message_as_read(message_id)
                else:
                    self.log_test(
                        "Admin - Get Contact Messages", 
                        False, 
                        "Response is not a list", 
                        data
                    )
            else:
                self.log_test(
                    "Admin - Get Contact Messages", 
                    False, 
                    f"Expected: 200, Got: {response.status_code}", 
                    response.text
                )
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Admin - Get Contact Messages", 
                False, 
                f"Connection error: {str(e)}"
            )
    
    def test_mark_message_as_read(self, message_id):
        """Test PUT /api/contact/messages/{message_id}/read"""
        try:
            response = requests.put(f"{API_BASE_URL}/contact/messages/{message_id}/read", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') is True:
                    self.log_test(
                        "Admin - Mark Message as Read", 
                        True, 
                        f"Successfully marked message {message_id} as read"
                    )
                else:
                    self.log_test(
                        "Admin - Mark Message as Read", 
                        False, 
                        "Response success is not True", 
                        data
                    )
            else:
                self.log_test(
                    "Admin - Mark Message as Read", 
                    False, 
                    f"Expected: 200, Got: {response.status_code}", 
                    response.text
                )
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Admin - Mark Message as Read", 
                False, 
                f"Connection error: {str(e)}"
            )
    
    def test_database_storage_verification(self):
        """Verify that messages are properly stored in database by checking admin endpoint"""
        print("🔍 Testing Database Storage Verification...")
        
        # First, submit a unique test message
        unique_subject = f"Test Database Storage - {datetime.now().isoformat()}"
        test_data = {
            "name": "Database Test User",
            "email": "dbtest@example.com",
            "subject": unique_subject,
            "message": "This is a test message to verify database storage functionality."
        }
        
        # Submit the message
        try:
            submit_response = requests.post(
                f"{API_BASE_URL}/contact", 
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if submit_response.status_code == 200:
                # Wait a moment for database write
                time.sleep(1)
                
                # Retrieve messages and check if our test message is there
                get_response = requests.get(f"{API_BASE_URL}/contact/messages", timeout=10)
                
                if get_response.status_code == 200:
                    messages = get_response.json()
                    
                    # Look for our test message
                    found_message = None
                    for msg in messages:
                        if msg.get('subject') == unique_subject:
                            found_message = msg
                            break
                    
                    if found_message:
                        # Verify all required fields are present
                        required_fields = ['id', 'name', 'email', 'subject', 'message', 'timestamp', 'isRead', 'ipAddress']
                        missing_fields = [field for field in required_fields if field not in found_message]
                        
                        if not missing_fields:
                            self.log_test(
                                "Database Storage - Message Persistence", 
                                True, 
                                f"Message successfully stored with all required fields"
                            )
                            
                            # Verify field values
                            if (found_message['name'] == test_data['name'] and
                                found_message['email'] == test_data['email'] and
                                found_message['subject'] == test_data['subject'] and
                                found_message['message'] == test_data['message'] and
                                found_message['isRead'] is False):
                                
                                self.log_test(
                                    "Database Storage - Field Values", 
                                    True, 
                                    "All field values match submitted data"
                                )
                            else:
                                self.log_test(
                                    "Database Storage - Field Values", 
                                    False, 
                                    "Some field values don't match submitted data", 
                                    found_message
                                )
                        else:
                            self.log_test(
                                "Database Storage - Schema Validation", 
                                False, 
                                f"Missing required fields: {missing_fields}", 
                                found_message
                            )
                    else:
                        self.log_test(
                            "Database Storage - Message Not Found", 
                            False, 
                            f"Test message with subject '{unique_subject}' not found in database"
                        )
                else:
                    self.log_test(
                        "Database Storage - Retrieval Failed", 
                        False, 
                        f"Failed to retrieve messages: {get_response.status_code}"
                    )
            else:
                self.log_test(
                    "Database Storage - Submission Failed", 
                    False, 
                    f"Failed to submit test message: {submit_response.status_code}"
                )
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Database Storage - Connection Error", 
                False, 
                f"Connection error: {str(e)}"
            )
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Backend API Test Suite")
        print(f"📅 Test Run: {datetime.now().isoformat()}")
        print("=" * 60)
        
        # Run all tests
        self.test_health_check()
        self.test_contact_form_valid_submission()
        self.test_contact_form_invalid_email()
        self.test_contact_form_required_fields()
        self.test_contact_form_field_length_validation()
        self.test_database_storage_verification()
        self.test_admin_endpoints()
        
        # Print summary
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.total_tests}")
        print(f"✅ Passed: {self.passed_tests}")
        print(f"❌ Failed: {self.failed_tests}")
        print(f"Success Rate: {(self.passed_tests/self.total_tests)*100:.1f}%")
        
        if self.failed_tests > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result['passed']:
                    print(f"  - {result['test']}: {result['message']}")
        
        print("\n" + "=" * 60)
        return self.failed_tests == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    if success:
        print("🎉 All tests passed!")
        exit(0)
    else:
        print("💥 Some tests failed!")
        exit(1)