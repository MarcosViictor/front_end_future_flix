// Carrega a URL da API a partir das variáveis de ambiente do Vite em produção,
// com fallback automático para o servidor local em desenvolvimento.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Função utilitária para realizar requisições HTTP para o backend FastAPI.
 * Anexa automaticamente o Bearer Token salvo no localStorage para autenticação.
 */
export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail || `Erro na requisição: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  // Para requisições sem conteúdo de resposta (como 204 No Content), evita o erro de parse JSON
  if (response.status === 204) {
    return null;
  }

  return response.json();
}
