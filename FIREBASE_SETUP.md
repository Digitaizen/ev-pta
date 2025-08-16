# 🚀 Firebase Hosting Setup Guide

## Prerequisites
1. Google account (you already have ptaeastview@gmail.com)
2. Node.js installed
3. Firebase CLI installed

## Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

## Step 2: Login to Firebase
```bash
firebase login
```
Use your ptaeastview@gmail.com account when prompted.

## Step 3: Create Firebase Project
✅ **ALREADY DONE** - You created `EastView-PTA` project
- Project ID: `eastview-pta`
- You can skip this step!

## Step 4: Initialize Firebase in Your Project
```bash
# In your project root directory
firebase init
```

Select:
- ✅ Hosting: Configure files for Firebase Hosting
- ✅ Functions: Configure a Cloud Functions directory

Configuration:
- Use existing project: `eastview-pta`
- Public directory: `frontend/build`
- Single-page app: `Yes`
- Overwrite index.html: `No`
- Functions language: `JavaScript`
- ESLint: `No`
- Install dependencies: `Yes`

## Step 5: Build and Deploy
```bash
# Build the frontend
cd frontend
npm run build
cd ..

# Deploy to Firebase
firebase deploy
```

## Step 6: Set up Custom Domain (Optional)
1. In Firebase Console, go to Hosting
2. Click "Add custom domain"
3. Enter your domain (e.g., eastviewpta.org)
4. Follow DNS configuration instructions

## Step 7: Configure Environment Variables
```bash
# Set environment variables for Firebase Functions
firebase functions:config:set \
  mongodb.uri="your_mongodb_uri" \
  jwt.secret="your_jwt_secret" \
  google.calendar_api_key="29ae5dd087aed63584292664a802a0c5840c15e9" \
  google.calendar_id="ptaeastview@gmail.com"
```

## Benefits of Firebase Hosting:
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Custom domain support
- ✅ Easy Google services integration
- ✅ Automatic HTTPS
- ✅ Better Google Calendar integration

## Your New URLs:
- **Default**: https://eastview-pta.web.app
- **Custom**: https://eastview-pta.firebaseapp.com
- **With Custom Domain**: https://eastviewpta.org (after setup)
