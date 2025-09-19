# Setup Instructions

## Quick Setup

### 1. Install Dependencies
```powershell
npm install
```

### 2. Set Environment Variables
```powershell
# Set your OpenAI API key
$env:OPENAI_API_KEY = "sk-your-actual-key-here"

# Verify it's set
echo $env:OPENAI_API_KEY
```

### 3. Update Admin Credentials
Edit the admin credentials in both main scripts:

**In `simple-homepage-translator.js` and `simple-pages-translator.js`:**
```javascript
const response = await axios.post(`${this.baseUrl}/api/users/login`, {
  email: 'your-admin@email.com',     // ← Update this
  password: 'your-admin-password',   // ← Update this
})
```

### 4. Start Your Payload CMS
Make sure your Payload CMS is running on `http://localhost:3000`

### 5. Run Translation

**For Homepage (Globals):**
```powershell
node simple-homepage-translator.js
```

**For All Pages:**
```powershell
node simple-pages-translator.js
```

## Environment Variables Reference

Create a `.env` file (optional, scripts work with PowerShell env vars):

```env
OPENAI_API_KEY=sk-your-key-here
PAYLOAD_SECRET=your-payload-secret
POSTGRES_URL=your-database-url
```

## Verification

After running the scripts, check these URLs:
- English: http://localhost:3000/en
- German: http://localhost:3000/de  
- Croatian: http://localhost:3000/hr

## Troubleshooting

### OpenAI API Key Issues
```powershell
# Check if key is set
echo $env:OPENAI_API_KEY

# Set it again if needed
$env:OPENAI_API_KEY = "sk-your-key"
```

### Authentication Issues
- Verify admin email/password in scripts
- Check if your Payload CMS admin user exists
- Ensure CMS is running on localhost:3000

### Translation Issues
- Check terminal output for detailed error messages
- Verify OpenAI API key has sufficient credits
- Check if content was actually translated by viewing the website

## Success Indicators

You should see:
- ✅ Authentication successful
- ✅ Content extraction with field counts
- ✅ Translation progress with before/after text
- ✅ Update successful messages
- 🎉 Translation completed messages

The scripts will show detailed progress and any errors encountered.