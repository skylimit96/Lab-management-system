# 🛠️ Maintenance Laboratory Management System


A complete system for managing laboratory maintenance, storage, and reporting, built with React, TailwindCSS, and Context API.
It provides an efficient workflow for lab technicians and managers to handle daily operations, maintenance schedules, inventory, and statistics.

## 🚀 Features
🔒 User Authentication (Signup, Login, Logout)

✅ Maintenance Procedure Checklists (Daily, Weekly, Monthly)

🧰 Storage Management (Inventory of tools, materials, spare parts)

📈 Statistics Dashboard (Track completed tasks, maintenance frequency, stock levels)

🧹 Clean and Responsive UI with Tailwind CSS

⚡ Loading states and error handling for smooth user experience

🔒 Protected Routes to secure the app

## 🛠 Tech Stack
React

Tailwind CSS

Context API for global authentication and state management

## 📁 Project Structure
```bash
src/
│
├── components/
│   ├── assets/
│   ├── auth/
│       └── AuthGuard.tsx
│   ├── contexts/
│       └── AuthContext.tsx
│   ├── dashboard/
│   ├── layout/
│   ├── uav/
│   └── ui/
│   
├── lib/
├── pages/
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Dashboard.tsx
│   ├── MaintenanceList.tsx
│   ├── MaintenanceProcedure.tsx
│   ├── Settings.tsx
│   ├── Statistics.tsx
│   ├── UAVList.tsx
│   └── UAVDetail.tsx
│
├── store/
├── types/
├── utils/
├── supabase/
│
├── App.tsx
└── main.tsx
```

## ⚙️ Setup Instructions
### Clone the Repository

```bash
git clone https://github.com/skylimit96/DMS
cd DMS
```

### Install Dependencies
```bash
npm install
```
or
```bash
yarn install
```

### Start Development Server

```bash
npm run dev
```
## 📈 Future Roadmap
- Add Role-based Access (Technician, Supervisor, Admin)

- Notification System for upcoming maintenance tasks

- Export Reports as PDF or CSV

- Mobile App version (React Native or Expo)

- Integration with Barcode Scanning for inventory management

## 📄 License
This project is licensed under the MIT License.

### Built with 💙 for better maintenance, safer labs, and easier management.
