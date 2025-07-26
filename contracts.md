# Portfolio Backend API Contracts

## Overview
Backend implementation for Asmit Samal's portfolio website to handle contact form submissions and potentially store visitor analytics.

## Current Mock Data (Frontend Only)
- **Contact Form**: Currently shows success toast but doesn't actually send emails
- **All other data**: Static mock data from `mockData.js`

## Backend Requirements

### 1. Contact Form API
**Endpoint**: `POST /api/contact`

**Request Body**:
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "subject": "string (required)",
  "message": "string (required)"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Functionality**:
- Validate all fields
- Store message in MongoDB
- Send email notification (optional - can be implemented later)
- Return success/error response

### 2. Database Schema

**Contact Messages Collection**:
```javascript
{
  _id: ObjectId,
  name: String,
  email: String, 
  subject: String,
  message: String,
  timestamp: Date (default: now),
  isRead: Boolean (default: false),
  ipAddress: String (optional)
}
```

### 3. Frontend Integration Points

**ContactSection.jsx**:
- Remove mock timeout in `handleSubmit`
- Replace with actual API call to `/api/contact`
- Handle real success/error responses
- Show proper loading states

**Current Mock Behavior to Replace**:
```javascript
// REMOVE THIS MOCK:
setTimeout(() => {
  setIsSubmitting(false);
  toast({
    title: "Message Sent!",
    description: "Thank you for reaching out. I'll get back to you soon!",
  });
  setFormData({ name: '', email: '', subject: '', message: '' });
}, 1000);
```

**Replace with**:
```javascript
// Real API call
const response = await axios.post(`${API}/contact`, formData);
```

## Optional Future Enhancements
1. **Analytics API**: Track page views, section visits
2. **Admin Panel**: View contact messages, mark as read
3. **Email Integration**: Actual email sending with nodemailer
4. **Rate Limiting**: Prevent spam submissions

## Implementation Priority
1. ✅ Contact form API (essential)
2. ⏳ Email notifications (nice to have)
3. ⏳ Basic analytics (future enhancement)

## Notes
- All other portfolio data (projects, skills, certifications) will remain static as they don't need dynamic updates
- Focus on making the contact form functional as the primary backend requirement