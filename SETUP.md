# Setup and Usage Guide for Claude Code v2.1.88

## Overview
This guide provides instructions for setting up the Claude Code v2.1.88 project and integrating it with a user-specified model API.

## Prerequisites
- Node.js version 18.0.0 or higher
- npm (Node Package Manager)

## Setup Steps

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Additional Required Dependencies
Some dependencies are not listed in package.json but are required for the project to function:
```bash
npm install @anthropic-ai/sdk @anthropic-ai/bedrock-sdk @anthropic-ai/foundry-sdk @anthropic-ai/vertex-sdk lodash-es @types/node
```

### 4. Build the Project
```bash
npm run build
```

## Using the Custom Model API Integration

### Configuration
To use a custom model API, set the following environment variables:

```bash
# Enable custom model API integration
export CLAUDE_CODE_USE_CUSTOM_API=true

# Custom model API endpoint
export CLAUDE_CODE_CUSTOM_API_ENDPOINT="https://api.example.com/v1/messages"

# API key for authentication
export CLAUDE_CODE_CUSTOM_API_KEY="your-api-key"

# Model to use
export CLAUDE_CODE_CUSTOM_API_MODEL="your-model-name"

# Optional: Additional headers (one per line)
export CLAUDE_CODE_CUSTOM_API_HEADERS="X-Custom-Header-1: value1\nX-Custom-Header-2: value2"
```

### Running the Project
```bash
# Run the CLI
node dist/cli.js

# Run with a specific prompt
node dist/cli.js -p "Hello, world!"

# Check version
node dist/cli.js --version
```

## Alternative API Providers

The project also supports the following API providers:

### Anthropic Direct API
Set your API key:
```bash
export ANTHROPIC_API_KEY="your-anthropic-api-key"
```

### AWS Bedrock
```bash
export CLAUDE_CODE_USE_BEDROCK=true
# Set AWS region (optional, default: us-east-1)
export AWS_REGION="us-east-1"
```

### Microsoft Foundry
```bash
export CLAUDE_CODE_USE_FOUNDRY=true
export ANTHROPIC_FOUNDRY_RESOURCE="your-azure-resource"
# Optional: API key (if not using Azure AD authentication)
export ANTHROPIC_FOUNDRY_API_KEY="your-foundry-api-key"
```

### Google Vertex AI
```bash
export CLAUDE_CODE_USE_VERTEX=true
export ANTHROPIC_VERTEX_PROJECT_ID="your-gcp-project-id"
# Set region (optional)
export CLOUD_ML_REGION="us-east5"
```

## Troubleshooting

### Common Issues

1. **Missing dependencies**
   - Error: `Cannot find module 'X'`
   - Solution: Install the missing dependency using npm

2. **TypeScript errors**
   - Error: `TS2307: Cannot find module 'X'`
   - Solution: Install the corresponding type declarations

3. **API authentication errors**
   - Error: `Invalid x-api-key`
   - Solution: Check that your API key is correctly set in the environment variables

4. **Build failures**
   - Error: `Build failed after all rounds`
   - Solution: Check the build logs for specific error messages and fix the issues

### Debugging

To enable debug logging, set the following environment variable:
```bash
export DEBUG=claude-code:*
```

## Notes

- The project is a decompiled source for research purposes
- Some features may not work as expected outside of the original runtime environment
- The build process creates stubs for missing modules
- The custom model API integration assumes the API follows the Anthropic API format
