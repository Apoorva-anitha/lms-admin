# LMS Admin Dashboard

A comprehensive Learning Management System admin dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- ✅ **Course Management**: Create, edit, and manage courses with prerequisites
- ✅ **Student Management**: View and filter students across both colleges
- ✅ **Flexible Course Assignment**:
  - Individual student assignment with **live search**
  - Department-wise assignment (HOPPE, PEP, CSE, Mechanical, IT, etc.)
  - Year-wise assignment (1st, 2nd, 3rd, 4th)
  - **Domain-wise selection**
- ✅ **Theme Toggle**: Switch between purple and black themes
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Mock Data**: Pre-loaded with sample data for testing

## Colleges Supported

- St. Joseph College of Engineering (SJCE)
- St. Joseph College of Technology (SJCT)

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom purple/black theme
- **Routing**: React Router v6
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components (Loader, etc.)
│   ├── dashboard/       # Dashboard-specific components
│   └── layout/          # Layout components (Sidebar, Header, MainLayout)
├── contexts/            # React Context providers (Auth, Theme)
├── helpers/             # Utility functions and mock data
├── pages/               # Page components (Dashboard, Courses, Students, etc.)
├── types/               # TypeScript type definitions
├── App.tsx              # Main app component with routing
├── main.tsx             # App entry point
└── index.css            # Global styles
```

## Backend Integration

The app is currently using mock data for testing. To integrate with the backend:

1. Update the `VITE_API_BASE_URL` in your `.env` file
2. Replace mock data calls in pages with actual API calls using the services in `src/services/`
3. Update the authentication logic in `src/contexts/AuthContext.tsx`

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Features to Implement

- [ ] Course creation/edit forms
- [ ] Criteria-based access control (prerequisite system)
- [ ] Student bulk upload
- [ ] Analytics charts
- [ ] Real-time notifications
- [ ] Export functionality

## License

© 2024 St. Joseph's LMS
