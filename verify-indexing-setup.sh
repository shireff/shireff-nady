#!/bin/bash

# Indexing Setup Verification Script
# Run this to verify all files are in place and accessible

echo "🔍 Indexing Setup Verification"
echo "==============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="https://www.shireff.dev"

echo "📍 Testing: $BASE_URL"
echo ""

# Test Google verification file
echo "1. Testing Google Verification File..."
GOOGLE_FILE="e5eb264d20da45edbdf55411fdf361bc.txt"
GOOGLE_URL="$BASE_URL/$GOOGLE_FILE"

if curl -s -o /dev/null -w "%{http_code}" "$GOOGLE_URL" | grep -q "200"; then
    echo -e "${GREEN}✅ Google verification file accessible${NC}"
    echo "   URL: $GOOGLE_URL"
else
    echo -e "${RED}❌ Google verification file NOT accessible${NC}"
    echo "   URL: $GOOGLE_URL"
fi
echo ""

# Test IndexNow key file
echo "2. Testing IndexNow Key File..."
INDEXNOW_KEY="e5eb264d20da45edbdf55411fdf361bc"
INDEXNOW_URL="$BASE_URL/$INDEXNOW_KEY.txt"

if curl -s -o /dev/null -w "%{http_code}" "$INDEXNOW_URL" | grep -q "200"; then
    echo -e "${GREEN}✅ IndexNow key file accessible${NC}"
    echo "   URL: $INDEXNOW_URL"
    
    # Verify content
    CONTENT=$(curl -s "$INDEXNOW_URL" | tr -d '\n\r')
    if [ "$CONTENT" = "$INDEXNOW_KEY" ]; then
        echo -e "${GREEN}✅ Key file content matches${NC}"
    else
        echo -e "${RED}❌ Key file content mismatch${NC}"
        echo "   Expected: $INDEXNOW_KEY"
        echo "   Got: $CONTENT"
    fi
else
    echo -e "${RED}❌ IndexNow key file NOT accessible${NC}"
    echo "   URL: $INDEXNOW_URL"
fi
echo ""

# Test sitemap
echo "3. Testing Sitemap..."
SITEMAP_URL="$BASE_URL/sitemap.xml"

if curl -s -o /dev/null -w "%{http_code}" "$SITEMAP_URL" | grep -q "200"; then
    echo -e "${GREEN}✅ Sitemap accessible${NC}"
    echo "   URL: $SITEMAP_URL"
else
    echo -e "${RED}❌ Sitemap NOT accessible${NC}"
    echo "   URL: $SITEMAP_URL"
fi
echo ""

# Test robots.txt
echo "4. Testing robots.txt..."
ROBOTS_URL="$BASE_URL/robots.txt"

if curl -s -o /dev/null -w "%{http_code}" "$ROBOTS_URL" | grep -q "200"; then
    echo -e "${GREEN}✅ robots.txt accessible${NC}"
    echo "   URL: $ROBOTS_URL"
else
    echo -e "${RED}❌ robots.txt NOT accessible${NC}"
    echo "   URL: $ROBOTS_URL"
fi
echo ""

# Test main pages
echo "5. Testing Main Pages..."
PAGES=("/" "/projects" "/experiences" "/contact" "/state-comparisons")

for page in "${PAGES[@]}"; do
    PAGE_URL="$BASE_URL$page"
    if curl -s -o /dev/null -w "%{http_code}" "$PAGE_URL" | grep -q "200"; then
        echo -e "${GREEN}✅${NC} $page"
    else
        echo -e "${RED}❌${NC} $page"
    fi
done
echo ""

# Check environment variables (local only)
echo "6. Checking Local Environment Variables..."
if [ -f .env ]; then
    if grep -q "INDEXNOW_KEY" .env; then
        echo -e "${GREEN}✅ INDEXNOW_KEY found in .env${NC}"
    else
        echo -e "${YELLOW}⚠️  INDEXNOW_KEY not found in .env${NC}"
        echo "   Add: INDEXNOW_KEY=$INDEXNOW_KEY"
    fi
    
    if grep -q "GOOGLE_INDEXING_CREDENTIALS" .env; then
        echo -e "${GREEN}✅ GOOGLE_INDEXING_CREDENTIALS found in .env${NC}"
    else
        echo -e "${YELLOW}⚠️  GOOGLE_INDEXING_CREDENTIALS not found in .env${NC}"
    fi
    
    if grep -q "SITE_URL" .env; then
        echo -e "${GREEN}✅ SITE_URL found in .env${NC}"
    else
        echo -e "${YELLOW}⚠️  SITE_URL not found in .env${NC}"
        echo "   Add: SITE_URL=$BASE_URL"
    fi
else
    echo -e "${YELLOW}⚠️  .env file not found${NC}"
fi
echo ""

echo "==============================="
echo "✨ Verification Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Fix any ❌ errors above"
echo "2. Add missing environment variables to Vercel"
echo "3. Add service account to Google Search Console"
echo "4. Wait 24-48 hours for Google permissions"
echo "5. Test indexing API"
