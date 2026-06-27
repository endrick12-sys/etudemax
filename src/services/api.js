// API service configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = {
  payment: {
    submitProof: (data) =>
      fetch(`${API_URL}/payment/submit-proof`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(r => r.json()),
    
    checkStatus: (transactionId) =>
      fetch(`${API_URL}/payment/status/${transactionId}`)
        .then(r => r.json()),
  },

  study: {
    generateFlashcards: (image) =>
      fetch(`${API_URL}/study/flashcards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      }).then(r => r.json()),
    
    generateQuiz: (image) =>
      fetch(`${API_URL}/study/quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      }).then(r => r.json()),
    
    generatePlan: (image) =>
      fetch(`${API_URL}/study/plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      }).then(r => r.json()),
  },

  user: {
    getProgress: (userId) =>
      fetch(`${API_URL}/user/${userId}/progress`)
        .then(r => r.json()),
    
    updateProgress: (userId, progress) =>
      fetch(`${API_URL}/user/${userId}/progress`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(progress),
      }).then(r => r.json()),
  },
};

export default api;
