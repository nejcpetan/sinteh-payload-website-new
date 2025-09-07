'use client'

import React from 'react'

const QuickLinksComponent: React.FC = () => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="font-semibold mb-2">Quick Links</h4>
      <div className="space-y-2">
        <a
          href="/admin/collections/contact-submissions"
          className="block text-blue-600 hover:text-blue-800 text-sm"
        >
          → View All Contact Submissions
        </a>
        <a
          href="/admin/collections/contact-submissions?where[status][equals]=new"
          className="block text-blue-600 hover:text-blue-800 text-sm"
        >
          → View New Submissions
        </a>
        <a
          href="/admin/collections/contact-submissions?where[priority][equals]=urgent"
          className="block text-red-600 hover:text-red-800 text-sm"
        >
          → View Urgent Submissions
        </a>
      </div>
    </div>
  )
}

export default QuickLinksComponent
