#!/bin/bash

# Script to run Good Works KB landing page locally with hot reload

PORT=${1:-8000}

echo "🚀 Starting Good Works KB local server with hot reload..."
echo "📁 Serving from: $(pwd)"
echo "🌐 Server will be available at: http://localhost:$PORT"
echo "🔄 Hot reload enabled - changes will auto-refresh in browser"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Check if live-server is available (best option - has hot reload)
if command -v npx &> /dev/null; then
    echo "✅ Using live-server with hot reload"
    npx --yes live-server --port=$PORT --open=/ --watch=.
# Check if browser-sync is available (also has hot reload)
elif command -v browser-sync &> /dev/null; then
    echo "✅ Using browser-sync with hot reload"
    browser-sync start --server --files "*.html,*.css,*.js" --port $PORT
# Check if Python 3 is available (no hot reload)
elif command -v python3 &> /dev/null; then
    echo "⚠️  Using Python 3 HTTP server (no hot reload)"
    echo "💡 Install Node.js for hot reload: https://nodejs.org/"
    python3 -m http.server $PORT
# Check if Python 2 is available (fallback, no hot reload)
elif command -v python &> /dev/null; then
    echo "⚠️  Using Python HTTP server (no hot reload)"
    echo "💡 Install Node.js for hot reload: https://nodejs.org/"
    python -m SimpleHTTPServer $PORT
else
    echo "❌ Error: No suitable server found!"
    echo ""
    echo "Please install one of the following:"
    echo "  - Node.js (recommended for hot reload): https://nodejs.org/"
    echo "  - Python 3: https://www.python.org/downloads/"
    echo ""
    echo "Or specify a custom port: ./serve.sh 3000"
    exit 1
fi
