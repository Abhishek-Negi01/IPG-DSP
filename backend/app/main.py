from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI(title="IPG-DSP", description="Intelligent Public Grievance Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple in-memory storage
grievances = []
next_id = 1

class GrievanceInput(BaseModel):
    title: str
    description: str
    citizen_name: str
    citizen_contact: str
    location: str

class GrievanceOutput(BaseModel):
    id: int
    title: str
    description: str
    citizen_name: str
    citizen_contact: str
    location: str
    category: str
    urgency_score: float
    department: str
    status: str
    created_at: str

# Agent 1: Understanding Agent (Rule-based categorization)
def understanding_agent(title: str, description: str) -> str:
    text = f"{title} {description}".lower()
    
    if any(word in text for word in ['road', 'street', 'bridge', 'pothole', 'construction']):
        return 'infrastructure'
    elif any(word in text for word in ['water', 'pipe', 'leak', 'drainage', 'supply']):
        return 'water'
    elif any(word in text for word in ['electricity', 'power', 'outage', 'transformer']):
        return 'electricity'
    elif any(word in text for word in ['hospital', 'doctor', 'health', 'medical']):
        return 'healthcare'
    elif any(word in text for word in ['school', 'teacher', 'education']):
        return 'education'
    elif any(word in text for word in ['garbage', 'waste', 'pollution', 'noise']):
        return 'environment'
    else:
        return 'general'

# Agent 2: Urgency Agent (Simple scoring)
def urgency_agent(title: str, description: str) -> float:
    text = f"{title} {description}".lower()
    score = 0.3  # base score
    
    # High urgency keywords
    if any(word in text for word in ['emergency', 'urgent', 'critical', 'immediate']):
        score = 0.9
    elif any(word in text for word in ['serious', 'major', 'important']):
        score = 0.7
    elif any(word in text for word in ['problem', 'issue', 'broken']):
        score = 0.5
    
    return min(score, 1.0)

# Agent 3: Department Mapping Agent (Rule-based routing)
def department_mapping_agent(category: str, location: str) -> str:
    location_lower = location.lower()
    
    department_map = {
        'infrastructure': 'Public Works Department',
        'water': 'Water Supply Department', 
        'electricity': 'Electricity Board',
        'healthcare': 'Health Department',
        'education': 'Education Department',
        'environment': 'Environment Department',
        'general': 'General Administration'
    }
    
    # Location-based adjustments
    if 'rural' in location_lower and category == 'infrastructure':
        return 'Rural Development Department'
    
    return department_map.get(category, 'General Administration')

@app.get("/")
async def root():
    return {"message": "IPG-DSP API - Round 1 Prototype", "status": "running"}

@app.post("/api/v1/grievances/", response_model=GrievanceOutput)
async def submit_grievance(grievance: GrievanceInput):
    global next_id
    
    # Process through 3 agents
    category = understanding_agent(grievance.title, grievance.description)
    urgency_score = urgency_agent(grievance.title, grievance.description)
    department = department_mapping_agent(category, grievance.location)
    
    # Create grievance record
    new_grievance = {
        "id": next_id,
        "title": grievance.title,
        "description": grievance.description,
        "citizen_name": grievance.citizen_name,
        "citizen_contact": grievance.citizen_contact,
        "location": grievance.location,
        "category": category,
        "urgency_score": urgency_score,
        "department": department,
        "status": "submitted",
        "created_at": datetime.now().isoformat()
    }
    
    grievances.append(new_grievance)
    next_id += 1
    
    return new_grievance

@app.get("/api/v1/grievances/", response_model=List[GrievanceOutput])
async def get_grievances():
    return grievances

@app.get("/api/v1/grievances/{grievance_id}")
async def get_grievance(grievance_id: int):
    for g in grievances:
        if g["id"] == grievance_id:
            return g
    return {"error": "Grievance not found"}

@app.get("/api/v1/dashboard")
async def get_dashboard():
    if not grievances:
        return {"message": "No grievances submitted yet"}
    
    # Simple analytics
    total = len(grievances)
    categories = {}
    departments = {}
    urgency_high = 0
    
    for g in grievances:
        # Category distribution
        cat = g["category"]
        categories[cat] = categories.get(cat, 0) + 1
        
        # Department distribution  
        dept = g["department"]
        departments[dept] = departments.get(dept, 0) + 1
        
        # High urgency count
        if g["urgency_score"] >= 0.7:
            urgency_high += 1
    
    return {
        "total_grievances": total,
        "high_urgency_count": urgency_high,
        "category_distribution": categories,
        "department_distribution": departments
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)