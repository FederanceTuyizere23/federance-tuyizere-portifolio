# TUYIZERE Federance - Portfolio Website
## Setup Guide for WAMP + Visual Studio Code

---

## YOUR FILES
```
portfolio/
├── index.html       ← Main webpage
├── style.css        ← All styles & design
├── script.js        ← Animations & interactions
├── send.php         ← Contact form handler
├── database.sql     ← Database setup
└── README.md        ← This file
```

---

## STEP-BY-STEP SETUP

### STEP 1 — Install & Start WAMP
1. Download WAMP from: https://www.wampserver.com/
2. Install it (default settings are fine)
3. Start WAMP — the icon in the taskbar turns **GREEN** ✓

### STEP 2 — Put Your Files in WAMP
1. Open your file explorer
2. Go to: `C:\wamp64\www\`
3. Create a new folder called: `portfolio`
4. Copy ALL your files into: `C:\wamp64\www\portfolio\`

### STEP 3 — Set Up the Database (Optional, for contact form saving)
1. Open Chrome and go to: `http://localhost/phpmyadmin`
2. Username: `root` | Password: *(leave blank)*
3. Click the **SQL** tab at the top
4. Paste the contents of `database.sql` and click **Go**

### STEP 4 — View Your Website
Open Chrome and go to: `http://localhost/portfolio/index.html`

---

## CUSTOMIZATION CHECKLIST

### Replace These Placeholder Values:

**In `index.html`:**
- [ ] Add your real profile photo → replace the icon placeholder
- [ ] Update GitHub link: `https://github.com/YOUR_USERNAME`
- [ ] Update LinkedIn link: `https://linkedin.com/in/YOUR_USERNAME`
- [ ] Update YouTube link: `https://youtube.com/@YOUR_CHANNEL`
- [ ] Update email: `your.real.email@gmail.com`
- [ ] Update phone number
- [ ] Add your ALX elevator pitch video URL in the pitch section
- [ ] Replace CV download link with your real CV file

**In `send.php`:**
- [ ] Update `YOUR_EMAIL` constant with your real email
- [ ] Update `DB_PASS` if your WAMP MySQL has a password

**In `script.js`:**
- [ ] Replace YouTube video URL in the video placeholder click handler

---

## ADDING YOUR PROFILE PHOTO
1. Create a folder: `C:\wamp64\www\portfolio\img\`
2. Put your photo there as: `profile.jpg`
3. In `index.html`, find the `.hero-img-placeholder` div and replace with:
   ```html
   <img src="img/profile.jpg" alt="TUYIZERE Federance" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">
   ```

## ADDING YOUR CV
1. Create a folder: `C:\wamp64\www\portfolio\cv\`
2. Put your CV there as: `Federance_CV.pdf`
3. The download button already points to `cv/Federance_CV.pdf` ✓

---

## TROUBLESHOOTING

| Problem | Solution |
|---|---|
| White icon in taskbar | WAMP not running — right-click and Start All Services |
| Page not loading | Make sure files are in `C:\wamp64\www\portfolio\` |
| Contact form not working | Check that PHP is enabled in WAMP |
| Database error | Run the `database.sql` file in phpMyAdmin first |

---

## MAKING IT LIVE ON THE INTERNET
When you are ready to publish online:
1. Get web hosting (Hostinger, Bluehost, etc.)
2. Upload all files to the `public_html` folder via FTP or File Manager
3. Update `send.php` with the real database credentials from your host

---

Built with ❤️ for TUYIZERE Federance | Rwanda
