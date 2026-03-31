// Configuration for user-specified model API

import { isEnvTruthy } from './envUtils.js'

interface ModelAPIConfig {
  endpoint: string
  apiKey: string
  model: string
  headers?: Record<string, string>
}

export function getModelAPIConfig(): ModelAPIConfig | null {
  if (!isEnvTruthy(process.env.CLAUDE_CODE_USE_CUSTOM_API)) {
    return null
  }

  const endpoint = process.env.CLAUDE_CODE_CUSTOM_API_ENDPOINT
  const apiKey = process.env.CLAUDE_CODE_CUSTOM_API_KEY
  const model = process.env.CLAUDE_CODE_CUSTOM_API_MODEL

  if (!endpoint || !apiKey || !model) {
    console.error('Error: Missing required environment variables for custom model API')
    console.error('Please set:')
    console.error('  CLAUDE_CODE_CUSTOM_API_ENDPOINT')
    console.error('  CLAUDE_CODE_CUSTOM_API_KEY')
    console.error('  CLAUDE_CODE_CUSTOM_API_MODEL')
    return null
  }

  return {
    endpoint,
    apiKey,
    model,
    headers: process.env.CLAUDE_CODE_CUSTOM_API_HEADERS
      ? Object.fromEntries(
          process.env.CLAUDE_CODE_CUSTOM_API_HEADERS.split('\n')
            .map(line => line.trim())
            .filter(line => line)
            .map(line => {
              const [key, ...value] = line.split(':')
              return [key.trim(), value.join(':').trim()]
            })
        )
      : undefined,
  }
}
