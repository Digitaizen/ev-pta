# East View High School PTA Website

A modern, minimalist website for the East View High School PTA in Georgetown, Texas.

## Tech Stack

- **Frontend**: React.js with modern CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Payment Processing**: Stripe & PayPal APIs
- **Hosting**: Vercel
- **Calendar**: Google Calendar Integration

## Features

- **Home Page**: PTA info, member login, calendar, announcements
- **Member Management**: Registration, approval workflow, role-based access
- **Content Management**: Admin interface for content and blog management
- **E-commerce**: Store and donation functionality
- **Calendar Integration**: Google Calendar with external calendar support
- **Responsive Design**: Mobile-friendly minimalist design

## Project Structure

```
ev-pta/
├── frontend/          # React.js application
├── backend/           # Node.js/Express API server
├── docs/             # Documentation
└── package.json      # Root package configuration
```

## Quick Start

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Environment Setup**
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Configure your MongoDB connection string
   - Add Stripe/PayPal API keys
   - Set up Google Calendar API credentials

3. **Development**
   ```bash
   npm run dev
   ```
   This starts both frontend (port 3000) and backend (port 5000) servers.

4. **Build for Production**
   ```bash
   npm run build
   ```

## Pages

- **Home** - Main landing page (fully functional)
- **Board Members** - PTA board information
- **Store** - E-commerce for PTA items
- **Spiritwear** - School spirit merchandise
- **Membership** - Member registration and info
- **Blog** - News and updates
- **Community Partner Program** - Business partnerships
- **PTA Scholarships** - Scholarship information
- **Volunteers** - Volunteer opportunities

## Admin Features

- Content management for all pages
- Member approval system
- Blog post moderation
- Event management
- Store inventory management
- Donation tracking

## Deployment

The application is configured for deployment on Vercel with automatic CI/CD from Git.

## Contributing

This is a community project for East View High School PTA. Please follow the contribution guidelines in CONTRIBUTING.md.

## License

MIT License - See LICENSE file for details.
