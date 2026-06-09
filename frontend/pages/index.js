import Head from 'next/head'
import { useEffect, useState } from 'react'
import { request } from '../lib/api'
import { adicionarAoCarrinho } from '../lib/carrinho'
import SiteHeader from '../components/SiteHeader'

// Imagens para representar os produtos por categoria
// Arquivos em: frontend/public/images/
const IMAGE_BY_CATEGORY_ID = {
  1: '/images/monitor_24.jpg', // Games/Tecnologia
  2: '/images/livro_cleancode.jpg', // Livros
  3: '/images/console_1tb.jpg', // Games
  4: '/images/luminaria.jpg', // Casa e Decoração
}


const CATEGORY_COLORS = {
  1: '#e8f4fd',
  2: '#fdf6e8',
  3: '#edf8ee',
  4: '#fdeef8',
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #eee', padding: '40px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ flex: '1', minWidth: '250px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '24px' }}>🛒</span>
            <div>
              <span style={{ color: '#0070cc' }}>Mercado</span><br />
              <span style={{ color: '#ff6600' }}>Online</span>
            </div>
          </div>
        </div>
        <p style={{ fontSize: '11px', color: '#666', marginBottom: '24px' }}>Tudo o que você precisa, de forma simples e online.</p>
        <div style={{ display: 'flex', gap: '16px', color: '#999', fontSize: '18px' }}>
          <span style={{ cursor: 'pointer' }}>📷</span>
          <span style={{ cursor: 'pointer' }}>🔗</span>
          <span style={{ cursor: 'pointer' }}>✖️</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '64px', fontSize: '11px', color: '#555' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
          <a href="#" style={{ textDecoration: 'none', color: '#555' }}>Condições de Pagamento</a>
          <a href="#" style={{ textDecoration: 'none', color: '#555' }}>Seguro Produto</a>
          <a href="#" style={{ textDecoration: 'none', color: '#555' }}>Frete Grátis</a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <strong style={{ color: '#000', marginBottom: '4px' }}>Saiba Mais</strong>
          <a href="#" style={{ textDecoration: 'none', color: '#555' }}>Blog</a>
          <a href="#" style={{ textDecoration: 'none', color: '#555' }}>Histórias de sucesso</a>
          <a href="#" style={{ textDecoration: 'none', color: '#555' }}>Seja um vendedor</a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <strong style={{ color: '#000', marginBottom: '4px' }}>Atendimento</strong>
          <a href="#" style={{ textDecoration: 'none', color: '#555' }}>Contato</a>
          <a href="#" style={{ textDecoration: 'none', color: '#555' }}>Suporte</a>
          <a href="#" style={{ textDecoration: 'none', color: '#555' }}>Legal</a>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  const load = async () => {
    try {
      const data = await request('/products')
      setProducts(data)
      setMessage('')
    } catch (error) {
      setMessage(error.message || 'Falha ao carregar produtos.')
    }
  }

  useEffect(() => { load() }, [])

  const handleAddToCart = (produto) => {
    adicionarAoCarrinho(produto)
    setToastMsg(`"${produto.NAME}" adicionado ao carrinho!`)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // Mostrar no máximo 6 produtos em destaque
  const destaques = products.slice(0, 6)

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mercado Online - Início</title>
      </Head>

      <SiteHeader active="inicio" />

      {/* Toast de confirmação */}
      {toastMsg && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
          backgroundColor: '#2e7d32', color: '#fff',
          padding: '14px 20px', borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', gap: '10px',
          fontSize: '14px', fontFamily: 'Arial, sans-serif',
          animation: 'fadeIn 0.3s ease',
        }}>
          ✅ {toastMsg}
        </div>
      )}

      {/* Banner hero */}
      <div style={{ background: 'linear-gradient(135deg, #ff6600 0%, #cc4400 100%)', padding: '48px 24px', textAlign: 'center', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ fontSize: '36px', margin: '0 0 12px 0', fontWeight: 'bold' }}>Bem-vindo ao Mercado Online</h1>
        <p style={{ fontSize: '16px', margin: '0 0 24px 0', opacity: 0.9 }}>Os melhores produtos com os melhores preços</p>
        <a href="/products" style={{ backgroundColor: '#fff', color: '#ff6600', fontWeight: 'bold', padding: '12px 28px', borderRadius: '24px', textDecoration: 'none', fontSize: '15px', display: 'inline-block' }}>
          Ver todos os produtos →
        </a>
      </div>

      <main style={{ fontFamily: 'Arial', padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>

        {message && (
          <div style={{ margin: '0 0 24px 0', padding: 12, background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 8, color: '#856404' }}>
            ⚠️ {message} — Verifique se o backend está rodando.
          </div>
        )}

        <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px' }}>Produtos em Destaque</h2>
        <p style={{ color: '#666', marginBottom: '32px', fontSize: '14px' }}>Selecionados especialmente para você</p>

        {destaques.length === 0 && !message && (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: '#aaa' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
            <p>Carregando produtos...</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {destaques.map((p) => (
            <div key={p.ID} style={{
              border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex', flexDirection: 'column', backgroundColor: '#fff',
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)' }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              {/* Área da imagem */}
              <a href={`/products/${p.ID}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  height: '200px',
                  backgroundColor: CATEGORY_COLORS[p.CATEGORY_ID] || '#f5f5f5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '72px',
                }}>
                  <img
                    src={IMAGE_BY_CATEGORY_ID[p.CATEGORY_ID] || '/images/quadro_abstrato.jpg'}
                    alt={p.CATEGORY_NAME || 'Produto'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />

                </div>
              </a>

              {/* Informações do produto */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <span style={{ fontSize: '11px', color: '#ff6600', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {p.CATEGORY_NAME || 'Produto'}
                </span>
                <a href={`/products/${p.ID}`} style={{ textDecoration: 'none', color: '#000' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, lineHeight: '1.4' }}>{p.NAME}</h3>
                </a>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '12px' }}>
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#222' }}>
                      R$ {Number(p.PRICE).toFixed(2).replace('.', ',')}
                    </div>
                    <div style={{ fontSize: '11px', color: '#27ae60' }}>
                      Em estoque: {p.STOCK} un.
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(p)}
                  style={{
                    marginTop: '12px',
                    backgroundColor: '#ed6c23',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '24px',
                    padding: '10px 16px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#c95c1a'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#ed6c23'}
                >
                  🛒 Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Link para ver todos */}
        {products.length > 6 && (
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <a href="/products" style={{ backgroundColor: '#ff6600', color: '#fff', padding: '12px 32px', borderRadius: '24px', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' }}>
              Ver todos os {products.length} produtos →
            </a>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
