from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

# Round-2 Enhancement: Import NLP utilities
try:
    from app.utils.nlp_utils import get_nlp_insights
    NLP_AVAILABLE = True
except ImportError:
    NLP_AVAILABLE = False
    print("NLP utilities not available - running in Round-1 mode")

app = FastAPI(
    title="IPG-DSP", 
    description="Intelligent Public Grievance Platform - Round 2 Enhanced",
    version="2.0.0"
)

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
    # Round-2 Enhancement: NLP insights
    nlp_insights: Optional[Dict[str, Any]] = None

# ROUND-1 AGENTS (Original rule-based logic - kept intact)

# Agent 1: Understanding Agent (Rule-based categorization)
def understanding_agent_v1(title: str, description: str) -> str:
    """Original Round-1 rule-based categorization"""
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
def urgency_agent_v1(title: str, description: str) -> float:
    """Original Round-1 urgency scoring"""
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
def department_mapping_agent_v1(category: str, location: str) -> str:
    """Original Round-1 department mapping"""
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

# ROUND-2 ENHANCED AGENTS (NLP-assisted)

def understanding_agent_v2(title: str, description: str, nlp_insights: Dict) -> str:
    """Round-2 NLP-enhanced categorization"""
    # Start with Round-1 result
    base_category = understanding_agent_v1(title, description)
    
    if not NLP_AVAILABLE or not nlp_insights:
        return base_category
    
    # Use NLP entities to refine categorization
    entities = nlp_insights.get('entities', {})
    locations = entities.get('locations', [])
    organizations = entities.get('organizations', [])
    
    # Enhance with entity-based rules
    text_lower = f"{title} {description}".lower()
    
    # Check for specific organization mentions
    if any('hospital' in org.lower() for org in organizations):
        return 'healthcare'
    elif any('school' in org.lower() or 'college' in org.lower() for org in organizations):
        return 'education'
    elif any('water' in org.lower() for org in organizations):
        return 'water'
    
    # Check for location-based refinements
    if locations and base_category == 'general':
        if any('road' in text_lower or 'street' in text_lower for _ in locations):
            return 'infrastructure'
    
    return base_category

def urgency_agent_v2(title: str, description: str, nlp_insights: Dict) -> float:
    """Round-2 NLP-enhanced urgency scoring"""
    # Start with Round-1 score
    base_score = urgency_agent_v1(title, description)
    
    if not NLP_AVAILABLE or not nlp_insights:
        return base_score
    
    # Check for duplicate - reduce urgency if similar grievance exists
    similarity = nlp_insights.get('similarity', {})
    if similarity and similarity.get('is_duplicate', False):
        similarity_score = similarity.get('similarity_score', 0.0)
        if similarity_score > 0.8:  # Very similar
            base_score = max(0.2, base_score - 0.3)  # Reduce urgency
    
    # Use entities to boost urgency
    entities = nlp_insights.get('entities', {})
    organizations = entities.get('organizations', [])
    
    # Boost urgency for critical infrastructure mentions
    if any('emergency' in org.lower() or 'hospital' in org.lower() for org in organizations):
        base_score = min(1.0, base_score + 0.2)
    
    return base_score

@app.get("/")
async def root():
    return {
        "message": "IPG-DSP API - Round 2 Enhanced", 
        "status": "running",
        "version": "2.0.0",
        "nlp_enabled": NLP_AVAILABLE
    }

@app.post("/api/v1/grievances/", response_model=GrievanceOutput)
async def submit_grievance(grievance: GrievanceInput):
    global next_id
    
    # Round-2 Enhancement: Get NLP insights first
    nlp_insights = None
    if NLP_AVAILABLE:
        try:
            nlp_insights = get_nlp_insights(grievance.title, grievance.description)
        except Exception as e:
            print(f"NLP processing failed: {e}")
            nlp_insights = {"error": str(e), "nlp_enabled": False}
    
    # Process through enhanced agents (fallback to Round-1 if NLP fails)
    if NLP_AVAILABLE and nlp_insights and not nlp_insights.get('error'):
        # Use Round-2 enhanced agents
        category = understanding_agent_v2(grievance.title, grievance.description, nlp_insights)
        urgency_score = urgency_agent_v2(grievance.title, grievance.description, nlp_insights)
    else:
        # Fallback to Round-1 agents
        category = understanding_agent_v1(grievance.title, grievance.description)
        urgency_score = urgency_agent_v1(grievance.title, grievance.description)
    
    # Department mapping (same logic for both rounds)
    department = department_mapping_agent_v1(category, grievance.location)
    
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
        "created_at": datetime.now().isoformat(),
        "nlp_insights": nlp_insights  # Round-2 addition
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

@app.get("/api/v1/analytics/dashboard")
async def get_dashboard():
    if not grievances:
        return {"message": "No grievances submitted yet"}
    
    # Simple analytics
    total = len(grievances)
    categories = {}
    departments = {}
    urgency_high = 0
    duplicates_detected = 0
    nlp_processed = 0
    
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
        
        # Round-2 analytics: NLP insights
        nlp_insights = g.get("nlp_insights")
        if nlp_insights:
            nlp_processed += 1
            similarity = nlp_insights.get("similarity", {})
            if similarity and similarity.get("is_duplicate", False):
                duplicates_detected += 1
    
    return {
        "total_grievances": total,
        "high_urgency_count": urgency_high,
        "category_distribution": categories,
        "department_distribution": departments,
        # Round-2 enhancements
        "nlp_processed": nlp_processed,
        "duplicates_detected": duplicates_detected,
        "nlp_enabled": NLP_AVAILABLE
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)