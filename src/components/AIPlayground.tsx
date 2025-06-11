'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'


interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIPlayground() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful AI assistant for an automation consulting agency. Provide professional, actionable advice for business automation and AI implementation.')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          systemPrompt
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error calling OpenAI API:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again or contact support if the issue persists.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* System Prompt Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">AI Assistant Configuration</CardTitle>
          <CardDescription>
            Customize how the AI assistant behaves and responds to your queries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="system-prompt" className="block text-sm font-medium text-slate-700 mb-2">
                System Prompt
              </label>
              <Textarea
                id="system-prompt"
                placeholder="Define the AI's role and behavior..."
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">AI Chat Interface</CardTitle>
            <CardDescription>
              Interact with our AI assistant to see automation capabilities in action.
            </CardDescription>
          </div>
          {messages.length > 0 && (
            <Button variant="outline" onClick={clearChat} size="sm">
              Clear Chat
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {/* Messages Display */}
          <div className="space-y-4 mb-6 min-h-[400px] max-h-[600px] overflow-y-auto bg-slate-50 rounded-lg p-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-slate-500">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-lg font-medium">Start a conversation</p>
                  <p className="text-sm">Ask about automation, AI implementation, or business processes.</p>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl px-4 py-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-slate-900 text-white'
                        : 'bg-white border border-slate-200 text-slate-900'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        message.role === 'user' ? 'bg-slate-700' : 'bg-slate-100'
                      }`}>
                        {message.role === 'user' ? 'U' : 'AI'}
                      </div>
                      <div className="flex-1">
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-2 ${
                          message.role === 'user' ? 'text-slate-300' : 'text-slate-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-3xl px-4 py-3 rounded-lg bg-white border border-slate-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium">
                      AI
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <Textarea
                placeholder="Ask me about automation strategies, AI implementation, workflow optimization, or any business process questions..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={3}
                className="flex-1 resize-none"
                disabled={isLoading}
              />
              <div className="flex flex-col space-y-2">
                <Button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="bg-slate-900 hover:bg-slate-800"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending</span>
                    </div>
                  ) : (
                    'Send'
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* Quick Examples */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm font-medium text-slate-700 mb-3">Try these example prompts:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "How can I automate my email marketing workflows?",
                "What are the best practices for implementing AI in customer service?",
                "Help me optimize my sales process with automation tools",
                "Create a proposal template for automation consulting services"
              ].map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInput(example)}
                  disabled={isLoading}
                  className="text-left justify-start h-auto p-3 text-sm"
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 