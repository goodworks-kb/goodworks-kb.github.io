#!/bin/bash

# Script to create favicon.ico from logo-kb.png
# Requires ImageMagick (install with: brew install imagemagick)

INPUT="assets/logo-square-white.png"
OUTPUT="favicon.ico"

# Check for ImageMagick (prefer magick command for v7+, fallback to convert)
if command -v magick &> /dev/null; then
    CONVERT_CMD="magick"
elif command -v convert &> /dev/null; then
    CONVERT_CMD="convert"
else
    echo "❌ ImageMagick not found!"
    echo ""
    echo "Install ImageMagick:"
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "  Windows: Download from https://imagemagick.org/"
    exit 1
fi

echo "🔄 Converting $INPUT to favicon..."

# Resize the image to create favicon
if [ "$CONVERT_CMD" = "magick" ]; then
    $CONVERT_CMD "$INPUT" -define icon:auto-resize=256,128,64,48,32,16 $OUTPUT
else
    $CONVERT_CMD "$INPUT" -define icon:auto-resize=256,128,64,48,32,16 $OUTPUT
fi

if [ -f "$OUTPUT" ]; then
    echo "✅ Successfully created $OUTPUT"
    echo "📁 Location: $(pwd)/$OUTPUT"
else
    echo "❌ Failed to create favicon"
    exit 1
fi
