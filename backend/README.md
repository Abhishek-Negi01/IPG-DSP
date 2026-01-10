# Backend

FastAPI server that processes grievances using 3 simple agents.

## What It Does

Takes grievance text and automatically:

- Categorizes it (infrastructure, water, electricity, healthcare, education, environment, general)
- Calculates urgency score (0.0 to 1.0 based on keywords)
- Routes to appropriate government department

## API Endpoints

- `POST /api/v1/grievances/` - Submit new grievance
- `GET /api/v1/grievances/` - Get all grievances
- `GET /api/v1/grievances/{id}` - Get specific grievance
- `GET /api/v1/analytics/dashboard` - Get basic statistics

## How to Run

```bash
cd backend
pip install -r requirements.txt
python app/main.py
```

Server runs at http://localhost:8000
API docs at http://localhost:8000/docs

## Processing Logic

**Understanding Agent**: Keyword matching for categories.
**Urgency Agent**: Scans for urgent words, assigns score.
**Department Mapping Agent**: Maps category to department.

Data stored in memory (resets on restart).
