export const cssSubPaginas = `
    body { 
        margin: 0; padding: 40px 20px; color: #fff; 
        font-family: 'SF Pro Display', sans-serif; text-align: center; 
        min-height: 100vh; background-color: #000000;
    }
    body::before {
        content: ""; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        z-index: -1; background-repeat: repeat;
    }
    .back-btn { 
        display: inline-block; padding: 10px 20px; color: #0a84ff; text-decoration: none; 
        border: 1px solid #0a84ff; border-radius: 5px; margin-bottom: 40px; 
        transition: all 0.2s; background: rgba(0,0,0,0.6); font-weight: 500;
    }
    .back-btn:hover { background-color: #0a84ff; color: #fff; }
    .content-wrapper {
        background: rgba(0, 0, 0, 0.75); padding: 40px; border-radius: 12px; 
        display: inline-block; width: 100%; max-width: 800px; box-sizing: border-box; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .video-container {
        position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;
        max-width: 100%; margin-top: 30px; border-radius: 8px; box-shadow: 0 8px 20px rgba(0,0,0,0.8);
    }
    .video-container iframe {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;
    }
`;