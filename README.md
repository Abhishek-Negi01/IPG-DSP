# IPG-DSP: Intelligent Public Grievance Platform

## The Problem

Government offices receive hundreds of grievances daily but have no system to automatically sort them. Officers spend most of their time reading complaints and figuring out which department should handle each one, instead of actually solving problems.

Citizens submit complaints and wait weeks for responses because everything gets mixed up in paperwork.

## Our Solution

We built a simple system that automatically reads grievance text and:

- Categorizes it (infrastructure, water, electricity, etc.)
- Calculates how urgent it is (0-100 score)
- Routes it to the right government department

The system uses basic keyword matching - no complex AI training needed.

## Round 1 → Round 2 Progress

**Round 1 (Planning)**: We designed the system architecture and planned 3 processing agents
**Round 2 (Implementation)**: We built a working prototype with frontend and backend

## What We Actually Built

✅ **Backend (FastAPI)**

- 4 working API endpoints
- 3 processing agents using keyword matching
- Basic analytics for government dashboard

✅ **Frontend (React)**

- Grievance submission form for citizens
- Government dashboard showing statistics
- List view of all submitted grievances

✅ **Core Features**

- Citizens can submit grievances through a web form
- System automatically processes and categorizes each submission
- Government officials can view organized grievances and basic stats

## How It Works

```
Citizen submits grievance → 3 Agents process it → Government sees organized results

Agent 1: Understanding Agent
- Looks for keywords like "road", "water", "electricity"
- Assigns category based on what it finds

Agent 2: Urgency Agent
- Scans for words like "urgent", "emergency", "broken"
- Gives urgency score from 0.0 to 1.0

Agent 3: Department Mapping Agent
- Takes the category and maps it to correct department
- "infrastructure" → "Public Works Department"
```

## System Architecture

```
┌─────────────────┐         ┌─────────────────┐
│   Citizen Web   │────────▶│  Government     │
│   Interface     │         │  Dashboard      │
└─────────────────┘         └─────────────────┘
         │                           │
         ▼                           ▼
┌─────────────────────────────────────────────┐
│            FastAPI Backend                  │
├─────────────────────────────────────────────┤
│  Agent 1    │   Agent 2   │    Agent 3      │
│ (Category)  │ (Urgency)   │ (Department)    │
├─────────────────────────────────────────────┤
│         In-Memory Storage                   │
└─────────────────────────────────────────────┘
```

## Scaling to More Users

**Current Setup**: Single server, in-memory storage (good for ~100 users)

**To Handle More Users**:

1. Add a real database (PostgreSQL) instead of memory storage
2. Deploy multiple backend servers behind a load balancer
3. Use caching for frequently accessed data
4. Add a CDN for the frontend

**Estimated Capacity**: With these changes, could handle 10,000+ concurrent users

## Failure Handling

**What We Handle**:

- Form validation errors → Show clear error messages
- Server connection issues → Display "try again" message
- Invalid input data → Return helpful error descriptions
- Agent processing failures → Default to "General" category

**What We Don't Handle** (beyond 24-hour scope):

- Database connection failures
- Advanced retry mechanisms
- Distributed system recovery

## Team Contributions

**Abhishek Negi** - Backend & System Integration

- Built the FastAPI backend with all 4 endpoints
- Implemented the 3-agent processing system
- Created keyword matching logic for categorization
- Set up CORS and error handling

**Ankit Negi** - Frontend Development & UI

- Built all React components and pages
- Implemented Tailwind CSS styling
- Created responsive design for mobile/desktop

**Akbar Ansari** - Support Programming & Testing

- Connected frontend to backend APIs
- Added form validation and loading states
- Fixed bugs and tested user workflows
- Helped with data fetching and error handling

**Himanshu Yadav** - Documentation & Demo Preparation

- Prepare and collect dataset (for model training)
- Wrote all README files and documentation
- Prepared demo scenarios and test cases
- Organized project structure and cleanup
- Coordinated team tasks and timeline

## Quick Demo

1. Start backend: `cd backend && python app/main.py`
2. Start frontend: `cd frontend && npm run dev`
3. Go to http://localhost:3000
4. Submit a grievance and see automatic processing
5. Check the dashboard for statistics

## Technical Limitations

- Data is lost when server restarts (no database)
- Simple keyword matching only (no advanced AI)
- English language only
- Basic UI design
- No user authentication

This is a working prototype that proves the concept. In the next phase, we would add a database, better AI processing, and more features.

## Why This Approach Works

We focused on building something that actually works rather than trying to implement complex AI in 24 hours. The rule-based system is:

- Easy to understand and explain
- Fast to process grievances
- Simple to modify and improve
- A solid foundation for adding smarter AI later

The system demonstrates that even simple automation can significantly help government offices organize their workflow.
