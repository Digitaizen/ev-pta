#!/bin/bash

echo "🚀 Deploying East View PTA Website to Firebase..."

# Build the frontend
echo "📦 Building frontend..."
cd frontend
npm run build
cd ..

# Deploy to Firebase
echo "🔥 Deploying to Firebase..."
firebase deploy

echo "✅ Deployment complete!"
echo "🌐 Your site should be available at: https://eastview-pta.web.app"
