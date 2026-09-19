const sharp = require('sharp');

async function processImage() {
  try {
    const inputPath = 'public/logo-fkip-round.png';
    const outputPath = 'public/logo-fkip-clean.png';

    // First trim the black to get a tight square around the circle
    const buffer = await sharp(inputPath)
      .trim({ background: '#000000', threshold: 15 })
      .toBuffer();
      
    // Get dimensions of the trimmed image
    const metadata = await sharp(buffer).metadata();
    const size = Math.min(metadata.width, metadata.height);

    // Create a circular SVG mask
    const circleSvg = `
      <svg width="${size}" height="${size}">
        <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="white" />
      </svg>
    `;

    // Resize to exact square, apply the circle mask to make corners transparent
    await sharp(buffer)
      .resize(size, size)
      .composite([{
        input: Buffer.from(circleSvg),
        blend: 'dest-in'
      }])
      .png()
      .toFile(outputPath);
      
    console.log('Successfully created transparent circular logo.');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processImage();
