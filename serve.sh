#!/bin/bash

# Script to run Good Works KB landing page locally

PORT=${1:-8000}

echo "🚀 Starting Good Works KB local server..."
echo "📁 Serving from: $(pwd)"
echo "🌐 Server will be available at: http://localhost:$PORT"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Using Python 3 HTTP server"
    python3 -m http.server $PORT
# Check if Python 2 is available (fallback)
elif command -v python &> /dev/null; then
    echo "✅ Using Python HTTP server"
    python -m SimpleHTTPServer $PORT
# Check if Node.js http-server is available
elif command -v npx &> /dev/null; then
    echo "✅ Using Node.js http-server"
    npx http-server -p $PORT -o
else
    echo "❌ Error: No suitable server found!"
    echo ""
    echo "Please install one of the following:"
    echo "  - Python 3 (recommended): https://www.python.org/downloads/"
    echo "  - Node.js: https://nodejs.org/"
    echo ""
    echo "Or specify a custom port: ./serve.sh 3000"
    exit 1
fi
