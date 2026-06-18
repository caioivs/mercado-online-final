import Head from 'next/head'
import { useState } from 'react'
import SiteHeader from '../components/SiteHeader'

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: ''
  })

  const [message, setMessage] = useState('')

  const cadastrar = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/api/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.ERROR)
      }

      setMessage('Usuário cadastrado com sucesso!')

      setTimeout(() => {
        window.location.href = '/login'
      }, 1500)

    } catch (err) {
      setMessage(err.message)
    }
  }

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
    transition: 'background-color 0.2s'
  }

  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <SiteHeader active="login" />

        <main
          style={{
            flex: 1,
            background:
              'linear-gradient(180deg, #ff7700 0%, #b34700 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              width: '100%'
            }}
          >
            {message && (
              <div
                style={{
                  padding: '12px',
                  background: '#fff',
                  color: '#000',
                  borderRadius: '8px',
                  maxWidth: '300px',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
              >
                {message}
              </div>
            )}

            <h1
              style={{
                color: '#fff',
                marginBottom: '10px'
              }}
            >
              Cadastro
            </h1>

            <input
              type="text"
              placeholder="Nome..."
              value={form.nome}
              onChange={(e) =>
                setForm({
                  ...form,
                  nome: e.target.value
                })
              }
              style={inputStyle}
            />

            <input
              type="email"
              placeholder="E-mail..."
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Senha..."
              value={form.senha}
              onChange={(e) =>
                setForm({
                  ...form,
                  senha: e.target.value
                })
              }
              style={inputStyle}
            />

            <div style={{ height: '16px' }} />

            <button
              onClick={cadastrar}
              style={buttonStyle}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = '#333')
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = '#111')
              }
            >
              Cadastrar
            </button>

            <button
              onClick={() =>
                (window.location.href = '/login')
              }
              style={buttonStyle}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = '#333')
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = '#111')
              }
            >
              Voltar para Login
            </button>
          </div>
        </main>
      </div>
    </>
  )
}