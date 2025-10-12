# 📝 SL2 Gen Form App
A modern React + Material UI web application for managing and previewing insurance quote forms.
Built with React Router, Tailwind CSS, and Material UI, it provides a structured workflow for inputting agent and insured details, multiple insurers, and generating a live preview through a slide-in sidebar.

📌 Features

🔐 Multi-form structure with contextual state (FormProvider)
🎨 Material UI + Tailwind hybrid styling for flexibility.
🧭 Routing with React Router (Home, About, Contact, Error pages).
🗂 SL2 Form Sections:
                Agent & Agency Information
                Insured & Coverage Details
                Multiple Insurer Inputs (Insurer 1–3)
👁 Live Preview sidebar using Material UI Drawer.
✅ Confirm & Reset Actions with clear feedback.
🛠 Reusable components (InputForm, ColorButtons, SubmitButton, etc.).

🛠️ Technology Stack

Frontend

   ⚛️ React 18 - UI library
   ⚡ Vite  - Build tool and dev server
   🧭 React Router DOM  - page navigation + error handling
   🎨 Material UI  (MUI) - Component library
   🎨 Tailwind CSS  - Utility-first CSS framework
   🎨 Lucide React - Icon library
   🗂 Context API – form state management
   PDF-lib - PDF generation

Backend Integration

   REST API communication
   JWT authentication
   Form data persistence

📋 Prerequisites

   Node.js (v16 or higher)
   npm or yarn
   Modern web browser

Main Endpoints:

POST /api/v1/auth/login - User login
POST /users - User registration
GET /users/:id/myforms - Get user's forms
POST /myforms - Create new form
DELETE /myforms/:id - Delete form
PATCH /users/:id - Update user profile
GET /insurers - Get insurer list
GET /covcode - Get coverage codes


   📁 Project Structure
src/
├── components/          # Reusable UI components
│   ├── ColorButtons.jsx
│   ├── ConfirmationComponent.jsx
│   ├── DefaultLayout.jsx
│   ├── ErrorBoundary.jsx
│   ├── HeaderBar.jsx
│   ├── InputForm.jsx
│   ├── PreviewPanel.jsx
│   ├── SidebarNav.jsx
│   └── ThemeToggle.jsx
├── logic/              # Business logic components
│   ├── DeleteButton.jsx
│   ├── GetForms.jsx
│   ├── LogInInfo.jsx
│   ├── pdfUtils.jsx
│   ├── SubmitButton.jsx
│   └── ValidateForm.jsx
├── pages/              # Page components
│   ├── AboutPage.jsx
│   ├── ContactPage.jsx
│   ├── ErrorPage.jsx
│   ├── LoginPage.jsx
│   ├── MyFormsPage.jsx
│   ├── ProfilePage.jsx
│   ├── SettingsPage.jsx
│   └── SignupPage.jsx
├── providers/          # Context providers
│   ├── AuthServiceProvider.jsx
│   ├── CovOptionsProvider.jsx
│   ├── FormProvider.jsx
│   └── InsurerOptProvider.jsx
├── App.jsx            # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles

👤 Author
Igor Gomes Leandro
