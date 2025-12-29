# IPG-DSP Frontend

## Overview

React interface for submitting grievances (citizens) and viewing analytics (government officials). Clean, government-appropriate design using Material-UI.

## Key Features

### Citizen Interface

- **Grievance Form**: Simple form with validation
- **Instant Processing**: See AI categorization and routing results immediately

### Government Dashboard

- **Grievance List**: View all submissions with AI analysis
- **Basic Analytics**: Category distribution, department workload, urgency stats
- **Processing Details**: See how each grievance was categorized and routed

## Pages

- **Home**: Platform introduction and navigation
- **Submit Grievance**: Citizen submission form
- **Dashboard**: Government analytics view
- **Grievance List**: Detailed view of all submissions

## Setup

```bash
npm install
npm run dev
# Available at http://localhost:3000
```

## Tech Stack

- **React 18**: Modern functional components
- **Material-UI**: Professional government design
- **Recharts**: Simple data visualization
- **Vite**: Fast development server

## API Integration

```javascript
// Submit grievance
const response = await fetch("/api/v1/grievances/", {
  method: "POST",
  body: JSON.stringify(grievanceData),
});

// Get dashboard data
const dashboard = await fetch("/api/v1/analytics/dashboard");
```

## Design Principles

**Government-Appropriate**:

- Professional color scheme (blues, grays)
- Clear typography and spacing
- Accessible form design
- No flashy animations

**User-Focused**:

- Simple 5-field grievance form
- Immediate feedback after submission
- Clear display of AI processing results
- Easy-to-read analytics charts

## Project Structure

```
src/
├── components/
│   └── Navigation.jsx     # Top navigation
├── pages/
│   ├── HomePage.jsx       # Landing page
│   ├── SubmitGrievance.jsx # Citizen form
│   ├── Dashboard.jsx      # Government analytics
│   └── GrievanceList.jsx  # Detailed list view
├── services/
│   └── api.js            # Backend API calls
└── App.jsx               # Main app with routing
```

## Round 2 Enhancements

- **Advanced Visualizations**: More detailed charts and graphs
- **Real-time Updates**: WebSocket integration for live data
- **Mobile Optimization**: Responsive design improvements
- **Multilingual Support**: Hindi, Bengali, Tamil interfaces
- **Voice Input**: Speech-to-text for grievance submission

## Development Notes

This Round 1 frontend focuses on:

- Demonstrating the core user workflow
- Displaying AI processing results clearly
- Professional government interface design
- Easy integration with the backend API

The simple design ensures anyone can quickly understand the system flow and user experience.
