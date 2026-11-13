export const htmlLeaveTracker = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pro Portal - FedLog Leave Tracker</title>
        <link rel="icon" type="image/webp" href="https://raw.githubusercontent.com/Danloud-Labs/danloudlabs-assets/main/icons/danloudlabs.webp">

    
    <!-- Firebase & SheetJS -->
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
    <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>

    <style>
        body {
            margin: 0; padding: 40px 20px; color: #e0e0e0;
            font-family: 'SF Pro Display', -apple-system, sans-serif;
            display: flex; flex-direction: column; align-items: center; min-height: 100vh; box-sizing: border-box;
            background-color: #000000;
        }
        body::before {
            content: ""; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: -1;
            background-image: url('https://raw.githubusercontent.com/Danloud-Labs/danloudlabs-assets/main/wallpapers/home.wall.webp');
            background-size: cover; background-position: center center; background-repeat: no-repeat;
        }
        .container { width: 100%; max-width: 600px; text-align: center; }
        
        .nav-header { width: 100%; text-align: left; margin-bottom: 25px; }
        .support-btn {
            padding: 10px 25px; border: 1px solid #bf5af2; color: #bf5af2; text-decoration: none; border-radius: 8px;
            font-weight: bold; background: rgba(191, 90, 242, 0.1); font-size: 0.95rem; display: inline-block;
        }

        /* Card Panels */
        .panel {
            background: rgba(20, 20, 20, 0.85); border: 1px solid rgba(255,255,255,0.1);
            backdrop-filter: blur(15px); border-radius: 16px; padding: 40px; box-shadow: 0 15px 35px rgba(0,0,0,0.7);
        }
        .panel h2 { color: #fff; margin-top: 0; letter-spacing: 2px; text-transform: uppercase; }
        
        /* Auth Styles */
        .input-field {
            width: 100%; padding: 15px; margin-bottom: 15px; border-radius: 8px;
            border: 1px solid #444; background: rgba(0,0,0,0.5); color: #fff; font-size: 1rem; box-sizing: border-box;
        }
        .input-field:focus { outline: none; border-color: #0a84ff; }
        .btn-primary {
            width: 100%; padding: 15px; background: #0a84ff; color: #fff; border: none;
            border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: background 0.3s;
        }
        .btn-primary:hover { background: #006ee6; }
        .error-txt { color: #ff453a; font-size: 0.9rem; margin-bottom: 15px; display: none; line-height: 1.4; }

        /* Tracker Styles */
        .upload-area { border: 2px dashed #555; border-radius: 8px; padding: 30px; cursor: pointer; display: block; margin-bottom: 20px; transition: border-color 0.3s; background: rgba(0,0,0,0.3); }
        .upload-area:hover { border-color: #32de84; }
        .upload-area input { display: none; }
        .json-textarea {
            width: 100%; min-height: 120px; background: rgba(0,0,0,0.5); border: 1px solid #444;
            border-radius: 8px; color: #32de84; padding: 15px; font-family: monospace; font-size: 0.85rem;
            box-sizing: border-box; margin-bottom: 15px;
        }
        .divider-txt { color: #666; font-weight: bold; margin: 20px 0; }
        
        .user-info { color: #888; font-size: 0.9rem; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
        .logout-btn { color: #ff453a; background: none; border: none; cursor: pointer; font-weight: bold; }

        /* Help Box Styles */
        .help-box {
            background: rgba(10, 132, 255, 0.05); border: 1px solid rgba(10, 132, 255, 0.3);
            border-radius: 12px; padding: 20px; margin-bottom: 30px; text-align: left;
        }
        .help-box h3 { margin-top: 0; color: #0a84ff; display: flex; align-items: center; gap: 8px; font-size: 1.1rem; letter-spacing: normal; text-transform: none; }
        .help-box p { color: #ccc; font-size: 0.95rem; line-height: 1.5; margin-bottom: 10px; }
        .help-box p:last-child { margin-bottom: 0; }

        /* Hidden by default */
        #trackerSection { display: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="nav-header">
            <a href="/ios/fedlog" class="support-btn">← Back to App Info</a>
        </div>

        <!-- 1. LOGIN SECTION -->
        <div id="loginSection" class="panel">
            <h2>Pro Portal Login</h2>
            <p style="color: #aaa; margin-bottom: 30px;">Authenticate using your FedLog credentials to access Pro Tools.</p>
            
            <p id="errorMsg" class="error-txt">Invalid email or password.</p>
            
            <input type="email" id="emailInput" class="input-field" placeholder="Email Address">
            <input type="password" id="passwordInput" class="input-field" placeholder="Password">
            <button id="loginBtn" class="btn-primary">Authenticate</button>
        </div>

        <!-- 2. TRACKER SECTION -->
        <div id="trackerSection" class="panel">
            <h2>Leave Tracker Sync</h2>
            
            <div class="user-info">
                <span id="userEmailDisplay">Logged in as: ...</span>
                <button id="logoutBtn" class="logout-btn">Log Out</button>
            </div>

            <!-- HELP WINDOW -->
            <div class="help-box">
                <h3><span style="font-size: 1.2rem;">ℹ️</span> How it works</h3>
                <p>The Leave Tracker allows you to securely extract schedule and leave data from official export files directly into your iOS application.</p>
                <p>All parsing happens strictly within your browser. Once processed, the app generates a Sync Ticket directly to your private Firebase account to be reviewed inside the FedLog app.</p>
            </div>

            <label class="upload-area">
                <span id="uploadText" style="color: #ccc;">Click to drop .xlsx file here</span>
                <input type="file" id="reportFileInput" accept=".xlsx, .xls" />
            </label>
            
            <div class="divider-txt">OR PASTE RAW JSON</div>
            
            <textarea id="jsonInputBox" class="json-textarea" placeholder="Paste your raw JSON code here..."></textarea>
            <button id="processJsonBtn" class="btn-primary" style="background: #32de84; color: #000;">Process & Sync JSON</button>
            
            <p id="syncStatus" style="color: #32de84; font-weight: bold; margin-top: 20px; display: none;">✅ Sync Ticket sent to iOS App!</p>
        </div>
    </div>

    <script>
        // ==========================================
        // 1. FIREBASE CONFIGURATION (DATOS REALES)
        // ==========================================
        const firebaseConfig = {
            apiKey: "AIzaSyCe-5_SUX8yXp-JwG0Ioq3DU_VLRy-lOPM", 
            authDomain: "fedlog-danloudlabs.firebaseapp.com",
            projectId: "fedlog-danloudlabs",
            storageBucket: "fedlog-danloudlabs.firebasestorage.app",
            messagingSenderId: "845150980756",
            appId: "1:845150980756:web:51ca0a8eda4952ebac8281"
        };
        
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const db = firebase.firestore();

        // ==========================================
        // 2. AUTHENTICATION LOGIC WITH PRO CHECK
        // ==========================================
        const loginSec = document.getElementById('loginSection');
        const trackerSec = document.getElementById('trackerSection');
        const err = document.getElementById('errorMsg');
        
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                // VERIFICACIÓN FEDLOG PRO EN FIRESTORE
                try {
                    const userDoc = await db.collection('users').doc(user.uid).get();
                    if (userDoc.exists && userDoc.data().isProSubscriber === true) {
                        loginSec.style.display = 'none';
                        trackerSec.style.display = 'block';
                        document.getElementById('userEmailDisplay').innerText = "Logged in as: " + user.email;
                        err.style.display = 'none';
                    } else {
                        // SI NO ES PRO, CERRAR SESIÓN Y MOSTRAR ALERTA
                        await auth.signOut();
                        err.innerText = "Access Denied: An active FedLog Pro subscription is required to access Pro Tools. Please subscribe in the iOS app.";
                        err.style.display = 'block';
                    }
                } catch (e) {
                    await auth.signOut();
                    err.innerText = "Error verifying subscription status: " + e.message;
                    err.style.display = 'block';
                }
            } else {
                trackerSec.style.display = 'none';
                loginSec.style.display = 'block';
                document.getElementById('emailInput').value = '';
                document.getElementById('passwordInput').value = '';
            }
        });

        document.getElementById('loginBtn').addEventListener('click', () => {
            const email = document.getElementById('emailInput').value;
            const pass = document.getElementById('passwordInput').value;
            
            if(!email || !pass) {
                err.innerText = "Please enter both email and password.";
                err.style.display = 'block';
                return;
            }
            
            auth.signInWithEmailAndPassword(email, pass)
                .then(() => { err.style.display = 'none'; })
                .catch((error) => { err.innerText = error.message; err.style.display = 'block'; });
        });

        document.getElementById('logoutBtn').addEventListener('click', () => { auth.signOut(); });

        // ==========================================
        // 3. TRACKER & FIRESTORE LOGIC
        // ==========================================
        
        document.getElementById('reportFileInput').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            document.getElementById('uploadText').innerText = "Processing " + file.name + "...";
            const reader = new FileReader();

            reader.onload = function(e) {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, {type: 'array'});
                    const rawJsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
                    processAndUploadData(rawJsonData);
                } catch (error) {
                    alert("Error reading Excel file.");
                    document.getElementById('uploadText').innerText = "Click to drop .xlsx file here";
                }
            };
            reader.readAsArrayBuffer(file);
        });

        document.getElementById('processJsonBtn').addEventListener('click', function() {
            const jsonText = document.getElementById('jsonInputBox').value.trim();
            if (!jsonText) return;

            try {
                const rawJsonData = JSON.parse(jsonText);
                let dataToProcess = Array.isArray(rawJsonData) ? rawJsonData : (rawJsonData.data || rawJsonData);
                processAndUploadData(dataToProcess);
            } catch (error) {
                alert("Invalid JSON format.");
            }
        });

        async function processAndUploadData(rawData) {
            let extractedDays = [];
            
            if (!Array.isArray(rawData)) return alert("Format not recognized.");
            
            rawData.forEach(row => {
                const shiftType = row['Pay Code'] || row['Code']; 
                const date = row['Date'];

                if (shiftType === 'Annual Leave' || shiftType === 'Sick Leave') {
                    extractedDays.push({ date: date, type: shiftType, hours: row['Hours'] || 8 });
                }
            });

            if (extractedDays.length === 0) return alert("No valid leave records found.");

            const ticketPayload = {
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                source: "Web Leave Tracker",
                status: "pending",
                records: extractedDays
            };

            try {
                const user = auth.currentUser;
                const docRef = db.collection('users').doc(user.uid).collection('syncTickets').doc();
                await docRef.set(ticketPayload);
                
                const status = document.getElementById('syncStatus');
                status.style.display = 'block';
                setTimeout(() => { status.style.display = 'none'; }, 5000);
                
                document.getElementById('jsonInputBox').value = '';
                document.getElementById('uploadText').innerText = "Click to drop .xlsx file here";
                
            } catch (error) {
                console.error(error);
                alert("Error syncing to cloud. Check console.");
            }
        }
    </script>
</body>
</html>
`;