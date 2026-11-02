# WINGO TOOL — How to Run Guide (v2.0 PRO) (PC & Mobile Termux)

This standalone bundle runs locally on **Windows, Mac, Linux, and Android Mobile (Termux)** without any third-party build setup.

---

## 📱 Option A: Run on Mobile (Android Termux)

You can run this full server and web app directly on your Android phone using **Termux**.

### Step 1: Install Termux
Install the latest **Termux** app on your phone (recommended from [F-Droid](https://f-droid.org/packages/com.termux/) or GitHub, not outdated Play Store version).

### Step 2: Install Node.js & Unzip in Termux
Open Termux on your phone and run this single command:
```bash
pkg update && pkg upgrade -y && pkg install nodejs-lts unzip -y
```

### Step 3: Allow Storage Access & Extract the Zip
Give Termux access to your phone's storage:
```bash
termux-setup-storage
```
*(Tap **Allow** when the Android popup appears).*

Now, go to your phone's **Downloads** folder and unzip the bundle:
```bash
# If your zip is in Downloads:
cd ~/storage/shared/Download
unzip kal-update-krle.zip -d ~/wingologic
cd ~/wingologic
```

*(Or if downloaded to another folder, extract it to any folder and `cd` into it).*

### Step 4: Run the Server
In Termux, run:
```bash
node server.js
```
*(To keep Termux running in the background without Android sleeping it, you can run `termux-wake-lock` first).*

### Step 5: Open on Mobile Browser
Open **Chrome**, **Brave**, or any browser on your phone and visit:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 💻 Option B: Run on PC (Windows / Mac / Linux)

### 1. Prerequisites
- **Node.js** (v18, v20, v22, or v24+). Check with `node -v`.

### 2. Run the App
Extract `wingologic_clean_bundle.zip` into a folder, open Terminal / Command Prompt / PowerShell inside that folder, and run:
```bash
npm start
```
*(Or: `node server.js`)*

### 3. Open in Browser
Visit:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🧭 All Available Page URLs

| Tool / Module | Direct Link | Description |
| :--- | :--- | :--- |
| **Main Dashboard** | `http://localhost:3000/` | Live AI probability signals, trend radars, and launchpad |
| **WinGo 30s Turbo Blitz** | `http://localhost:3000/wingo-30s-live-prediction` | Ultra-fast 30s countdown with live server synchronization |
| **WinGo 1-Min Predictor** | `http://localhost:3000/wingo-1-min-live-prediction-tool` | 60-second cycle tracker with streak & reversal signals |
| **Pattern Radar Matrix** | `http://localhost:3000/wingo-pattern-radar` | 0–9 digit frequency matrix, Bead Road & dragon cluster charts |
| **Fund Management Plan** | `http://localhost:3000/fund-management` | 1–9 level geometric 1.96x Martingale risk & capital calculator |
| **About Page & Compliance** | `http://localhost:3000/about` | Independent analytics statement, FAQ & DPDP Act compliance |

---

## 📁 Clean Project Structure

```
wingologic-app/
├── server.js                      # Fast HTTP server (binds 0.0.0.0:3000)
├── package.json                   # "npm start" script
├── HOW_TO_RUN.md                  # This PC & Termux mobile guide
├── public/                        # Full production frontend & assets
│   ├── index.html                 # Pre-rendered responsive app
│   ├── 0.svg ... 9.svg            # All 10 digit graphics
│   ├── wingo-logic-official-logo.png # High-res official brand logo
│   ├── wingo-logic-header-logo.png   # Navbar header logo
│   ├── wingo-logic-independent-data-analytics-platform.webp # Hero banner
│   ├── wingo-logic-ai.tgs         # Lottie AI vector animation
│   ├── login-animation.tgs        # Lottie auth vector animation
│   ├── favicon.ico                # Official browser favicon
│   ├── font/                      # Typography fonts (Nunito, PlusJakarta)
│   └── _next/static/              # Client-side chunks & CSS stylesheets
└── wingologic_source_bundle/      # Decompiled & modularized source code
    ├── src/lib/
    │   ├── predictionEngine.js    # Prediction matrix & period generator algorithms
    │   └── fundCalculator.js      # 1.96x Geometric allocation calculator
    ├── deobfuscated/
    │   └── deobfuscated_bundle.jsx # 11,094-line unminified React JSX code
    ├── styles/                    # globals.css & reset.css stylesheets
    ├── assets/                    # Vector graphics, logos, and fonts
    └── README.md                  # Deep technical analysis & algorithm breakdown
```

---

## 🛑 How to Stop the Server
- In PC Terminal or Mobile Termux: Press **`Ctrl + C`**.
