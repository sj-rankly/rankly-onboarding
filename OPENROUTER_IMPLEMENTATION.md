# 🚀 OpenRouter Implementation Guide for Rankly

**Multi-LLM GEO/AEO Metrics Platform**

This guide shows you how to implement OpenRouter for testing prompts across multiple LLMs to track brand visibility, sentiment, and citations.

---

## 🎯 Why OpenRouter for Rankly?

### Your Use Case: Multi-LLM Brand Visibility Testing
Rankly needs to:
1. Test user prompts across **multiple LLMs** (GPT-4, Claude, Gemini, Perplexity, etc.)
2. Track if **brand is mentioned** in responses
3. Measure **sentiment** towards the brand
4. Track **position/ranking** of brand mentions
5. Identify **citations** and sources
6. Compare performance across different LLM platforms

### OpenRouter = Perfect Fit
- ✅ **Single API** for all major LLMs
- ✅ **Consistent format** = easier metrics collection
- ✅ **Cost tracking** across all models in one place
- ✅ **Fast iteration** when testing new models
- ✅ **Unified billing** = simpler for users

---

## 📦 Installation

```bash
npm install openai
```

That's it! The `openai` package works with both OpenAI and OpenRouter.

---

## 🔑 Setup

### 1. Get OpenRouter API Key
1. Visit https://openrouter.ai/
2. Sign up for account
3. Go to API Keys section
4. Create new API key
5. Add credits ($5-10 to start)

### 2. Add to .env
```env
OPENROUTER_API_KEY=sk-or-v1-xxxxx
OPENROUTER_REFERER=https://rankly.ai
OPENROUTER_APP_NAME=Rankly
```

### 3. Create LLM Service

```typescript
// src/services/llmService.ts
import OpenAI from 'openai'

export class LLMService {
  private client: OpenAI

  constructor() {
    this.client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        'HTTP-Referer': process.env.OPENROUTER_REFERER || 'https://rankly.ai',
        'X-Title': process.env.OPENROUTER_APP_NAME || 'Rankly'
      }
    })
  }

  // Test a single prompt on a single model
  async testPrompt(prompt: string, model: string) {
    const startTime = Date.now()
    
    try {
      const response = await this.client.chat.completions.create({
        model: model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })

      const endTime = Date.now()

      return {
        success: true,
        model: model,
        response: response.choices[0].message.content,
        responseTime: endTime - startTime,
        tokens: response.usage,
        id: response.id
      }
    } catch (error: any) {
      return {
        success: false,
        model: model,
        error: error.message,
        responseTime: Date.now() - startTime
      }
    }
  }

  // Test prompt across multiple models
  async testPromptAcrossModels(prompt: string, models: string[]) {
    const results = await Promise.allSettled(
      models.map(model => this.testPrompt(prompt, model))
    )

    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value
      } else {
        return {
          success: false,
          model: models[index],
          error: result.reason
        }
      }
    })
  }
}
```

---

## 🎨 Available Models for Rankly

### Recommended Models for Brand Testing

```typescript
export const RANKLY_TEST_MODELS = {
  // Primary models (most popular for users)
  PRIMARY: [
    'openai/gpt-4-turbo',              // GPT-4 Turbo (latest)
    'anthropic/claude-3-opus',         // Claude 3 Opus (best quality)
    'google/gemini-pro',               // Gemini Pro
    'perplexity/llama-3-sonar-large-32k-online' // Perplexity (web-connected)
  ],
  
  // Secondary models (for comprehensive testing)
  SECONDARY: [
    'openai/gpt-3.5-turbo',           // GPT-3.5 (fast & cheap)
    'anthropic/claude-3-sonnet',      // Claude 3 Sonnet (balanced)
    'anthropic/claude-3-haiku',       // Claude 3 Haiku (fast)
    'google/gemini-pro-1.5',          // Gemini 1.5 Pro
    'meta-llama/llama-3-70b-instruct', // Llama 3 70B
    'mistralai/mistral-large',        // Mistral Large
    'cohere/command-r-plus'           // Cohere Command R+
  ],
  
  // Budget models (for high-volume testing)
  BUDGET: [
    'openai/gpt-3.5-turbo',
    'anthropic/claude-3-haiku',
    'google/gemini-flash-1.5',
    'meta-llama/llama-3-8b-instruct'
  ]
}
```

### Pricing (as of Oct 2025)
| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|-------|----------------------|------------------------|
| GPT-4 Turbo | $10 | $30 |
| Claude 3 Opus | $15 | $75 |
| Claude 3 Sonnet | $3 | $15 |
| Gemini Pro | $0.50 | $1.50 |
| Perplexity Sonar | $1 | $1 |
| GPT-3.5 Turbo | $0.50 | $1.50 |

*Prices subject to change on OpenRouter*

---

## 🧪 Core Feature: Brand Visibility Testing

```typescript
// src/services/brandAnalysisService.ts
import { LLMService } from './llmService'

interface BrandAnalysisResult {
  model: string
  brandMentioned: boolean
  brandPosition: number | null  // 1-based position, null if not mentioned
  sentiment: number             // -1 to 1
  responseSnippet: string
  fullResponse: string
  citations: string[]
  competitorMentions: string[]
  responseTime: number
  tokens: any
}

export class BrandAnalysisService {
  private llmService: LLMService

  constructor() {
    this.llmService = new LLMService()
  }

  // Main function: Test prompt for brand visibility
  async analyzePromptForBrand(
    prompt: string,
    brandName: string,
    competitors: string[],
    models: string[]
  ): Promise<BrandAnalysisResult[]> {
    
    // Test prompt across all models
    const llmResults = await this.llmService.testPromptAcrossModels(prompt, models)
    
    // Analyze each response for brand metrics
    const analyses = llmResults.map(result => {
      if (!result.success || !result.response) {
        return {
          model: result.model,
          brandMentioned: false,
          brandPosition: null,
          sentiment: 0,
          responseSnippet: '',
          fullResponse: '',
          citations: [],
          competitorMentions: [],
          responseTime: result.responseTime,
          tokens: result.tokens || {},
          error: result.error
        }
      }

      return this.analyzeBrandPresence(
        result.response,
        brandName,
        competitors,
        result
      )
    })

    return analyses
  }

  // Analyze if brand is mentioned and where
  private analyzeBrandPresence(
    response: string,
    brandName: string,
    competitors: string[],
    llmResult: any
  ): BrandAnalysisResult {
    
    const lowerResponse = response.toLowerCase()
    const lowerBrand = brandName.toLowerCase()
    
    // Check if brand is mentioned
    const brandMentioned = lowerResponse.includes(lowerBrand)
    
    // Find position (1-based, like search rankings)
    let brandPosition: number | null = null
    if (brandMentioned) {
      // Split into sentences
      const sentences = response.split(/[.!?]+/)
      for (let i = 0; i < sentences.length; i++) {
        if (sentences[i].toLowerCase().includes(lowerBrand)) {
          brandPosition = i + 1
          break
        }
      }
    }
    
    // Analyze sentiment (simplified)
    const sentiment = this.analyzeSentiment(response, brandName)
    
    // Find competitor mentions
    const competitorMentions = competitors.filter(comp =>
      lowerResponse.includes(comp.toLowerCase())
    )
    
    // Extract citations (URLs in response)
    const citations = this.extractCitations(response)
    
    // Get snippet around brand mention
    const responseSnippet = brandMentioned
      ? this.extractSnippet(response, brandName)
      : response.substring(0, 200) + '...'

    return {
      model: llmResult.model,
      brandMentioned,
      brandPosition,
      sentiment,
      responseSnippet,
      fullResponse: response,
      citations,
      competitorMentions,
      responseTime: llmResult.responseTime,
      tokens: llmResult.tokens
    }
  }

  // Simple sentiment analysis
  private analyzeSentiment(text: string, brand: string): number {
    const lowerText = text.toLowerCase()
    const lowerBrand = brand.toLowerCase()
    
    // Find sentences mentioning the brand
    const sentences = text.split(/[.!?]+/)
    const brandSentences = sentences.filter(s => 
      s.toLowerCase().includes(lowerBrand)
    )
    
    if (brandSentences.length === 0) return 0
    
    // Simple positive/negative word counting
    const positiveWords = ['best', 'great', 'excellent', 'good', 'recommended', 'top', 'leading', 'innovative', 'reliable', 'quality']
    const negativeWords = ['worst', 'bad', 'poor', 'avoid', 'terrible', 'disappointing', 'issues', 'problems', 'difficult']
    
    let positiveCount = 0
    let negativeCount = 0
    
    brandSentences.forEach(sentence => {
      const lower = sentence.toLowerCase()
      positiveWords.forEach(word => {
        if (lower.includes(word)) positiveCount++
      })
      negativeWords.forEach(word => {
        if (lower.includes(word)) negativeCount++
      })
    })
    
    // Return score between -1 and 1
    const total = positiveCount + negativeCount
    if (total === 0) return 0
    
    return (positiveCount - negativeCount) / total
  }

  // Extract URLs from response
  private extractCitations(text: string): string[] {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    return text.match(urlRegex) || []
  }

  // Extract snippet around brand mention
  private extractSnippet(text: string, brand: string, contextLength = 100): string {
    const index = text.toLowerCase().indexOf(brand.toLowerCase())
    if (index === -1) return text.substring(0, 200)
    
    const start = Math.max(0, index - contextLength)
    const end = Math.min(text.length, index + brand.length + contextLength)
    
    let snippet = text.substring(start, end)
    if (start > 0) snippet = '...' + snippet
    if (end < text.length) snippet = snippet + '...'
    
    return snippet
  }

  // Calculate aggregate metrics
  calculateAggregateMetrics(results: BrandAnalysisResult[]) {
    const successful = results.filter(r => !r.error)
    
    return {
      totalModels: results.length,
      successfulTests: successful.length,
      visibilityScore: (successful.filter(r => r.brandMentioned).length / successful.length) * 100,
      averageSentiment: successful.reduce((sum, r) => sum + r.sentiment, 0) / successful.length,
      averagePosition: this.calculateAveragePosition(successful),
      citationCount: successful.reduce((sum, r) => sum + r.citations.length, 0),
      competitorCompetition: this.analyzeCompetition(successful),
      platformBreakdown: this.getPlatformBreakdown(successful)
    }
  }

  private calculateAveragePosition(results: BrandAnalysisResult[]): number {
    const mentioned = results.filter(r => r.brandMentioned && r.brandPosition)
    if (mentioned.length === 0) return 0
    return mentioned.reduce((sum, r) => sum + (r.brandPosition || 0), 0) / mentioned.length
  }

  private analyzeCompetition(results: BrandAnalysisResult[]) {
    const allCompetitors: { [key: string]: number } = {}
    
    results.forEach(r => {
      r.competitorMentions.forEach(comp => {
        allCompetitors[comp] = (allCompetitors[comp] || 0) + 1
      })
    })
    
    return Object.entries(allCompetitors)
      .map(([name, count]) => ({ name, mentionCount: count }))
      .sort((a, b) => b.mentionCount - a.mentionCount)
  }

  private getPlatformBreakdown(results: BrandAnalysisResult[]) {
    return results.map(r => ({
      platform: this.getPlatformName(r.model),
      brandMentioned: r.brandMentioned,
      sentiment: r.sentiment,
      position: r.brandPosition
    }))
  }

  private getPlatformName(model: string): string {
    if (model.includes('gpt')) return 'OpenAI'
    if (model.includes('claude')) return 'Anthropic'
    if (model.includes('gemini')) return 'Google'
    if (model.includes('perplexity')) return 'Perplexity'
    if (model.includes('llama')) return 'Meta'
    if (model.includes('mistral')) return 'Mistral'
    if (model.includes('cohere')) return 'Cohere'
    return 'Unknown'
  }
}
```

---

## 🎯 API Endpoint Implementation

```typescript
// src/routes/prompts.ts
import express from 'express'
import { BrandAnalysisService } from '../services/brandAnalysisService'
import { RANKLY_TEST_MODELS } from '../services/llmService'
import { authenticateToken } from '../middleware/auth'
import { Prompt, Analytics } from '../models'

const router = express.Router()
const brandAnalysis = new BrandAnalysisService()

// Test a prompt across multiple LLMs
router.post('/prompts/:id/test', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { models, tier = 'PRIMARY' } = req.body
    const userId = req.user.id

    // Get prompt from database
    const prompt = await Prompt.findOne({ _id: id, userId })
    if (!prompt) {
      return res.status(404).json({ error: 'Prompt not found' })
    }

    // Get user's brand and competitors
    const user = await User.findById(userId)
      .populate('competitors')
      .populate('personas')
      .populate('topics')

    // Select models to test
    const testModels = models || RANKLY_TEST_MODELS[tier]

    // Run the test
    const results = await brandAnalysis.analyzePromptForBrand(
      prompt.text,
      user.companyName,
      user.competitors.map(c => c.name),
      testModels
    )

    // Calculate aggregate metrics
    const metrics = brandAnalysis.calculateAggregateMetrics(results)

    // Save results to analytics
    await Analytics.create({
      userId,
      promptId: id,
      date: new Date(),
      results,
      metrics
    })

    // Update prompt performance
    await Prompt.findByIdAndUpdate(id, {
      'performance.tested': true,
      'performance.lastTestedAt': new Date(),
      'performance.visibilityScore': metrics.visibilityScore,
      'performance.sentimentScore': metrics.averageSentiment
    })

    res.json({
      success: true,
      results,
      metrics
    })

  } catch (error: any) {
    console.error('Prompt test error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get test history for a prompt
router.get('/prompts/:id/test-history', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const history = await Analytics.find({ 
      userId, 
      promptId: id 
    })
      .sort({ date: -1 })
      .limit(10)

    res.json({ history })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
```

---

## 📊 Frontend Integration

```typescript
// Frontend: Test a prompt
const testPrompt = async (promptId: string) => {
  setIsTesting(true)
  
  try {
    const response = await fetch(`/api/prompts/${promptId}/test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        tier: 'PRIMARY' // or 'SECONDARY', 'BUDGET'
      })
    })

    const data = await response.json()

    // Display results
    setTestResults({
      visibilityScore: data.metrics.visibilityScore,
      sentiment: data.metrics.averageSentiment,
      citationCount: data.metrics.citationCount,
      platformBreakdown: data.metrics.platformBreakdown,
      detailedResults: data.results
    })
  } catch (error) {
    console.error('Test failed:', error)
  } finally {
    setIsTesting(false)
  }
}
```

---

## 💰 Cost Management

```typescript
// src/services/costService.ts
export class CostService {
  // Estimate cost before running test
  estimateCost(prompt: string, models: string[]): number {
    const promptTokens = Math.ceil(prompt.length / 4) // Rough estimate
    const expectedOutputTokens = 500 // Average response
    
    let totalCost = 0
    
    models.forEach(model => {
      const pricing = this.getModelPricing(model)
      const inputCost = (promptTokens / 1_000_000) * pricing.input
      const outputCost = (expectedOutputTokens / 1_000_000) * pricing.output
      totalCost += inputCost + outputCost
    })
    
    return totalCost
  }

  private getModelPricing(model: string) {
    // Simplified pricing (check OpenRouter for actual)
    const pricing: { [key: string]: { input: number, output: number } } = {
      'openai/gpt-4-turbo': { input: 10, output: 30 },
      'anthropic/claude-3-opus': { input: 15, output: 75 },
      'anthropic/claude-3-sonnet': { input: 3, output: 15 },
      'google/gemini-pro': { input: 0.5, output: 1.5 },
      'perplexity/llama-3-sonar-large-32k-online': { input: 1, output: 1 },
      'openai/gpt-3.5-turbo': { input: 0.5, output: 1.5 }
    }
    
    return pricing[model] || { input: 1, output: 2 }
  }

  // Track user spending
  async trackSpending(userId: string, cost: number) {
    await User.findByIdAndUpdate(userId, {
      $inc: { 'usage.totalSpent': cost, 'usage.promptsRun': 1 }
    })
  }
}
```

---

## 🔄 Error Handling & Retries

```typescript
// Enhanced LLM Service with retries
export class LLMService {
  async testPromptWithRetry(
    prompt: string, 
    model: string, 
    maxRetries = 3
  ) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.testPrompt(prompt, model)
      } catch (error: any) {
        if (attempt === maxRetries) {
          // Log final failure
          console.error(`Failed after ${maxRetries} attempts:`, error)
          return {
            success: false,
            model,
            error: error.message,
            attempts: maxRetries
          }
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => 
          setTimeout(resolve, 1000 * Math.pow(2, attempt - 1))
        )
      }
    }
  }
}
```

---

## 📈 Usage Limits & Rate Limiting

```typescript
// src/middleware/usageLimits.ts
export const checkUsageLimits = async (req, res, next) => {
  const userId = req.user.id
  const user = await User.findById(userId)

  // Check plan limits
  const limits = {
    free: { promptsPerMonth: 50, modelsPerTest: 3 },
    pro: { promptsPerMonth: 500, modelsPerTest: 7 },
    enterprise: { promptsPerMonth: Infinity, modelsPerTest: 15 }
  }

  const userLimit = limits[user.subscription.plan]
  
  // Check if user exceeded monthly limit
  const currentMonth = new Date().getMonth()
  const monthlyUsage = await Analytics.countDocuments({
    userId,
    date: { 
      $gte: new Date(new Date().getFullYear(), currentMonth, 1) 
    }
  })

  if (monthlyUsage >= userLimit.promptsPerMonth) {
    return res.status(429).json({ 
      error: 'Monthly limit exceeded',
      limit: userLimit.promptsPerMonth,
      used: monthlyUsage
    })
  }

  // Check models per test
  const requestedModels = req.body.models?.length || 0
  if (requestedModels > userLimit.modelsPerTest) {
    return res.status(400).json({
      error: 'Too many models requested',
      limit: userLimit.modelsPerTest,
      requested: requestedModels
    })
  }

  next()
}
```

---

## 🎉 Summary

### What You Get with OpenRouter:

1. **Single Integration**: One API for all LLMs
2. **Consistent Format**: Same request/response structure
3. **Easy Testing**: Test across 100+ models with same code
4. **Cost Tracking**: Monitor spending in one dashboard
5. **Future-Proof**: New models added regularly

### Perfect for Rankly Because:

- ✅ **Core feature is multi-LLM testing**
- ✅ **Need consistent metrics across platforms**
- ✅ **Easy to add new models as they launch**
- ✅ **Simplified billing for users**
- ✅ **Less code to maintain**

### Next Steps:

1. Sign up for OpenRouter
2. Implement `LLMService` class
3. Implement `BrandAnalysisService` class
4. Add test endpoint to API
5. Connect frontend to test prompts
6. Track metrics in analytics

**You're now ready to build a world-class multi-LLM GEO/AEO platform!** 🚀


