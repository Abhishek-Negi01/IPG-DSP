# IPG-DSP Backend

## Overview

FastAPI backend implementing a **rule-based** 3-agent system for processing public grievances. No machine learning - just smart keyword matching and logical rules.

## Agent Architecture

### 1. Understanding Agent

**Purpose**: Categorize grievances using keyword matching

**Logic**:

```python
def understanding_agent(title, description):
    text = f"{title} {description}".lower()

    if 'road' or 'bridge' in text: return 'infrastructure'
    elif 'water' or 'pipe' in text: return 'water'
    elif 'electricity' in text: return 'electricity'
    # ... more categories
```

**Categories**: infrastructure, water, electricity, healthcare, education, environment, general

### 2. Urgency Agent

**Purpose**: Calculate priority score (0.0 to 1.0)

**Logic**:

- Emergency/urgent/critical words → 0.9
- Serious/major/important words → 0.7
- Problem/issue/broken words → 0.5
- Default → 0.3

### 3. Department Mapping Agent

**Purpose**: Route to correct government department

**Logic**:

```python
department_map = {
    'infrastructure': 'Public Works Department',
    'water': 'Water Supply Department',
    'electricity': 'Electricity Board'
    # ... more mappings
}
```

**Special Rules**: Rural locations get routed to Rural Development for infrastructure issues.

## API Structure

### Core Endpoints

- `POST /api/v1/grievances/` - Submit and process grievance
- `GET /api/v1/grievances/` - List all submissions
- `GET /api/v1/grievances/{id}` - Get specific grievance
- `GET /api/v1/analytics/dashboard` - Basic statistics

### Processing Flow

```
Input → Understanding Agent → Urgency Agent → Department Mapping → Output
```

Each grievance gets processed through all 3 agents sequentially.

## Data Models

**Input**:

```python
class GrievanceInput(BaseModel):
    title: str
    description: str
    citizen_name: str
    citizen_contact: str
    location: str
```

**Output**:

```python
class GrievanceOutput(BaseModel):
    id: int
    # ... input fields
    category: str          # from Understanding Agent
    urgency_score: float   # from Urgency Agent
    department: str        # from Department Mapping Agent
    status: str
    created_at: str
```

## Setup

```bash
pip install -r requirements.txt
python app/main.py
# API available at http://localhost:8000
# Docs at http://localhost:8000/docs
```

## Technical Choices

**Why Rule-Based?**

- Explainable decisions for government use
- No training data required
- Fast processing
- Easy to modify and extend
- Solid foundation for future ML integration

**Storage**: In-memory for Round 1 demo (easily replaceable with database)

**Framework**: FastAPI for automatic API documentation and fast development

## Round 2 Enhancements

- Replace keyword matching with NLP models (spaCy, transformers)
- Add PostgreSQL database with proper schema
- Implement duplicate detection using text embeddings
- Add trend analysis and prediction capabilities
- Include bias detection and fairness monitoring

This prototype proves the multi-agent concept works before adding AI complexity.
