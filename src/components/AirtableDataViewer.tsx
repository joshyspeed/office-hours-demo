'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

interface AirtableRecord {
  id: string
  fields: Record<string, unknown>
  createdTime?: string
}

interface AirtableResponse {
  records: AirtableRecord[]
  schema: { name: string; type: string }[]
  metadata: {
    totalRecords: number
    tableName: string
    lastUpdated: string
  }
}

export default function AirtableDataViewer() {
  const [data, setData] = useState<AirtableResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedTable, setSelectedTable] = useState('Table 1')
  const [availableTables] = useState([
    'Table 1', 'Contacts', 'Projects', 'Tasks', 'Clients', 'Leads', 'Inventory', 'Events'
  ])

  const fetchData = async (tableName: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/airtable?table=${encodeURIComponent(tableName)}&maxRecords=50`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }
      
      const result: AirtableResponse = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(selectedTable)
  }, [selectedTable])

  const handleTableChange = (tableName: string) => {
    setSelectedTable(tableName)
  }

  const handleRefresh = () => {
    fetchData(selectedTable)
  }

  const formatCellValue = (value: unknown): string => {
    if (value === null || value === undefined) return ''
    if (Array.isArray(value)) return value.join(', ')
    if (typeof value === 'object') return JSON.stringify(value)
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    return String(value)
  }

  const getCellColor = (value: unknown): string => {
    if (value === null || value === undefined || value === '') return 'text-slate-400'
    if (typeof value === 'boolean') return value ? 'text-green-600' : 'text-red-600'
    if (typeof value === 'number') return 'text-blue-600'
    return 'text-slate-900'
  }

  const exportToCSV = () => {
    if (!data || data.records.length === 0) return

    const headers = data.schema.map(field => field.name)
    const csvContent = [
      headers.join(','),
      ...data.records.map(record => 
        headers.map(header => {
          const value = formatCellValue(record.fields[header])
          return `"${value.replace(/"/g, '""')}"`
        }).join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `${selectedTable}_export.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Airtable Connection</CardTitle>
          <CardDescription>
            Select a table from your Airtable base to view and analyze your data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="table-select" className="text-sm font-medium text-slate-700 mb-2 block">
                Select Table
              </Label>
              <Select value={selectedTable} onValueChange={handleTableChange}>
                <SelectTrigger id="table-select">
                  <SelectValue placeholder="Choose a table" />
                </SelectTrigger>
                <SelectContent>
                  {availableTables.map((table) => (
                    <SelectItem key={table} value={table}>
                      {table}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleRefresh} disabled={loading} variant="outline">
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                    <span>Loading</span>
                  </div>
                ) : (
                  'Refresh'
                )}
              </Button>
              {data && data.records.length > 0 && (
                <Button onClick={exportToCSV} variant="outline">
                  Export CSV
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-red-800">Connection Error</p>
                <p className="text-sm text-red-600">{error}</p>
                {error.includes('not configured') && (
                  <p className="text-xs text-red-500 mt-1">
                    Please ensure your Airtable API key and base ID are set in your environment variables.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Display */}
      {data && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">
                {data.metadata.tableName} Data
              </CardTitle>
              <CardDescription>
                {data.metadata.totalRecords} records • Last updated: {new Date(data.metadata.lastUpdated).toLocaleString()}
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-sm">
              {data.metadata.totalRecords} records
            </Badge>
          </CardHeader>
          <CardContent>
            {data.records.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg font-medium">No data found</p>
                                 <p className="text-sm">This table appears to be empty or doesn&apos;t exist.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">ID</TableHead>
                      {data.schema.map((field) => (
                        <TableHead key={field.name} className="min-w-32">
                          <div className="flex flex-col">
                            <span>{field.name}</span>
                            <Badge variant="secondary" className="text-xs w-fit mt-1">
                              {field.type}
                            </Badge>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.records.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-mono text-xs text-slate-500">
                          {record.id.slice(0, 8)}...
                        </TableCell>
                        {data.schema.map((field) => {
                          const value = record.fields[field.name]
                          return (
                            <TableCell 
                              key={field.name}
                              className={`max-w-xs truncate ${getCellColor(value)}`}
                              title={formatCellValue(value)}
                            >
                              {formatCellValue(value) || <span className="text-slate-400">—</span>}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {loading && !data && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-600">Connecting to Airtable...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 