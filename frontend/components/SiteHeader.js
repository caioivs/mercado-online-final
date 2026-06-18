import React, { useEffect, useState } from 'react'

export default function SiteHeader({
  cartHref = '/carrinho',
  loginHref = '/login',
  active = ''
}) {
  const [cartCount, setCartCount] = useState(0)
  const [usuario, setUsuario] = useState(null)
  const [search, setSearch] = useState('')

  // Carrinho
  useEffect(() => {
    const updateCount = () => {
      try {
        const stored = localStorage.getItem('carrinho')
        const items = stored ? JSON.parse(stored) : []

        const total = items.reduce(
          (acc, i) => acc + (i.QUANTITY || 1),
          0
        )

        setCartCount(total)
      } catch {
        setCartCount(0)
      }
    }

    updateCount()

    window.addEventListener(
      'carrinho-atualizado',
      updateCount
    )

    window.addEventListener(
      'storage',
      updateCount
    )

    return () => {
      window.removeEventListener(
        'carrinho-atualizado',
        updateCount
      )

      window.removeEventListener(
        'storage',
        updateCount
      )
    }
  }, [])

  // Usuário logado
  useEffect(() => {
    const dados = localStorage.getItem('usuario')

    if (dados) {
      try {
        setUsuario(JSON.parse(dados))
      } catch {
        setUsuario(null)
      }
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('usuario')
    setUsuario(null)
    window.location.href = '/'
  }

  const linkStyle = (key) => ({
    color: '#fff',
    textDecoration: 'none',
    fontWeight: active === key ? 'bold' : 'normal',
    fontSize: '14px',
    borderBottom:
      active === key
        ? '2px solid #fff'
        : '2px solid transparent',
    paddingBottom: '2px'
  })

  return (
    <header
      style={{
        fontFamily: 'Arial, sans-serif',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Barra superior preta */}
      <div
        style={{
          backgroundColor: '#000',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={() => (window.location.href = '/')}
        >
          <div
            style={{
              color: '#00a8ff',
              fontSize: '24px',
              fontWeight: 'bold',
              fontStyle: 'italic',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '32px' }}>🛒</span>

            <div>
              <span style={{ color: '#0070cc' }}>
                Mercado
              </span>
              <br />
              <span style={{ color: '#ff6600' }}>
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Busca */}
        <div
  style={{
    display: 'flex',
    width: '100%',
    maxWidth: '600px'
  }}
>
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            window.location.href =
              `/products?search=${encodeURIComponent(search)}`
          }
        }}
              style={{
                padding: '10px 16px',
                width: '100%',
                borderRadius: '20px 0 0 20px',
                border: 'none',
                outline: 'none',
                fontSize: '16px'
              }}
            />

            <button
              onClick={() => {
                window.location.href =
                  `/products?search=${encodeURIComponent(search)}`
              }}
              style={{
                border: 'none',
                backgroundColor: '#ed6c23',
                color: '#fff',
                padding: '0 18px',
                cursor: 'pointer',
                borderRadius: '0 20px 20px 0',
                fontSize: '18px'
              }}
            >
              🔍
            </button>
          </div>

        {/* Carrinho + Login */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            minWidth: '150px',
            justifyContent: 'flex-end'
          }}
        >
          {/* Carrinho */}
          <a
            href={cartHref}
            style={{
              position: 'relative',
              textDecoration: 'none',
              fontSize: '28px'
            }}
            title="Carrinho"
          >
            🛒

            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-8px',
                  backgroundColor: '#ed6c23',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}
              >
                {cartCount > 99
                  ? '99+'
                  : cartCount}
              </span>
            )}
          </a>

          {usuario ? (
            <>
              <span
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                Olá, {usuario.nome}
              </span>

              <button
                onClick={logout}
                style={{
                  backgroundColor: '#ed6c23',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '10px 16px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Sair
              </button>
            </>
          ) : (
            <a
              href={loginHref}
              style={{
                backgroundColor: '#ed6c23',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '24px',
                padding: '10px 16px',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              🔐 Login
            </a>
          )}
        </div>
      </div>

      {/* Barra inferior */}
      <div
        style={{
          backgroundColor: '#ff6600',
          padding: '12px 32px',
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          borderBottom: '4px solid #cc5200',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <a href="/" style={linkStyle('inicio')}>
          Início
        </a>

        <a
          href="/products"
          style={linkStyle('produto')}
        >
          Produtos
        </a>

        <a
          href={cartHref}
          style={linkStyle('carrinho')}
        >
          Carrinho

          {cartCount > 0 && (
            <span
              style={{
                backgroundColor: '#fff',
                color: '#ff6600',
                borderRadius: '50%',
                padding: '0 5px',
                fontSize: '11px',
                fontWeight: 'bold',
                marginLeft: '4px'
              }}
            >
              {cartCount}
            </span>
          )}
        </a>

        <a href="/faq" style={linkStyle('faq')}>
          FAQ
        </a>

        {usuario ? (
          <span
            style={{
              color: '#fff',
              fontWeight: 'bold'
            }}
          >
            {usuario.nome}
          </span>
        ) : (
          <a
            href={loginHref}
            style={linkStyle('login')}
          >
            Login
          </a>
        )}
      </div>
    </header>
  )
}