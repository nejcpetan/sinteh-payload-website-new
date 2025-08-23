'use client'

import { useEffect, useState } from 'react'

interface SocialShareProps {
  title: string
  url?: string
}

export default function SocialShare({ title, url }: SocialShareProps) {
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    // Set the current URL on the client side
    setCurrentUrl(window.location.href)
  }, [])

  const shareUrl = url || currentUrl

  const handleCopyLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          url: shareUrl,
        })
      } else {
        await navigator.clipboard.writeText(shareUrl)
        // You could add a toast notification here
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
      // Fallback - try to copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl)
        alert('Link copied to clipboard!')
      } catch (clipboardError) {
        console.error('Failed to copy to clipboard:', clipboardError)
      }
    }
  }

  return (
    <div className="mb-12 pt-8 border-t">
      <h3 className="text-lg font-semibold mb-4">Share this article</h3>
      <div className="flex space-x-4">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Share on X
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
        >
          Share on LinkedIn
        </a>
        <button
          onClick={handleCopyLink}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          Copy Link
        </button>
      </div>
    </div>
  )
}
