const API_BASE_URL = 'http://localhost:5000/api'

class ApiService {
  constructor() {
    this.token = localStorage.getItem('authToken')
  }

  setToken(token) {
    this.token = token
    localStorage.setItem('authToken', token)
  }

  clearToken() {
    this.token = null
    localStorage.removeItem('authToken')
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    }
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }
    
    return headers
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: this.getHeaders(),
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'API request failed')
      }

      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async getCurrentUser() {
    return this.request('/auth/me')
  }

  async verifyEmail(token) {
    return this.request('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    })
  }

  async refreshToken(refreshToken) {
    return this.request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    })
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    })
  }

  // Onboarding endpoints
  async getOnboardingData() {
    return this.request('/onboarding')
  }

  async updateOnboardingStep(stepNumber, data) {
    return this.request(`/onboarding/step/${stepNumber}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async updateOnboardingBulk(data) {
    return this.request('/onboarding/bulk', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async resetOnboarding() {
    return this.request('/onboarding/reset', {
      method: 'POST',
    })
  }
}

export default new ApiService()
