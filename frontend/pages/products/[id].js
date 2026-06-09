import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SiteHeader from '../../components/SiteHeader'
import { request } from '../../lib/api'
import { adicionarAoCarrinho } from '../../lib/carrinho'

const EMOJI_MAP = { 1: '💻', 2: '📚', 3: '🎮', 4: '🏠' }
const CATEGORY_COLORS = { 1: '#e8f4fd', 2: '#fdf6e8', 3: '#edf8ee', 4: '#fdeef8' }

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query

  const [product, setProduct] = useState(null)
  const [message, setMessage] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    if (!id) return
    const load = async () => {
      try {
        const data = await request(`/products/${id}`)
        setProduct(data)
        setMessage('')
      } catch (error) {
        setMessage(error.message || 'Falha ao carregar os dados do produto.')
      }
    }
    load()
  }, [id])

  const formatPrice = (v) => {
    const n = Number(v)
    if (Number.isNaN(n)) return '0,00'
    return n.toFixed(2).replace('.', ',')
  }

  const handleAddToCart = () => {
    if (!product) return
    adicionarAoCarrinho(product)
    setToastMsg(`"${product.NAME}" adicionado ao carrinho!`)
    setTimeout(() => setToastMsg(''), 3000)
  }

  if (!id) {
    return (
      <>
        <Head><title>Mercado Online - Produto</title></Head>
        <SiteHeader active="produto" />
        <main style={{ fontFamily: 'Arial, sans-serif', padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>Carregando...</main>
      </>
    )
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mercado Online - {product?.NAME || 'Produto'}</title>
      </Head>

      <SiteHeader active="produto" />

      {/* Toast */}
      {toastMsg && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
          backgroundColor: '#2e7d32', color: '#fff',
          padding: '14px 20px', borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', gap: '10px',
          fontSize: '14px', fontFamily: 'Arial, sans-serif',
        }}>
          ✅ {toastMsg} — <a href="/carrinho" style={{ color: '#fff', fontWeight: 'bold' }}>Ver Carrinho</a>
        </div>
      )}

      <main style={{ fontFamily: 'Arial, sans-serif', padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: '13px', color: '#888', marginBottom: '24px' }}>
          <a href="/" style={{ color: '#888', textDecoration: 'none' }}>Início</a> &rsaquo;{' '}
          <a href="/products" style={{ color: '#888', textDecoration: 'none' }}>Produtos</a> &rsaquo;{' '}
          <span style={{ color: '#333' }}>{product?.NAME || '...'}</span>
        </div>

        {message ? (
          <div style={{ margin: '0 0 24px 0', padding: 12, background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 8, color: '#856404' }}>
            ⚠️ {message}
          </div>
        ) : null}

        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Imagem do produto */}
          <div style={{ flex: '1', minWidth: '280px' }}>
            <div style={{
              height: '360px',
              backgroundColor: CATEGORY_COLORS[product?.CATEGORY_ID] || '#f5f5f5',
              border: '1px solid #eee', borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '120px', marginBottom: '16px',
            }}>
              {EMOJI_MAP[product?.CATEGORY_ID] || '📦'}
            </div>

            {/* Miniaturas */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ width: '72px', height: '72px', backgroundColor: '#f9f9f9', border: '1px solid #eee', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', cursor: 'pointer' }}>
                  {EMOJI_MAP[product?.CATEGORY_ID] || '📦'}
                </div>
              ))}
            </div>
          </div>

          {/* Informações do produto */}
          <div style={{ flex: '1', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h1 style={{ fontSize: '24px', margin: 0, lineHeight: '1.3', fontWeight: 'bold' }}>
              {product?.NAME || '...'}
            </h1>

            <div style={{ color: '#f4b400', fontSize: '18px', letterSpacing: '2px' }}>★★★★★</div>

            <div style={{ paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#222', marginBottom: '8px' }}>
                R$ {formatPrice(product?.PRICE)}
              </div>
              <div style={{ fontSize: '13px', color: '#27ae60', marginBottom: '4px' }}>
                ✓ Em estoque: {product?.STOCK ?? '...'} unidades
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#555' }}>
                <span style={{ border: '1px solid #aaa', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>%</span>
                Cupom disponível no checkout
              </div>
            </div>

            {/* Características */}
            <div>
              <h3 style={{ fontSize: '15px', margin: '0 0 12px 0', fontWeight: 'bold' }}>Características</h3>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '13px', lineHeight: '2', color: '#555' }}>
                <li>📦 Estoque: <strong>{product?.STOCK ?? '...'}</strong> unidades</li>
                <li>🏷️ Categoria: <strong>{product?.CATEGORY_ID ? `ID ${product.CATEGORY_ID}` : '...'}</strong></li>
                <li>🆔 Código do produto: <strong>#{product?.ID ?? '...'}</strong></li>
              </ul>
            </div>

            {/* Botões */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px', maxWidth: '380px' }}>
              <button
                onClick={() => alert('Redirecionando para checkout...')}
                style={{ backgroundColor: '#ed6c23', color: '#fff', fontSize: '16px', fontWeight: 'bold', border: 'none', borderRadius: '32px', padding: '14px 24px', cursor: 'pointer', width: '100%' }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#c95c1a'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#ed6c23'}
              >
                ⚡ Comprar Agora
              </button>

              <button
                onClick={handleAddToCart}
                style={{ backgroundColor: '#fff', color: '#ed6c23', fontSize: '16px', fontWeight: 'bold', border: '2px solid #ed6c23', borderRadius: '32px', padding: '13px 24px', cursor: 'pointer', width: '100%' }}
                onMouseOver={e => { e.currentTarget.style.backgroundColor = '#fff5f0' }}
                onMouseOut={e => { e.currentTarget.style.backgroundColor = '#fff' }}
              >
                🛒 Adicionar ao Carrinho
              </button>

              <a
                href="/carrinho"
                style={{ textAlign: 'center', fontSize: '13px', color: '#888', textDecoration: 'none' }}
              >
                Ver carrinho →
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid #eee', padding: '40px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '1200px', margin: '40px auto 0', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ flex: '1', minWidth: '250px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '24px' }}>🛒</span>
              <div><span style={{ color: '#0070cc' }}>Mercado</span><br /><span style={{ color: '#ff6600' }}>Online</span></div>
            </div>
          </div>
          <p style={{ fontSize: '11px', color: '#666', marginBottom: '24px' }}>Tudo o que você precisa, de forma simples e online.</p>
        </div>
      </footer>
    </>
  )
}
