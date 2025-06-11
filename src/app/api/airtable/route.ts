import { NextRequest, NextResponse } from 'next/server'
import Airtable from 'airtable'

export async function GET(request: NextRequest) {
  try {
    // Check if API credentials are configured
    if (!process.env.airtable_key || !process.env.airtable_base_id) {
      return NextResponse.json(
        { 
          error: 'Airtable credentials not configured. Please add airtable_key and airtable_base_id to your environment variables.' 
        },
        { status: 500 }
      )
    }

    // Configure Airtable inside the function
    const airtable = new Airtable({
      apiKey: process.env.airtable_key,
    })

    const { searchParams } = new URL(request.url)
    const tableName = searchParams.get('table') || 'Table 1' // Default table name
    const maxRecords = parseInt(searchParams.get('maxRecords') || '100')
    const view = searchParams.get('view')

    const base = airtable.base(process.env.airtable_base_id)
    const table = base(tableName)

    // Fetch records from Airtable
    const records: Array<{
      id: string
      fields: Record<string, unknown>
      createdTime?: string
    }> = []
    
    // Build select options conditionally
    const selectOptions: { maxRecords: number; view?: string } = { maxRecords }
    if (view) {
      selectOptions.view = view
    }
    
    await table.select(selectOptions).eachPage((pageRecords, fetchNextPage) => {
      pageRecords.forEach((record) => {
        records.push({
          id: record.getId(),
          fields: record.fields,
          createdTime: record.get('Created Time') || record._rawJson.createdTime,
        })
      })
      fetchNextPage()
    })

    // Get table schema information
    const schema = records.length > 0 
      ? Object.keys(records[0].fields).map(fieldName => ({
          name: fieldName,
          type: typeof records[0].fields[fieldName]
        }))
      : []

    return NextResponse.json({
      records,
      schema,
      metadata: {
        totalRecords: records.length,
        tableName,
        lastUpdated: new Date().toISOString(),
      }
    })

  } catch (error: unknown) {
    console.error('Airtable API Error:', error)

    // Handle specific Airtable errors
    if (error && typeof error === 'object' && 'error' in error) {
      const airtableError = error as { error?: { type?: string, message?: string } }
      if (airtableError.error?.type === 'AUTHENTICATION_REQUIRED') {
        return NextResponse.json(
          { error: 'Invalid Airtable API key. Please check your configuration.' },
          { status: 401 }
        )
      }
      if (airtableError.error?.message) {
        return NextResponse.json(
          { error: `Airtable Error: ${airtableError.error.message}` },
          { status: 400 }
        )
      }
    }

    return NextResponse.json(
      { error: 'An error occurred while fetching data from Airtable. Please try again.' },
      { status: 500 }
    )
  }
}

// GET method to list available tables in the base
export async function POST(request: NextRequest) {
  try {
    if (!process.env.airtable_key || !process.env.airtable_base_id) {
      return NextResponse.json(
        { error: 'Airtable credentials not configured.' },
        { status: 500 }
      )
    }

    const { action } = await request.json()

    if (action === 'getTables') {
      // This is a simplified approach - in a real app you might want to use the Airtable metadata API
      // For now, we'll return common table names that users can try
      return NextResponse.json({
        tables: [
          'Table 1',
          'Contacts',
          'Projects',
          'Tasks',
          'Clients',
          'Leads',
          'Inventory',
          'Events'
        ]
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )

  } catch (error: unknown) {
    console.error('Airtable API Error:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    )
  }
} 