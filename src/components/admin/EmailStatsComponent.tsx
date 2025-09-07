'use client'

import React, { useEffect, useState } from 'react'

interface EmailStats {
  totalSubmissions: number
  lastSubmission: string | null
  emailsSent: number
  submissionsBySource: Record<string, number>
  submissionsByStatus: Record<string, number>
}

const EmailStatsComponent: React.FC = () => {
  const [stats, setStats] = useState<EmailStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/email-stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch email stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="p-4">
        <p className="text-gray-500">Unable to load email statistics.</p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Email Statistics</h3>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{stats.totalSubmissions}</div>
          <div className="text-sm text-gray-500">Total Submissions</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{stats.emailsSent}</div>
          <div className="text-sm text-gray-500">Emails Sent</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm font-medium text-gray-900">
            {stats.lastSubmission
              ? new Date(stats.lastSubmission).toLocaleDateString('sl-SI', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'No submissions yet'}
          </div>
          <div className="text-sm text-gray-500">Last Submission</div>
        </div>
      </div>

      {/* Submissions by Source */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-md font-semibold text-gray-900 mb-3">Submissions by Source</h4>
        <div className="space-y-2">
          {Object.entries(stats.submissionsBySource).map(([source, count]) => (
            <div key={source} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 capitalize">{source.replace('-', ' ')}</span>
              <span className="text-sm font-medium text-gray-900">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Submissions by Status */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-md font-semibold text-gray-900 mb-3">Submissions by Status</h4>
        <div className="space-y-2">
          {Object.entries(stats.submissionsByStatus).map(([status, count]) => (
            <div key={status} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 capitalize">{status.replace('-', ' ')}</span>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    status === 'new'
                      ? 'bg-blue-500'
                      : status === 'in-progress'
                        ? 'bg-yellow-500'
                        : status === 'responded'
                          ? 'bg-green-500'
                          : status === 'closed'
                            ? 'bg-gray-500'
                            : 'bg-red-500'
                  }`}
                ></div>
                <span className="text-sm font-medium text-gray-900">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Statistics are updated in real-time. Last updated: {new Date().toLocaleString('sl-SI')}
      </div>
    </div>
  )
}

export default EmailStatsComponent
