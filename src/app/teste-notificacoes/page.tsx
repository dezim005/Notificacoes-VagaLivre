"use client";
import { useState, useEffect } from 'react';

export default function TesteNotificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);

  // Função para buscar as notificações no seu banco (GET)
  const carregarNotificacoes = async () => {
    const resposta = await fetch('/api/notifications');
    const dados = await resposta.json();
    setNotificacoes(dados);
  };

  // Função para criar uma nova notificação (POST)
  const criarNotificacao = async () => {
    await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: "ebb9cd30-4366-46e0-8b4f-05986523f1fb", // <-- Substitua pelo ID que você gerou no Prisma Studio
        title: "Alerta do Front-end!",
        message: "Esta notificação foi criada clicando no botão da tela.",
        type: "ALERTA"
      })
    });
    carregarNotificacoes(); // Atualiza a lista na tela logo após criar
  };

  // Carrega a lista automaticamente ao abrir a página
  useEffect(() => {
    carregarNotificacoes();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Painel de Teste: Serviço de Notificações</h1>
      
      <button 
        onClick={criarNotificacao}
        style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}
      >
        + Gerar Nova Notificação
      </button>

      <h2>Suas Notificações:</h2>
      <ul>
        {notificacoes.length === 0 ? <p>Nenhuma notificação encontrada.</p> : null}
        
        {notificacoes.map((notif: any) => (
          <li key={notif.id} style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px', borderRadius: '5px' }}>
            <strong>{notif.title}</strong> - {notif.type}
            <p>{notif.message}</p>
            <small>Lida: {notif.isRead ? "Sim" : "Não"}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}