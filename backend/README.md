# Backend System

The smart processing engine that automatically reads, understands, and organizes citizen complaints.

## What This System Does

Think of this as a **smart assistant** for government offices that:

- **Reads complaints** submitted by citizens through the website
- **Understands the content** using AI to identify what the problem is about
- **Categorizes automatically** into types like roads, water, electricity, healthcare
- **Scores urgency** from 0.0 (routine) to 1.0 (emergency) based on language used
- **Routes intelligently** to the correct government department
- **Detects duplicates** to avoid processing the same issue multiple times
- **Provides analytics** to help government understand citizen concerns

## Our Processing Approach

### The 3-Agent Smart Pipeline

**Agent 1: Understanding Agent**

- **Job**: Figure out what type of problem this is
- **How it works**: Looks for keywords like "road", "water", "hospital" + uses AI to find locations and organizations mentioned
- **Output**: Category (infrastructure, healthcare, education, environment, etc.)

**Agent 2: Urgency Agent**

- **Job**: Determine how urgent this complaint is
- **How it works**: Scans for urgent words like "emergency", "dangerous", "broken" + checks if similar complaints already exist
- **Output**: Urgency score from 0.0 to 1.0

**Agent 3: Department Routing Agent**

- **Job**: Send complaint to the right government department
- **How it works**: Maps category to department + considers location (urban vs rural)
- **Output**: Target department (Public Works, Health Dept, etc.)

### Example Processing Flow

```
Input: "Urgent water pipe burst on Gandhi Road causing flooding"

Agent 1 Processing:
├── Keywords found: "water", "pipe", "burst"
├── Location found: "Gandhi Road"
└── Result: Category = "water"

Agent 2 Processing:
├── Urgency words: "urgent", "burst", "flooding"
├── Check for duplicates: None found
└── Result: Urgency = 0.9 (High Priority)

Agent 3 Processing:
├── Category: "water" → Maps to "Water Supply Department"
├── Location: Urban area → Standard routing
└── Result: Route to "Water Supply Department"

Final Output: Categorized, prioritized, and routed complaint ready for action!
```

## API Endpoints (What the Frontend Can Do)

- **`POST /api/v1/grievances/`** - Submit new complaint and get it processed automatically
- **`GET /api/v1/grievances/`** - Get list of all complaints with their processing results
- **`GET /api/v1/grievances/{id}`** - Get details of a specific complaint
- **`GET /api/v1/analytics/dashboard`** - Get statistics and insights about complaint patterns

## Technology Approach

### Core Technologies Used

- **FastAPI**: Modern Python web framework - fast, reliable, automatic documentation
- **spaCy**: Pre-trained AI for text understanding - no custom training needed
- **scikit-learn**: Standard machine learning tools for finding similar text
- **Python**: Popular, maintainable programming language

### Why These Choices?

- **Proven & Reliable**: All are industry-standard technologies used by major companies
- **Government-Appropriate**: Transparent, auditable, and secure
- **Easy to Maintain**: Future developers can easily understand and improve the code
- **No Training Required**: Uses pre-built AI models, works immediately

### AI Approach Philosophy

- **Explainable First**: Every AI decision can be traced back to specific rules or patterns
- **Fallback Ready**: If AI processing fails, system falls back to basic keyword matching
- **Incremental Intelligence**: Start with simple rules, add more AI capabilities over time
- **No Black Boxes**: Government officials can understand how decisions are made

## How to Run the System

### Simple Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate.bat  # Windows
pip install -r requirements.txt
python app/main.py
```

### With Full AI Features

```bash
python -m spacy download en_core_web_sm
python app/main.py
```

**Server runs at**: http://localhost:8000  
**API Documentation**: http://localhost:8000/docs (automatic interactive documentation)

## System Intelligence Features

### Smart Categorization

- **Keyword Matching**: Looks for obvious words like "road", "water", "electricity"
- **Entity Recognition**: Uses AI to find locations, organizations, and people mentioned
- **Context Understanding**: Considers surrounding words to improve accuracy
- **Fallback Logic**: If AI fails, uses basic keyword rules

### Duplicate Detection

- **Text Similarity**: Compares new complaints with existing ones using mathematical similarity
- **Smart Matching**: Finds complaints that are about the same issue even if worded differently
- **Prevents Redundancy**: Helps government avoid processing the same problem multiple times

### Urgency Scoring Logic

```
High Priority (0.8-1.0): emergency, urgent, critical, dangerous, immediate
Medium Priority (0.5-0.7): serious, major, important, problem, issue
Low Priority (0.0-0.4): request, suggestion, general inquiry

Special Rules:
- If duplicate found with high similarity → Reduce urgency score
- If mentions critical infrastructure → Boost urgency score
- If mentions emergency services → Boost urgency score
```

### Department Routing Rules

```
Infrastructure → Public Works Department
Water → Water Supply Department
Electricity → Electricity Board
Healthcare → Health Department
Education → Education Department
Environment → Environment Department
General → General Administration

Special Cases:
- Rural + Infrastructure → Rural Development Department
- Emergency + Any category → Emergency Services (if implemented)
```

## Data Storage Approach

### Current (Demo Mode)

- **In-Memory Storage**: Data stored in Python dictionaries
- **Resets on Restart**: Data is lost when server stops
- **Good for**: Testing, demonstrations, development

### Planned (Production Mode)

- **PostgreSQL Database**: Permanent data storage
- **Backup & Recovery**: Automated daily backups
- **Good for**: Real government deployment

## Error Handling & Reliability

### What We Handle Gracefully

- **Invalid input data** → Clear error messages returned
- **AI processing failures** → Falls back to basic keyword matching
- **Missing required fields** → Validation errors with helpful guidance
- **Server overload** → Proper HTTP status codes and retry suggestions

### Monitoring & Logging

- **Processing Statistics**: Track how many complaints processed, success rates
- **Error Tracking**: Log any issues for debugging and improvement
- **Performance Metrics**: Monitor response times and system health

## Why This Backend Approach Works

### **Reliability First**

System is designed to always work, even if advanced AI features fail. Basic functionality is rock-solid.

### **Government-Ready**

Every decision is transparent and can be explained to officials and citizens. No mysterious "black box" AI.

### **Scalable Design**

Can start with simple deployment and grow to handle thousands of users with proper infrastructure.

### **Maintainable Code**

Written in clear, well-documented Python that future developers can easily understand and improve.

### **Practical AI**

Uses AI where it adds real value, but doesn't rely on it for core functionality. Smart enhancement, not replacement.

This backend proves that you can build intelligent government systems that are both sophisticated and trustworthy.
