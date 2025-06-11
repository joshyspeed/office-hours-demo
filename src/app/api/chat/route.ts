import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.openai_key,
})

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.openai_key) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add openai_key to your environment variables.' },
        { status: 500 }
      )
    }

    const { messages, systemPrompt } = await request.json()

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      )
    }

    // Prepare messages with system prompt
    const openaiMessages = [
      {
        role: 'system' as const,
        content: systemPrompt || 'You are a helpful AI assistant for an automation consulting agency. Provide professional, actionable advice for business automation and AI implementation.'
      },
      ...messages
    ]

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: openaiMessages,
      max_tokens: 1000,
      temperature: 0.7,
    })

    const assistantMessage = completion.choices[0]?.message?.content

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'No response generated from OpenAI' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      content: assistantMessage,
      usage: completion.usage
    })

  } catch (error: unknown) {
    console.error('OpenAI API Error:', error)

    // Handle specific OpenAI errors
    if (error && typeof error === 'object' && 'error' in error) {
      const openaiError = error as { error?: { type?: string } }
      if (openaiError.error?.type === 'insufficient_quota') {
        return NextResponse.json(
          { error: 'OpenAI API quota exceeded. Please check your billing details.' },
          { status: 429 }
        )
      }
    }

    if (error && typeof error === 'object' && 'status' in error) {
      const statusError = error as { status?: number }
      if (statusError.status === 401) {
        return NextResponse.json(
          { error: 'Invalid OpenAI API key. Please check your configuration.' },
          { status: 401 }
        )
      }
    }

    return NextResponse.json(
      { error: 'An error occurred while processing your request. Please try again.' },
      { status: 500 }
    )
  }
} 