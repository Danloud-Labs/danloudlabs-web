import { cssSubPaginas } from './styles.js';

export const htmlDarkWithinMe = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dark Within Me - Danloud Labs</title>
    <link rel="icon" type="image/webp" href="https://raw.githubusercontent.com/Danloud-Labs/danloudlabs-assets/main/icons/darkwithinme.webp">
    
    <style>
        ${cssSubPaginas} 
        body::before { background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('https://raw.githubusercontent.com/Danloud-Labs/danloudlabs-assets/main/wallpapers/darkwithinme.wall.webp'); }
    </style>
</head>
<body>
    <a href="/" class="back-btn">← Back to Home</a>
    <div class="content-wrapper">
        <h1>Dark Within Me: La Sua Origine</h1>
        <p>Project details coming soon...</p>
    </div>
</body>
</html>
`;