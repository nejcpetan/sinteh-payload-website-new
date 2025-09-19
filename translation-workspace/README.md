# Translation Workspace

This workspace contains the working translation scripts for the Sinteh PRO website. All scripts use OpenAI for translation and Payload CMS REST API for updates.

## 🚀 Quick Start

### Prerequisites
1. Set your OpenAI API key: `$env:OPENAI_API_KEY = "sk-your-key-here"`
2. Make sure your Payload CMS is running on `http://localhost:3000`
3. Update admin credentials in the scripts if needed

### Main Translation Scripts

#### 1. Homepage Translation (Globals)
```powershell
node simple-homepage-translator.js
```
- Translates homepage global content (hero, services, projects, etc.)
- Handles all nested content with depth: 5
- Automatically cleans media objects
- Updates: English, German, Croatian

#### 2. Pages Translation
```powershell
node simple-pages-translator.js
```
- Translates all pages content (Fortress Alfred, mGard, etc.)
- Deep content extraction for complete translation
- Skips enum/select fields to avoid validation errors
- Updates: English, German, Croatian

### Legacy Complete Workflow (Optional)
```powershell
node run-complete-workflow.js
```
- Runs the full workflow: fetch → translate → update → verify
- Uses the updated deep extraction logic
- More complex but provides detailed reporting

## 📁 File Structure

### Working Scripts
- `simple-homepage-translator.js` - ✅ **Main homepage translator**
- `simple-pages-translator.js` - ✅ **Main pages translator**
- `run-complete-workflow.js` - Complete workflow runner

### Legacy Workflow (Updated with deep extraction)
- `fetch-pages.js` - Fetches and extracts page content
- `translate-content.js` - Translates content using OpenAI
- `update-database.js` - Updates Payload CMS via REST API
- `verify-translations.js` - Verifies translation completeness
- `translate-globals.js` - Translates global content (header, footer, SEO)

### Configuration
- `config.js` - Central configuration
- `package.json` - Dependencies
- `env.example` - Environment variables template

### Documentation
- `README.md` - This file
- `SETUP_INSTRUCTIONS.md` - Detailed setup guide

### Data
- `data/` - Generated translation data and results

## 🔧 Key Features

### Deep Content Extraction
- Extracts ALL text content regardless of nesting level
- Uses `depth: 5` for comprehensive data fetching
- Automatically skips system fields and media objects

### Smart Field Filtering
- Skips enum/select fields (`status`, `type`, `variant`, `icon`)
- Preserves media relationships by converting objects to IDs
- Maintains data integrity during translation

### Robust Error Handling
- Continues processing other languages if one fails
- Detailed error logging with validation messages
- Graceful handling of API rate limits

### Media Object Management
- Automatically converts media objects to IDs before updates
- Prevents validation errors from relationship fields
- Preserves all media references correctly

## 🎯 Translation Results

After running the scripts, check your website:
- **English**: `http://localhost:3000/en`
- **German**: `http://localhost:3000/de`
- **Croatian**: `http://localhost:3000/hr`

## 🔍 Troubleshooting

### Common Issues
1. **OpenAI API Key**: Make sure it's set in your PowerShell session
2. **Authentication**: Update admin credentials in scripts if needed
3. **Validation Errors**: Check if new enum fields need to be added to skip list

### Debug Mode
Both main scripts include detailed logging to track:
- Content extraction progress
- Translation mapping
- Media object cleaning
- Update success/failure

## 📝 Notes

- **Homepage**: Uses POST method for globals API
- **Pages**: Uses PATCH method for pages API
- **Languages**: Slovenian (source) → English, German, Croatian
- **Model**: Uses `gpt-4o-mini` for cost efficiency
- **Depth**: All scripts use `depth: 5` for complete content extraction