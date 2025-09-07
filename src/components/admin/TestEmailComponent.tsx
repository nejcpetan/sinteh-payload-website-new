'use client'

import React, { useState } from 'react'

const TestEmailComponent: React.FC = () => {
  const [testEmail, setTestEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSendTest = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!testEmail) {
      setResult({ success: false, message: 'Please enter a test email address' })
      return
    }

    setSending(true)
    setResult(null)

    try {
      const response = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testEmail }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({
          success: true,
          message: `Test email sent successfully to ${testEmail}`,
        })
        setTestEmail('')
      } else {
        setResult({
          success: false,
          message: data.error || 'Failed to send test email',
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Network error: Could not send test email',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <h4 className="text-md font-semibold text-gray-900 mb-3">Test Email Configuration</h4>

      <form onSubmit={handleSendTest} className="space-y-4">
        <div>
          <label htmlFor="testEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Test Email Address
          </label>
          <input
            type="email"
            id="testEmail"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="admin@sinteh.pro"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={sending}
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter an email address to test the email configuration
          </p>
        </div>

        <button
          type="submit"
          disabled={sending || !testEmail}
          className={`w-full px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
            sending || !testEmail
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {sending ? 'Sending Test Email...' : 'Send Test Email'}
        </button>
      </form>

      {result && (
        <div
          className={`mt-4 p-3 rounded-md ${
            result.success
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <div className={`text-sm ${result.success ? 'text-green-800' : 'text-red-800'}`}>
            {result.success ? '✓' : '✗'} {result.message}
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <h5 className="text-sm font-medium text-gray-900 mb-2">What this test checks:</h5>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Resend API connection</li>
          <li>• Email configuration settings</li>
          <li>• From address and name setup</li>
          <li>• Email delivery capability</li>
        </ul>
      </div>
    </div>
  )
}

export default TestEmailComponent
