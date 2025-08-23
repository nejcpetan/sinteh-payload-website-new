# ISR (Incremental Static Regeneration) Setup Documentation

## Overview

This project is now configured with Next.js ISR to automatically regenerate pages when content is updated in Payload CMS. The system uses on-demand revalidation triggered by Payload CMS hooks.

## Environment Variables Required

Add these environment variables to your `.env.local` file:

```env
# ISR Revalidation Secret (REQUIRED)
REVALIDATE_SECRET=your-secure-random-string-here

# Site URL for revalidation API calls (REQUIRED)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
# OR if NEXT_PUBLIC_SITE_URL is not set, fallback to:
PAYLOAD_PUBLIC_SERVER_URL=https://your-domain.com
```

### Environment Variable Details

1. **REVALIDATE_SECRET**: A secure random string used to authenticate revalidation requests. Generate a secure random string (recommended 32+ characters).

2. **NEXT_PUBLIC_SITE_URL** or **PAYLOAD_PUBLIC_SERVER_URL**: The base URL of your website. This is used to construct the revalidation API endpoint URL.

## How It Works

### 1. ISR Configuration
All frontend pages now have `export const revalidate = false`, which enables on-demand revalidation only.

### 2. Revalidation API Route
- Location: `/src/app/api/revalidate/route.ts`
- Handles POST requests to trigger page regeneration
- Secured with the `REVALIDATE_SECRET` environment variable
- Supports both specific page revalidation and layout revalidation

### 3. Payload CMS Hooks
Hooks are configured for the following collections and globals:

#### Collections:
- **Pages**: Revalidates specific page when published
- **Posts**: Revalidates specific post and blog listing when published

#### Globals:
- **Homepage**: Revalidates homepage when updated
- **Header**: Revalidates entire layout when updated
- **Footer**: Revalidates entire layout when updated
- **SEO**: Revalidates entire layout when updated

### 4. Revalidation Triggers

#### When a Page is updated:
- Revalidates the specific page: `/{slug}`
- If slug changes, also revalidates the old slug

#### When a Post is updated:
- Revalidates the specific post: `/blog/{slug}`
- Revalidates the blog listing: `/blog`
- If slug changes, also revalidates the old slug

#### When Global content is updated:
- Header/Footer/SEO: Revalidates entire layout
- Homepage: Revalidates homepage only

## Testing ISR

### Manual Testing via API
You can manually test revalidation using curl or a REST client:

```bash
# Revalidate homepage
curl -X POST "https://your-domain.com/api/revalidate?secret=your-secret" \
  -H "Content-Type: application/json" \
  -d '{"collection": "homepage"}'

# Revalidate specific page
curl -X POST "https://your-domain.com/api/revalidate?secret=your-secret" \
  -H "Content-Type: application/json" \
  -d '{"collection": "pages", "slug": "about"}'

# Revalidate specific blog post
curl -X POST "https://your-domain.com/api/revalidate?secret=your-secret" \
  -H "Content-Type: application/json" \
  -d '{"collection": "posts", "slug": "my-blog-post"}'
```

### Testing via Content Updates
1. Log into the Payload admin panel
2. Update and publish a page or post
3. Check the server logs for revalidation messages
4. Verify the frontend reflects the changes

## Security Notes

- The `REVALIDATE_SECRET` must be kept secure and should be a long, random string
- Only authenticated users can update content in Payload CMS
- The revalidation API endpoint validates the secret before processing requests
- Revalidation only occurs for published content

## Troubleshooting

### Common Issues:

1. **Revalidation not triggering**:
   - Check that `REVALIDATE_SECRET` is set
   - Verify `NEXT_PUBLIC_SITE_URL` or `PAYLOAD_PUBLIC_SERVER_URL` is correct
   - Check server logs for error messages

2. **"Invalid token" errors**:
   - Verify the `REVALIDATE_SECRET` matches in both the API call and environment variable

3. **Content not updating**:
   - Ensure content is set to "published" status
   - Check that the page was built with static generation
   - Verify the revalidation API is being called successfully

### Debug Logs
The system logs revalidation attempts. Check your server logs for messages like:
- "Triggering revalidation for page: {slug}"
- "Revalidation successful"
- "Error in {collection} afterChange hook"

## Performance Benefits

With ISR enabled:
- Pages load instantly (served statically)
- Content updates are reflected immediately after publishing
- No need for full site rebuilds
- Better SEO with static pages
- Reduced server load compared to SSR

## Next Steps

The ISR system is now fully configured and ready to use. When you publish content changes in Payload CMS, the corresponding pages will be regenerated automatically.
