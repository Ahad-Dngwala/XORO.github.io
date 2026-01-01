# Debug Guide for Blank Screen Issue

## Steps to Debug

1. **Open Browser Console** (F12 or Right-click → Inspect → Console)

2. **Check for Console Messages:**
   - Look for messages starting with 🚀, ✅, 📱, 🔄, etc.
   - Check for any red error messages

3. **Check Network Tab:**
   - Open Network tab in DevTools
   - Refresh the page
   - Look for failed requests (red)
   - Check if `/api/tasks` request is successful

4. **Check Elements Tab:**
   - Look for `<div id="root">` element
   - Check if it has any content inside

## Common Issues & Solutions

### Issue 1: API Connection Error
**Symptoms:** Console shows network errors
**Solution:** 
- Verify backend is running on `http://localhost:3001`
- Check CORS settings in backend
- Verify `FRONTEND_URL` in backend `.env` matches frontend URL

### Issue 2: JavaScript Error
**Symptoms:** Red error in console
**Solution:**
- Check the error message
- Verify all dependencies are installed: `npm install` in frontend folder
- Check if all imports are correct

### Issue 3: CSS Not Loading
**Symptoms:** Page renders but looks broken
**Solution:**
- Check if `index.css` is being loaded
- Verify Tailwind is configured correctly
- Check `postcss.config.js` exists

### Issue 4: React Not Mounting
**Symptoms:** No console logs, completely blank
**Solution:**
- Check if `main.jsx` is being loaded
- Verify `index.html` has `<div id="root"></div>`
- Check Vite dev server is running

## Quick Test

Open browser console and run:
```javascript
document.getElementById('root')
```

If this returns `null`, the root element doesn't exist.
If it returns an element, React should be mounting there.

## Manual API Test

Test if backend is accessible:
```bash
curl http://localhost:3001/api/tasks
```

Or open in browser: `http://localhost:3001/api/tasks`

