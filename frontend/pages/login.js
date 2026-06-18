import Head from 'next/head'
import { useState } from 'react'
import { request } from '../lib/api'
import SiteHeader from '../components/SiteHeader'

export default function Login() {
  // Mantendo o padrão de formulário para integração
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
  try {
    const response = await fetch(
      'http://localhost:8000/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.ERROR);
    }

    localStorage.setItem(
      'usuario',
      JSON.stringify(data.USER)
    );

    setMessage('Login realizado com sucesso!');

    setTimeout(() => {
      window.location.href = '/';
    }, 1000);

  } catch (err) {
    setMessage(err.message);
  }
};

  // Estilos reutilizáveis para manter o código limpo
  const inputStyle = {
    backgroundColor: '#111',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    padding: '16px 24px',
    width: '100%',
    maxWidth: '300px',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box'
  }

  const buttonStyle = {
    ...inputStyle,
    cursor: 'pointer',
    fontWeight: 'bold',
    textAlign: 'center',
    transition: 'background-color 0.2s',
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Next MPA - Login</title>
      </Head>

      {/* Container principal ocupando 100% da altura da tela */}
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Arial, sans-serif' }}>
        
      <SiteHeader active="login" />

      {/* CONTEÚDO PRINCIPAL (Fundo Laranja) */}
        <main style={{ 
          flex: 1, 
          background: 'linear-gradient(180deg, #ff7700 0%, #b34700 100%)', // Gradiente simulando a imagem
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '24px'
        }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
            
            {message && (
              <div style={{ padding: '12px', background: '#fff', color: '#000', borderRadius: '8px', maxWidth: '300px', textAlign: 'center', fontWeight: 'bold' }}>
                {message}
              </div>
            )}

            {/* Inputs */}
            <input 
              type="email" 
              placeholder="E-mail..." 
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={inputStyle} 
            />
            
            <input
                type="password"
                placeholder="Senha..."
                value={form.senha}
                onChange={e => setForm({ ...form, senha: e.target.value })}
                style={inputStyle}
              />

            {/* Esqueci a senha */}
            <div style={{ width: '100%', maxWidth: '300px', textAlign: 'left', paddingLeft: '16px' }}>
              <a href="/esqueci-senha" style={{ color: '#000', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
                Esqueci a senha
              </a>
            </div>

            <div style={{ height: '16px' }}></div> {/* Espaçador */}

            {/* Botões */}
            <button 
              onClick={handleLogin}
              style={buttonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#111'}
            >
              Entrar
            </button>

            <button 
              onClick={() => window.location.href = '/cadastro'}
              style={buttonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#111'}
            >
              Cadastrar-se
            </button>

          </div>
        </main>
      </div>
    </>
  )
}