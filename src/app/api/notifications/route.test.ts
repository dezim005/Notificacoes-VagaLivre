import { describe, it, expect } from 'vitest';
import { GET } from './route';

describe('Serviço de Notificações - API', () => {
  
  it('Deve retornar status 200 ao listar notificações', async () => {
    // 1. Simula a chamada para a sua função GET
    const response = await GET();

    // 2. Verifica se a resposta foi de sucesso (200)
    expect(response.status).toBe(200);

    // 3. Converte a resposta para JSON para verificar os dados
    const data = await response.json();
    
    // 4. Espera que o resultado seja uma lista (array)
    expect(Array.isArray(data)).toBe(true);
  });

});
