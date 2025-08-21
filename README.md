# Pregnancy Status Page 👶

A simple, beautiful GitHub Pages website to share pregnancy status updates with family and friends.

## Quick Start

### Updating Status
1. Edit `status.json` file
2. Change `currentStatus` to:
   - `1` = Nothing new
   - `2` = In Labor  
   - `3` = In the delivery room
   - `4` = Gave birth
3. Update `lastUpdated` timestamp
4. Commit changes

### Status Options
- **Status 1**: Nothing new - All is well! 😊
- **Status 2**: In Labor - It's starting! 🤱  
- **Status 3**: In the delivery room - Almost there! 👶
- **Status 4**: Gave birth - Welcome to the world! 🎉

## GitHub Pages Deployment

1. Create a new public repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Set source to "Deploy from a branch"
5. Select "main" branch and "/ (root)" folder
6. Your site will be available at: `https://yourusername.github.io/repository-name/`

## Local Testing

To test locally:
```bash
python3 -m http.server 8000
```
Then visit: http://localhost:8000

## Features

- ✅ Responsive design (mobile-friendly)
- ✅ Baby boy theme with soft blues
- ✅ Progress bar visualization
- ✅ Celebration animation for birth
- ✅ Auto-refresh every 30 seconds
- ✅ Pull-to-refresh on mobile
- ✅ Easy JSON-based updates

## File Structure

```
pregnancy-status/
├── index.html    # Main page
├── styles.css    # Baby boy styling
├── script.js     # Status management
├── status.json   # Current status (edit this!)
└── README.md     # This file
```

Made with 💙 for family and friends