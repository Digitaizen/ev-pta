# East View PTA Website - Development Setup

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Quick Start

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd ev-pta
   npm run install-all
   ```

2. **Environment Configuration**
   
   **Backend (.env)**
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Edit `backend/.env` with your configuration:
   ```
   MONGODB_URI=mongodb://localhost:27017/ev-pta
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

   **Frontend (.env)**
   ```bash
   cd frontend
   cp .env.example .env
   ```
   
   Edit `frontend/.env` with your configuration:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SITE_NAME=East View High School PTA
   ```

3. **Start Development Servers**
   ```bash
   npm run dev
   ```
   
   This will start:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Individual Component Setup

### Backend Only
```bash
cd backend
npm install
npm run dev
```

### Frontend Only
```bash
cd frontend
npm install
npm start
```

## Database Setup

### Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. The application will create the database automatically

### MongoDB Atlas (Cloud)
1. Create a free account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `backend/.env`

## Testing

### Run All Tests
```bash
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
npm test
```

## Building for Production

```bash
npm run build
```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the application: `npm run build`
2. Deploy frontend build to static hosting
3. Deploy backend to Node.js hosting service
4. Update environment variables for production

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/pending` - Get pending users (admin)
- `PUT /api/users/:id/approve` - Approve user (admin)

### Blog
- `GET /api/blog` - Get published posts
- `POST /api/blog` - Create new post
- `GET /api/blog/pending` - Get pending posts (admin)

### Events
- `GET /api/events` - Get published events
- `POST /api/events` - Create new event
- `POST /api/events/:id/register` - Register for event

### Store
- `GET /api/store` - Get store items
- `POST /api/store/purchase` - Process purchase

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Frontend: Change port in `frontend/package.json` scripts
   - Backend: Set `PORT` environment variable

2. **MongoDB connection failed**
   - Check MongoDB is running locally
   - Verify connection string in `.env`
   - Check network access for MongoDB Atlas

3. **CORS errors**
   - Verify `FRONTEND_URL` in backend `.env`
   - Check proxy setting in frontend `package.json`

4. **Authentication not working**
   - Verify `JWT_SECRET` is set in backend `.env`
   - Check API URL in frontend `.env`

### Getting Help

1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check that both frontend and backend servers are running

## Development Workflow

1. Create feature branch from main
2. Make changes and test locally
3. Run tests: `npm test`
4. Commit changes with descriptive message
5. Push to GitHub and create pull request
6. Deploy automatically via Vercel

## Contributing

1. Follow the existing code style
2. Write tests for new features
3. Update documentation as needed
4. Test thoroughly before submitting PR
