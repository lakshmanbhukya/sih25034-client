// API Service for Backend Communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  // Get headers for API requests
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Generic API request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    console.log('🌐 API Request:', {
      url,
      method: config.method || 'GET',
      headers: config.headers,
      hasBody: !!config.body
    });

    try {
      const response = await fetch(url, config);
      
      console.log('📡 API Response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });
      
      const data = await response.json();

      if (!response.ok) {
        console.error('❌ API Error Response:', data);
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      console.log('✅ API Success Response:', data);
      return data;
    } catch (error) {
      console.error('❌ API Request failed:', {
        url,
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Database status
  async dbStatus() {
    return this.request('/db-status');
  }

  // Redis status
  async redisStatus() {
    return this.request('/redis-status');
  }

  // User Authentication
  async register(userData) {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    const response = await this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async updateProfile(profileData) {
    return this.request('/users/profile/update', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }

  // Recommendations
  async getRecommendations(maxDistance = 150) {
    return this.request('/recommendations/recommend', {
      method: 'POST',
      body: JSON.stringify({ max_distance_km: maxDistance }),
    });
  }

  async getInternships(page = 1) {
    return this.request(`/recommendations/internships?page=${page}`);
  }

  async getRecommendedInternships() {
    return this.request('/recommendations/internships/recommended');
  }

  async getInternshipById(id) {
    return this.request(`/recommendations/internships/${id}`);
  }

  async clearCache() {
    return this.request('/recommendations/cache/clear', {
      method: 'DELETE',
    });
  }

  async searchInternships(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/recommendations/search?${query}`);
  }

  // Logout
  logout() {
    this.setToken(null);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
