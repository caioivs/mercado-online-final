import Head from 'next/head'
import { useEffect, useState } from 'react'
import { request } from '../lib/api'
import { adicionarAoCarrinho } from '../lib/carrinho'
import SiteHeader from '../components/SiteHeader'

const EMOJI_MAP = {
  1: '💻',
  2: '📚',
  3: '🎮',
  4: '🏠',
}

// Retorna o caminho da imagem do produto

const getProductImage = (product) => {
  if (product?.IMAGEM) return `/images/${product.IMAGEM}`
  const fallback = {
    1: '/images/monitor_24.jpg',
    2: '/images/livro_cleancode.jpg',
    3: '/images/console_1tb.jpg',
    4: '/images/luminaria.jpg',
  }
  return fallback[product?.CATEGORY_ID] || '/images/quadro_abstrato.jpg'
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
            <div><span style={{ color: '#0070cc' }}>Mercado</span><br /><span style={{ color: '#ff6600' }}>Online</span></div>
          </div>
        </div>
        <p style={{ fontSize: '11px', color: '#666', marginBottom: '24px' }}>Tudo o que você precisa, de forma simples e online.</p>
        <div style={{ display: 'flex', gap: '16px', color: '#999', fontSize: '18px' }}>
          <span style={{ cursor: 'pointer' }}>📷</span><span style={{ cursor: 'pointer' }}>🔗</span><span style={{ cursor: 'pointer' }}>✖️</span>
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

export default function ProductsIndex() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [message, setMessage] = useState('')
  const [toastMsg, setToastMsg] = useState('')
  const [busca, setBusca] = useState('')

  const load = async () => {
    try {
      const [prodData, catData] = await Promise.all([
        request('/products'),
        request('/categories'),
      ])
      setProducts(prodData)
      setCategories(catData)
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

  // Filtro por categoria e busca
  const produtosFiltrados = products.filter(p => {
    const categoriaOk = selectedCategory === 'todos' || String(p.CATEGORY_ID) === String(selectedCategory)
    const buscaOk = p.NAME.toLowerCase().includes(busca.toLowerCase())
    return categoriaOk && buscaOk
  })

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mercado Online - Produtos</title>
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
          ✅ {toastMsg}
        </div>
      )}

      <main style={{ fontFamily: 'Arial', padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        {message && (
          <div style={{ margin: '0 0 24px 0', padding: 12, background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 8, color: '#856404' }}>
            ⚠️ {message} — Verifique se o backend está rodando.
          </div>
        )}

        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>Produtos</h1>
        <p style={{ color: '#666', marginBottom: '28px', fontSize: '14px' }}>
          {produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? 's' : ''} encontrado{produtosFiltrados.length !== 1 ? 's' : ''}
        </p>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '32px', padding: '16px', backgroundColor: '#f8f8f8', borderRadius: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#555' }}>Filtrar por:</span>

          {/* Filtro de categoria */}
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            style={{
              padding: '8px 16px', borderRadius: '20px', border: '2px solid #ff6600',
              fontSize: '14px', cursor: 'pointer', backgroundColor: '#fff',
              color: '#333', outline: 'none', fontFamily: 'Arial',
            }}
          >
            <option value="todos">🏪 Todas as Categorias</option>
            {categories.map(cat => (
              <option key={cat.ID} value={cat.ID}>
                {EMOJI_MAP[cat.ID] || '📦'} {cat.NAME}
              </option>
            ))}
          </select>

          {/* Busca por nome */}
          <input
            type="text"
            placeholder="🔍 Buscar produto..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            style={{
              padding: '8px 16px', borderRadius: '20px', border: '2px solid #ddd',
              fontSize: '14px', outline: 'none', fontFamily: 'Arial',
              minWidth: '200px',
            }}
          />

          {/* Botão limpar filtros */}
          {(selectedCategory !== 'todos' || busca) && (
            <button
              onClick={() => { setSelectedCategory('todos'); setBusca('') }}
              style={{
                padding: '8px 16px', borderRadius: '20px', border: '1px solid #aaa',
                fontSize: '13px', cursor: 'pointer', backgroundColor: '#fff', color: '#555',
              }}
            >
              ✕ Limpar filtros
            </button>
          )}

          {/* Chips de categorias rápidas */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginLeft: '8px' }}>
            {categories.map(cat => (
              <button
                key={cat.ID}
                onClick={() => setSelectedCategory(String(cat.ID) === String(selectedCategory) ? 'todos' : cat.ID)}
                style={{
                  padding: '6px 14px', borderRadius: '20px', border: '2px solid',
                  borderColor: String(selectedCategory) === String(cat.ID) ? '#ff6600' : '#ddd',
                  backgroundColor: String(selectedCategory) === String(cat.ID) ? '#ff6600' : '#fff',
                  color: String(selectedCategory) === String(cat.ID) ? '#fff' : '#555',
                  fontSize: '12px', cursor: 'pointer', fontWeight: 'bold',
                  transition: 'all 0.2s',
                }}
              >
                {EMOJI_MAP[cat.ID] || '📦'} {cat.NAME}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de produtos */}
        {produtosFiltrados.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: '#aaa' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <p style={{ fontSize: '16px' }}>Nenhum produto encontrado para este filtro.</p>
            <button
              onClick={() => { setSelectedCategory('todos'); setBusca('') }}
              style={{ marginTop: '16px', padding: '10px 24px', borderRadius: '20px', border: 'none', backgroundColor: '#ff6600', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Ver todos os produtos
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            {produtosFiltrados.map((p) => (
              <div
                key={p.ID}
                style={{
                  border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'transform 0.2s, box-shadow 0.2s',
                  display: 'flex', flexDirection: 'column', backgroundColor: '#fff',
                }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)' }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)' }}
              >
                <a href={`/products/${p.ID}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    height: '180px',
                    backgroundColor: CATEGORY_COLORS[p.CATEGORY_ID] || '#f5f5f5',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={getProductImage(p)}
                      alt={p.NAME}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </a>

                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                  <span style={{ fontSize: '11px', color: '#ff6600', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {p.CATEGORY_NAME || 'Produto'}
                  </span>
                  <a href={`/products/${p.ID}`} style={{ textDecoration: 'none', color: '#000' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, lineHeight: '1.4' }}>{p.NAME}</h3>
                  </a>
                  <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#222', marginBottom: '4px' }}>
                      R$ {Number(p.PRICE).toFixed(2).replace('.', ',')}
                    </div>
                    <div style={{ fontSize: '11px', color: p.STOCK > 0 ? '#27ae60' : '#e53935' }}>
                      {p.STOCK > 0 ? `✓ Em estoque: ${p.STOCK} un.` : '✗ Fora de estoque'}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(p)}
                    disabled={p.STOCK === 0}
                    style={{
                      marginTop: '12px',
                      backgroundColor: p.STOCK === 0 ? '#ccc' : '#ed6c23',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '24px',
                      padding: '10px 16px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      cursor: p.STOCK === 0 ? 'not-allowed' : 'pointer',
                      width: '100%',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseOver={e => { if (p.STOCK > 0) e.currentTarget.style.backgroundColor = '#c95c1a' }}
                    onMouseOut={e => { if (p.STOCK > 0) e.currentTarget.style.backgroundColor = '#ed6c23' }}
                  >
                    {p.STOCK === 0 ? '✗ Indisponível' : '🛒 Adicionar ao Carrinho'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
