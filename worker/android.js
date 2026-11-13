import { cssSubPaginas } from './styles.js';

export const htmlAndroid = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Android Apps - Danloud Labs</title>
        <link rel="icon" type="image/webp" href="https://raw.githubusercontent.com/Danloud-Labs/danloudlabs-assets/main/icons/danloudlabs.webp">

    <style>
        ${cssSubPaginas} 
        body::before { background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://raw.githubusercontent.com/Danloud-Labs/danloudlabs-assets/main/wallpapers/home.wall.webp'); }
    </style>
</head>
<body>
    <a href="/" class="back-btn">← Back to Home</a>
    <div class="content-wrapper">
        <h1>Android Applications</h1>
        <p>Powerful and accessible mobile solutions for Android devices.</p>
    </div>
</body>
</html>
`;