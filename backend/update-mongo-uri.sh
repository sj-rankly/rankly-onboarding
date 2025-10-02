#!/bin/bash

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔧 MongoDB Atlas URI Updater${NC}"
echo ""
echo "This script will update your .env file with MongoDB Atlas connection string"
echo ""
echo -e "${YELLOW}Your Atlas URL should look like:${NC}"
echo "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/rankly?retryWrites=true&w=majority"
echo ""
echo -e "${RED}⚠️  Make sure you:${NC}"
echo "  1. Replace <password> with your actual password"
echo "  2. Add '/rankly' after '.mongodb.net'"
echo ""
read -p "Enter your MongoDB Atlas connection string: " MONGO_URI

if [ -z "$MONGO_URI" ]; then
    echo -e "${RED}❌ No URI provided. Exiting.${NC}"
    exit 1
fi

# Check if it's an Atlas URI
if [[ ! "$MONGO_URI" =~ ^mongodb\+srv:// ]]; then
    echo -e "${RED}❌ This doesn't look like a MongoDB Atlas URI${NC}"
    echo "Atlas URIs start with: mongodb+srv://"
    exit 1
fi

# Check if database name is included
if [[ ! "$MONGO_URI" =~ /[a-zA-Z0-9_-]+\? ]]; then
    echo -e "${YELLOW}⚠️  Warning: It looks like you might be missing the database name${NC}"
    echo "Make sure your URI includes '/rankly' like:"
    echo "mongodb+srv://user:pass@cluster.mongodb.net/rankly?options"
    read -p "Continue anyway? (y/n): " confirm
    if [ "$confirm" != "y" ]; then
        exit 1
    fi
fi

# Backup existing .env
if [ -f ".env" ]; then
    cp .env .env.backup
    echo -e "${GREEN}✅ Backed up existing .env to .env.backup${NC}"
fi

# Update MONGODB_URI in .env
if [ -f ".env" ]; then
    # Use sed to replace the MONGODB_URI line
    sed -i "s|MONGODB_URI=.*|MONGODB_URI=$MONGO_URI|" .env
    echo -e "${GREEN}✅ Updated MONGODB_URI in .env${NC}"
else
    echo -e "${RED}❌ .env file not found!${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Success! Your .env has been updated.${NC}"
echo ""
echo "Next steps:"
echo "  1. Restart your server: npm run dev"
echo "  2. Look for: ✅ MongoDB connected successfully"
echo ""
echo -e "${YELLOW}If connection fails:${NC}"
echo "  - Check username/password are correct"
echo "  - Verify IP whitelist in Atlas (0.0.0.0/0 for dev)"
echo "  - Make sure database name is included (/rankly)"
echo ""


