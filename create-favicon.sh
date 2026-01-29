#!/bin/bash

# Script to create favicon.ico from logo-kb.png
# Requires ImageMagick (install with: brew install imagemagick)

INPUT="assets/logo-kb.png"
INTERMEDIATE="assets/logo-kb-trimmed.png"
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

echo "🔄 Step 1: Cropping margins from $INPUT..."

# Get image dimensions first
if [ "$CONVERT_CMD" = "magick" ]; then
    DIMENSIONS=$($CONVERT_CMD "$INPUT" -format "%wx%h" info:)
else
    DIMENSIONS=$($CONVERT_CMD "$INPUT" -format "%wx%h" info:)
fi

WIDTH=$(echo $DIMENSIONS | cut -d'x' -f1)
HEIGHT=$(echo $DIMENSIONS | cut -d'x' -f2)

# Calculate 20% to shave from each side
SHAVE_X=$((WIDTH * 20 / 100))
SHAVE_Y=$((HEIGHT * 20 / 100))

echo "   Original size: ${WIDTH}x${HEIGHT}"
echo "   Shaving ${SHAVE_X}px from left/right, ${SHAVE_Y}px from top/bottom"

# Use -shave to manually crop pixels from all edges
# Format: -shave WIDTHxHEIGHT (removes from all sides)
if [ "$CONVERT_CMD" = "magick" ]; then
    # ImageMagick v7 syntax
    $CONVERT_CMD "$INPUT" -shave ${SHAVE_X}x${SHAVE_Y} "$INTERMEDIATE"
else
    # ImageMagick v6 syntax
    $CONVERT_CMD "$INPUT" -shave ${SHAVE_X}x${SHAVE_Y} "$INTERMEDIATE"
fi

if [ ! -f "$INTERMEDIATE" ]; then
    echo "❌ Failed to create trimmed intermediate image"
    exit 1
fi

echo "✅ Created intermediate trimmed image: $INTERMEDIATE"
echo "🔄 Step 2: Converting to favicon..."

# Now resize the trimmed image to create favicon
if [ "$CONVERT_CMD" = "magick" ]; then
    $CONVERT_CMD "$INTERMEDIATE" -resize 16x16 -resize 32x32 -resize 48x48 "$OUTPUT"
else
    $CONVERT_CMD "$INTERMEDIATE" -resize 16x16 -resize 32x32 -resize 48x48 "$OUTPUT"
fi

if [ -f "$OUTPUT" ]; then
    echo "✅ Successfully created $OUTPUT"
    echo "📁 Location: $(pwd)/$OUTPUT"
else
    echo "❌ Failed to create favicon"
    exit 1
fi
