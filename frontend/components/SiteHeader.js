import React, { useEffect, useState } from 'react'

export default function SiteHeader({ cartHref = '/carrinho', loginHref = '/login', active = '' }) {
  const [cartCount, setCartCount] = useState(0)

  // Lê o contador do carrinho do localStorage e atualiza em tempo real
  useEffect(() => {
    const updateCount = () => {
      try {
        const stored = localStorage.getItem('carrinho')
        const items = stored ? JSON.parse(stored) : []
        const total = items.reduce((acc, i) => acc + (i.QUANTITY || 1), 0)
        setCartCount(total)
      } catch {
        setCartCount(0)
      }
    }
    updateCount()
    window.addEventListener('carrinho-atualizado', updateCount)
    window.addEventListener('storage', updateCount)
    return () => {
      window.removeEventListener('carrinho-atualizado', updateCount)
      window.removeEventListener('storage', updateCount)
    }
  }, [])

  const linkStyle = (key) => ({
    color: '#fff',
    textDecoration: 'none',
    fontWeight: active === key ? 'bold' : 'normal',
    fontSize: '14px',
    borderBottom: active === key ? '2px solid #fff' : '2px solid transparent',
    paddingBottom: '2px',
  })

  return (
    <header style={{ fontFamily: 'Arial, sans-serif', width: '100%' }}>
      {/* Barra superior preta */}
      <div style={{ backgroundColor: '#000', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => (window.location.href = '/')}>
          <div style={{ color: '#00a8ff', fontSize: '24px', fontWeight: 'bold', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '32px' }}>🛒</span>
            <div>
              <span style={{ color: '#0070cc' }}>Mercado</span>
              <br />
              <span style={{ color: '#ff6600' }}>Online</span>
            </div>
          </div>
        </div>

        {/* Barra de busca */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 24px' }}>
          <input
            type="text"
            placeholder="Buscar produtos..."
            style={{ padding: '10px 16px', width: '100%', maxWidth: '600px', borderRadius: '20px', border: 'none', outline: 'none', fontSize: '16px' }}
          />
        </div>

        {/* Ações: Carrinho + Login */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '150px', justifyContent: 'flex-end' }}>
          {/* Ícone carrinho com badge */}
          <a href={cartHref} style={{ position: 'relative', textDecoration: 'none', fontSize: '28px' }} title="Carrinho">
            🛒
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '-6px', right: '-8px',
                backgroundColor: '#ed6c23', color: '#fff',
                borderRadius: '50%', width: '20px', height: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 'bold',
              }}>
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </a>

          <a
            href={loginHref}
            style={{ backgroundColor: '#ed6c23', color: '#fff', fontWeight: 'bold', borderRadius: '24px', padding: '10px 16px', textDecoration: 'none', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
          >
            🔐 Login
          </a>
        </div>
      </div>

      {/* Barra de navegação laranja */}
      <div style={{ backgroundColor: '#ff6600', padding: '12px 24px', display: 'flex', justifyContent: 'center', gap: '40px', borderBottom: '4px solid #cc5200' }}>
        <a href="/" style={linkStyle('inicio')}>Início</a>
        <a href="/products" style={linkStyle('produto')}>Produtos</a>
        <a href={cartHref} style={linkStyle('carrinho')}>Carrinho {cartCount > 0 && <span style={{ backgroundColor: '#fff', color: '#ff6600', borderRadius: '50%', padding: '0 5px', fontSize: '11px', fontWeight: 'bold', marginLeft: '4px' }}>{cartCount}</span>}</a>
        <a href="/faq" style={linkStyle('faq')}>FAQ</a>
        <a href={loginHref} style={linkStyle('login')}>Login</a>
      </div>
    </header>
  )
}
