# IPG-DSP: Intelligent Public Grievance Platform

## Problem Statement

Public grievance systems in government offices face major inefficiencies:

- **Manual Sorting**: Officers manually read and categorize each complaint
- **No Priority System**: Urgent issues get mixed with routine requests
- **Wrong Department Routing**: Complaints reach incorrect offices, causing delays
- **No Pattern Recognition**: Similar issues aren't identified or grouped

Citizens wait weeks for responses while officials struggle with paperwork instead of solving problems.

## Why Current Systems Fail

Traditional grievance handling relies entirely on human judgment:

- Officers spend 60% of time on categorization, not resolution
- No standardized urgency assessment leads to critical issues being overlooked
- Manual routing causes complaints to bounce between departments
- No way to spot emerging problems or trends

## Our Solution

IPG-DSP is a **rule-based prototype** that demonstrates how simple AI logic can assist (not replace) government officials in processing grievances more efficiently.

### System Flow

```
Citizen Submits → 3 AI Agents Process → Smart Routing → Official Dashboard
```

### Three Simple Agents

1. **Understanding Agent**: Uses keyword matching to categorize grievances

   - Infrastructure, Water, Electricity, Healthcare, Education, Environment, General

2. **Urgency Agent**: Calculates priority score (0.0 to 1.0) based on keywords

   - Emergency/Critical words → High priority (0.9)
   - Problem/Issue words → Medium priority (0.5)
   - General requests → Low priority (0.3)

3. **Department Mapping Agent**: Routes to appropriate government department
   - Rule-based mapping from category to department
   - Location context (rural vs urban) adjustments

## Architecture

```
┌─────────────────┐         ┌─────────────────┐
│   Citizen Web   │────────▶│  Government    │
│   Interface     │         │  Dashboard      │
└─────────────────┘         └─────────────────┘
         │                           │
         ▼                           ▼
┌─────────────────────────────────────────────┐
│            FastAPI Backend                  │
├────────────────────────────────────────────┤
│ Understanding │ Urgency  │ Department      │
│    Agent      │  Agent   │ Mapping Agent   │
├────────────────────────────────────────────┤
│         In-Memory Storage                   │
└─────────────────────────────────────────────┘
```

## Quick Start

### Backend

```bash
cd backend
pip install -r requirements.txt
python app/main.py
# API runs at http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Web interface at http://localhost:3000
```

## What's Implemented (Round 1)

✅ **Working Features**:

- Grievance submission form with validation
- 3-agent rule-based processing pipeline
- Automatic categorization using keyword matching
- Priority scoring based on urgency indicators
- Department routing with location context
- Basic analytics dashboard
- REST API with 4 core endpoints

✅ **Technical Stack**:

- Backend: FastAPI (Python)
- Frontend: React + Material-UI
- Storage: In-memory (for demo)
- AI Logic: Rule-based keyword matching

## What's NOT Implemented (Intentionally)

❌ **Advanced Features** (saved for Round 2):

- Machine learning models or training
- Natural language processing libraries
- Duplicate detection algorithms
- Trend analysis and predictions
- Database persistence
- Authentication system

❌ **Why Not Included**:
This is a Round 1 **proof-of-concept** focusing on system design and logical flow, not advanced AI implementation.

## API Endpoints

- `POST /api/v1/grievances/` - Submit new grievance
- `GET /api/v1/grievances/` - List all grievances
- `GET /api/v1/grievances/{id}` - Get specific grievance
- `GET /api/v1/dashboard` - Basic statistics

## Sample Processing

**Input**: "Urgent road repair needed on Main Street due to dangerous potholes"

**Agent Processing**:

1. Understanding Agent → Category: "infrastructure"
2. Urgency Agent → Score: 0.9 (found "urgent", "dangerous")
3. Department Mapping → Route to: "Public Works Department"

**Output**: Categorized, prioritized, and routed grievance ready for official review

## Round 2 Expansion Plan

### Advanced AI Features

- **NLP Models**: spaCy or Transformers for better text understanding
- **Machine Learning**: Train models on real grievance data
- **Duplicate Detection**: Semantic similarity using embeddings
- **Trend Analysis**: Time-series analysis for pattern recognition

### Multilingual Support

- Hindi, Bengali, Tamil, and other Indian languages
- Cross-language understanding and translation

### Voice Integration

- Speech-to-text for grievance submission
- Voice-based status updates

### Advanced Analytics

- Predictive modeling for resource allocation
- Cross-regional comparative analysis
- Early warning systems for emerging issues

### Fairness & Bias

- Algorithmic bias detection and mitigation
- Demographic fairness monitoring
- Transparent decision explanations

## Technical Notes

This prototype demonstrates:

- Clean separation of concerns (3 independent agents)
- Extensible architecture for future ML integration
- Government-appropriate UI design
- RESTful API design principles

The rule-based approach ensures explainable decisions and provides a solid foundation for adding machine learning capabilities in Round 2.

## Team Approach

We focused on **problem understanding** and **system design** rather than complex AI implementation, ensuring our solution is:

- Explainable to government officials
- Technically sound and extensible
- Honest about current capabilities
- Ready for advanced AI integration

This prototype proves the concept works with simple logic before investing in complex AI models.
