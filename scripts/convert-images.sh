#!/bin/bash

# 3D Print Image Conversion Script
# Converts HEIC images to optimized web formats for portfolio gallery

echo "🖼️  Starting 3D Print Image Conversion..."
echo "Converting HEIC images to optimized web formats..."

# Create output directories
mkdir -p public/images/prints
mkdir -p public/images/prints/thumbnails
mkdir -p public/images/prints/full-size

# Counter for processed images
processed=0
total=$(ls assets/*.HEIC 2>/dev/null | wc -l)

echo "Found $total HEIC images to process"

# Process each HEIC file
for file in assets/*.HEIC; do
    if [ -f "$file" ]; then
        # Extract filename without extension
        filename=$(basename "$file" .HEIC)
        
        echo "📷 Processing: $filename"
        
        # Convert to WebP (primary format for modern browsers)
        echo "   → WebP conversion..."
        magick "$file" -quality 85 -define webp:lossless=false -resize 1200x900^ -gravity center -crop 1200x900+0+0 "public/images/prints/full-size/${filename}.webp"
        
        # Convert to JPEG (fallback for older browsers)  
        echo "   → JPEG conversion..."
        magick "$file" -quality 90 -resize 1200x900^ -gravity center -crop 1200x900+0+0 "public/images/prints/full-size/${filename}.jpg"
        
        # Generate WebP thumbnail (400x300 for gallery grid)
        echo "   → WebP thumbnail..."
        magick "$file" -quality 80 -define webp:lossless=false -resize 400x300^ -gravity center -crop 400x300+0+0 "public/images/prints/thumbnails/${filename}.webp"
        
        # Generate JPEG thumbnail (fallback)
        echo "   → JPEG thumbnail..."
        magick "$file" -quality 85 -resize 400x300^ -gravity center -crop 400x300+0+0 "public/images/prints/thumbnails/${filename}.jpg"
        
        # Generate tiny blur placeholder (base64 embedded)
        echo "   → Blur placeholder..."
        magick "$file" -resize 40x30 -blur 0x2 -quality 50 "public/images/prints/thumbnails/${filename}-blur.jpg"
        
        processed=$((processed + 1))
        echo "   ✅ Completed $filename ($processed/$total)"
    fi
done

echo ""
echo "🎉 Image conversion completed!"
echo "📊 Processed: $processed images"
echo "📁 Output locations:"
echo "   • Full-size images: public/images/prints/full-size/"
echo "   • Thumbnails: public/images/prints/thumbnails/"
echo ""

# Generate image optimization report
echo "📈 Optimization Report:"
echo "   • Format: HEIC → WebP + JPEG (dual format support)"
echo "   • Dimensions: Standardized to 4:3 aspect ratio"
echo "   • Quality: WebP 85%, JPEG 90% (high quality for technical details)"
echo "   • Thumbnails: 400x300px for fast gallery loading"
echo "   • Placeholders: 40x30px blur for smooth loading experience"
echo ""

# Update 3D prints JSON with actual filenames
echo "🔧 Updating 3D prints data file with converted images..."
node scripts/update-print-images.js

echo "✨ 3D Print gallery is ready for professional showcase!"