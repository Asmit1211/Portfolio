from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from typing import Optional
import os
import logging
from pathlib import Path
from dotenv import load_dotenv
import uuid

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Asmit Portfolio API", version="1.0.0")

# Create API router
api_router = APIRouter(prefix="/api")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Pydantic Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    isRead: bool = Field(default=False)
    ipAddress: Optional[str] = None

class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)

class ContactResponse(BaseModel):
    success: bool
    message: str

# API Routes
@api_router.get("/", response_model=dict)
async def root():
    """Health check endpoint"""
    return {"message": "Asmit Portfolio API is running!", "status": "healthy"}

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(contact_data: ContactRequest):
    """Handle contact form submissions"""
    try:
        # Create contact message document
        contact_message = ContactMessage(
            **contact_data.dict(),
            ipAddress="127.0.0.1"  # In production, get real IP
        )
        
        # Insert into MongoDB
        result = await db.contact_messages.insert_one(contact_message.dict())
        
        if result.inserted_id:
            logger.info(f"Contact message saved: {contact_message.id}")
            
            return ContactResponse(
                success=True,
                message="Thank you for reaching out! I'll get back to you soon."
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save message")
            
    except Exception as e:
        logger.error(f"Error saving contact message: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="Sorry, there was an error sending your message. Please try again."
        )

@api_router.get("/contact/messages", response_model=list)
async def get_contact_messages():
    """Get all contact messages (for admin use)"""
    try:
        messages = await db.contact_messages.find().sort("timestamp", -1).to_list(100)
        return [ContactMessage(**msg) for msg in messages]
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching messages")

@api_router.put("/contact/messages/{message_id}/read")
async def mark_message_as_read(message_id: str):
    """Mark a contact message as read"""
    try:
        result = await db.contact_messages.update_one(
            {"id": message_id},
            {"$set": {"isRead": True}}
        )
        
        if result.modified_count > 0:
            return {"success": True, "message": "Message marked as read"}
        else:
            raise HTTPException(status_code=404, detail="Message not found")
            
    except Exception as e:
        logger.error(f"Error updating message: {str(e)}")
        raise HTTPException(status_code=500, detail="Error updating message")

# Include router in main app
app.include_router(api_router)

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close database connection on shutdown"""
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
