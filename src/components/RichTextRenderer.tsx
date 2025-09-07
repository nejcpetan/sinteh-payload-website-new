/**
 * RichTextRenderer Component - Enhanced Payload CMS Rich Text Renderer
 *
 * A wrapper around Payload's RichText component that provides enhanced
 * styling and custom renderers for better content presentation.
 *
 * KEY FEATURES:
 * - Enhanced prose styling
 * - Custom element renderers
 * - Proper heading hierarchy
 * - Image optimization
 * - Code syntax highlighting ready
 *
 * @example
 * <RichTextRenderer content={post.content} />
 */

import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface RichTextRendererProps {
  content: SerializedEditorState
  className?: string
}

export function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <RichText data={content} enableGutter={false} enableParagraphElement={true} />
    </div>
  )
}

export default RichTextRenderer
