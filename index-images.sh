#!/bin/bash

# IndexNow Image Indexing Script
# This script sends indexing requests for personal images to IndexNow

echo "🖼️  IndexNow Image Indexing"
echo "============================"
echo ""

# Configuration
INDEXNOW_KEY="e5eb264d20da45edbdf55411fdf361bc"
HOST="shireff-nady.vercel.app"
SITE_URL="https://shireff-nady.vercel.app"

# Image URLs to index
IMAGES=(
  "${SITE_URL}/personal/shireff-1.webp"
  "${SITE_URL}/personal/shireff-2.webp"
  "${SITE_URL}/personal/shireff-3.webp"
  "${SITE_URL}/personal/shireff-4.webp"
  "${SITE_URL}/personal/shireff-5.webp"
)

echo "📋 Configuration:"
echo "   Host: $HOST"
echo "   Key: $INDEXNOW_KEY"
echo "   Images to index: ${#IMAGES[@]}"
echo ""

# Create JSON payload
JSON_PAYLOAD=$(cat <<EOF
{
  "host": "$HOST",
  "key": "$INDEXNOW_KEY",
  "keyLocation": "${SITE_URL}/${INDEXNOW_KEY}.txt",
  "urlList": [
$(printf '    "%s"' "${IMAGES[0]}")
$(for img in "${IMAGES[@]:1}"; do printf ',\n    "%s"' "$img"; done)
  ]
}
EOF
)

echo "📤 Sending request to IndexNow API..."
echo ""

# Send POST request to IndexNow
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Content-Type: application/json" \
  -d "$JSON_PAYLOAD" \
  https://api.indexnow.org/IndexNow)

# Extract HTTP status code (last line)
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "📊 Response:"
echo "   HTTP Status: $HTTP_CODE"

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "202" ]; then
    echo "   ✅ Success! Images submitted for indexing"
    echo ""
    echo "📝 Indexed URLs:"
    for img in "${IMAGES[@]}"; do
        echo "   ✅ $img"
    done
    echo ""
    echo "⏰ Note: It may take 24-48 hours for images to appear in search results"
elif [ "$HTTP_CODE" = "400" ]; then
    echo "   ❌ Bad Request (400)"
    echo "   Response: $BODY"
    echo ""
    echo "💡 Possible issues:"
    echo "   - Invalid URL format"
    echo "   - Key file not accessible"
    echo "   - Malformed JSON"
elif [ "$HTTP_CODE" = "403" ]; then
    echo "   ❌ Forbidden (403)"
    echo "   Response: $BODY"
    echo ""
    echo "💡 Possible issues:"
    echo "   - Key file not found at: ${SITE_URL}/${INDEXNOW_KEY}.txt"
    echo "   - Key content doesn't match filename"
    echo "   - Host mismatch"
    echo ""
    echo "🔍 Verifying key file..."
    KEY_FILE_URL="${SITE_URL}/${INDEXNOW_KEY}.txt"
    KEY_CONTENT=$(curl -s "$KEY_FILE_URL")
    KEY_HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$KEY_FILE_URL")
    
    echo "   Key file URL: $KEY_FILE_URL"
    echo "   HTTP Status: $KEY_HTTP_CODE"
    echo "   Content: $KEY_CONTENT"
    
    if [ "$KEY_HTTP_CODE" = "200" ]; then
        if [ "$KEY_CONTENT" = "$INDEXNOW_KEY" ]; then
            echo "   ✅ Key file is accessible and content matches"
        else
            echo "   ❌ Key file content mismatch!"
            echo "      Expected: $INDEXNOW_KEY"
            echo "      Got: $KEY_CONTENT"
        fi
    else
        echo "   ❌ Key file is not accessible (HTTP $KEY_HTTP_CODE)"
    fi
elif [ "$HTTP_CODE" = "422" ]; then
    echo "   ❌ Unprocessable Entity (422)"
    echo "   Response: $BODY"
    echo ""
    echo "💡 Some URLs may already be in the queue or invalid"
else
    echo "   ❌ Unexpected response (HTTP $HTTP_CODE)"
    echo "   Response: $BODY"
fi

echo ""
echo "============================"
echo "✨ Script complete!"
