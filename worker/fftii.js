import { cssSubPaginas } from './styles.js';

export const htmlFFTII = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FFTII - Danloud Labs</title>
    <link rel="icon" type="image/webp" href="https://raw.githubusercontent.com/Danloud-Labs/danloudlabs-assets/main/icons/fft2.webp">
    
    <style>
        ${cssSubPaginas} 
        body::before { 
            background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('https://raw.githubusercontent.com/Danloud-Labs/danloudlabs-assets/main/routes/FFTII-route.webp'); 
        }
    </style>
</head>
<body>
    <a href="/" class="back-btn">← Back to Home</a>
    <div class="content-wrapper">
        <h1>FFTII: The Moon & the Radiant Sword</h1>
        <p>Project details coming soon...</p>
        <div class="video-container">
            <iframe src="https://www.youtube.com/embed/ByaYHfoqB0I" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
    </div>
</body>
</html>
`;