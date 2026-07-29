#  Vassar Africans Web Application

> The web platform for the Vassar College African Students Association.
> This project is still going on. I will try to transfer this project to an application.

A modern, responsive web application designed to foster community, celebrate culture, and provide essential resources for African students at Vassar College. This platform features a stunning landing page, secure student authentication, and an internal chat/dashboard system.

##  Features

- **Dynamic Landing Page:** Beautifully animated UI featuring the organization's pillars, upcoming events, and executive board.
- **Student Authentication:** Secure sign-up and login flow (powered by Supabase) restricted to Vassar students.
- **Resource Hub:** Centralized guides for navigating international life (SSN, CPT/OPT, Housing, Insurance).
- **Internal Dashboard & Chat:** A dedicated space for authenticated students to connect and communicate.
- **Smooth Animations:** "Apple-like" scroll and entry animations using Framer Motion.

##  Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Library:** [React](https://react.dev/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database & Auth:** [Supabase](https://supabase.com/)

##  Getting Started

To get a local copy up and running on your machine, follow these simple steps:

### 1. Clone the repository
```bash
git clone [https://github.com/Dagmawi-Asegid/vassar-africans.git](https://github.com/Dagmawi-Asegid/vassar-africans.git)
```

### 2. Install dependencies
Navigate into the project directory and install the required npm packages:
```bash
cd vassar-africans
npm install
```

### 3. Set up Environment Variables
Create a `.env.local` file in the root directory and add your Supabase connection keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📂 Project Structure

- `/app` - Contains all Next.js routes (`/login`, `/signup`, `/chat`) and the main page.
- `/app/lib` - Utility functions and Supabase client configuration.
- `/public` - Static assets, images, and icons.

## Contributing

Contributions, issues, and feature requests are welcome! 

##  Author

**  Dagmawi Asegid  **
- GitHub: [@Dagmawi-Asegid](https://github.com/Dagmawi-Asegid)
- Project Link: [https://github.com/Dagmawi-Asegid/vassar-africans](https://github.com/Dagmawi-Asegid/vassar-africans)

---
*Built for the Vassar African Students Association.*
