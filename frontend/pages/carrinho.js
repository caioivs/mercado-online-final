import Head from 'next/head'
import { useEffect, useState } from 'react'
import SiteHeader from '../components/SiteHeader'
import { getCarrinho, removerDoCarrinho, atualizarQuantidade, toggleSelecionado } from '../lib/carrinho'

const EMOJI_MAP = { 1: '💻', 2: '📚', 3: '🎮', 4: '🏠' }

// Retorna o caminho da imagem do produto (imagem específica ou fallback por categoria)
const getProductImage = (item) => {
  if (item?.IMAGEM) return `/images/${item.IMAGEM}`
  const fallback = {
    1: '/images/monitor_24.jpg',
    2: '/images/livro_cleancode.jpg',
    3: '/images/console_1tb.jpg',
    4: '/images/luminaria.jpg',
  }
  return fallback[item?.CATEGORY_ID] || '/images/quadro_abstrato.jpg'
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

export default function Carrinho() {
  const [cartItems, setCartItems] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setCartItems(getCarrinho())
    setLoaded(true)
  }, [])

  const handleRemove = (id) => {
    setCartItems(removerDoCarrinho(id))
  }

  const handleQuantity = (id, qty) => {
    setCartItems(atualizarQuantidade(id, qty))
  }

  const handleToggle = (id) => {
    setCartItems(toggleSelecionado(id))
  }

  const handleToggleAll = () => {
    const todosSelected = cartItems.every(i => i.SELECTED)
    const newItems = cartItems.map(i => ({ ...i, SELECTED: !todosSelected }))
    setCartItems(newItems)
    const { salvarCarrinho } = require('../lib/carrinho')
    salvarCarrinho(newItems)
  }

  const itensSelecionados = cartItems.filter(i => i.SELECTED)
  const total = itensSelecionados.reduce((acc, i) => acc + (Number(i.PRICE) * (i.QUANTITY || 1)), 0)
  const totalItens = itensSelecionados.reduce((acc, i) => acc + (i.QUANTITY || 1), 0)

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mercado Online - Carrinho</title>
      </Head>

      <SiteHeader active="carrinho" />

      <main style={{ fontFamily: 'Arial, sans-serif', padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>

        <h1 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '32px' }}>
          🛒 Meu Carrinho {cartItems.length > 0 && <span style={{ fontSize: '16px', color: '#888', fontWeight: 'normal' }}>({cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'})</span>}
        </h1>

        {!loaded ? (
          <p style={{ color: '#aaa' }}>Carregando carrinho...</p>
        ) : cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: '#aaa' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
            <h2 style={{ fontSize: '20px', color: '#555', marginBottom: '8px' }}>Seu carrinho está vazio</h2>
            <p style={{ fontSize: '14px', marginBottom: '24px' }}>Adicione produtos para continuar comprando</p>
            <a
              href="/products"
              style={{ backgroundColor: '#ed6c23', color: '#fff', padding: '12px 28px', borderRadius: '24px', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' }}
            >
              Ver Produtos
            </a>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'flex-start' }}>

            {/* Lista de itens */}
            <div style={{ flex: '2', minWidth: '300px' }}>
              {/* Cabeçalho com "selecionar todos" */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '2px solid #eee', marginBottom: '8px' }}>
                <input
                  type="checkbox"
                  checked={cartItems.every(i => i.SELECTED)}
                  onChange={handleToggleAll}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '13px', color: '#555', fontWeight: 'bold' }}>
                  Selecionar todos ({cartItems.length})
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {cartItems.map(item => (
                  <div
                    key={item.ID}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '16px',
                      padding: '20px 0', borderBottom: '1px solid #f0f0f0',
                      flexWrap: 'wrap',
                      opacity: item.SELECTED ? 1 : 0.5,
                    }}
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={!!item.SELECTED}
                      onChange={() => handleToggle(item.ID)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer', flexShrink: 0 }}
                    />

                    {/* Imagem do produto */}
                    <div style={{
                      width: '80px', height: '80px', flexShrink: 0,
                      backgroundColor: '#f5f5f5',
                      border: '1px solid #eee', borderRadius: '8px',
                      overflow: 'hidden',
                    }}>
                      <img
                        src={getProductImage(item)}
                        alt={item.NAME}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={e => {
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.parentElement.style.display = 'flex'
                          e.currentTarget.parentElement.style.alignItems = 'center'
                          e.currentTarget.parentElement.style.justifyContent = 'center'
                          e.currentTarget.parentElement.style.fontSize = '36px'
                          e.currentTarget.parentElement.innerHTML = EMOJI_MAP[item.CATEGORY_ID] || '📦'
                        }}
                      />
                    </div>

                    {/* Nome + Controle de quantidade */}
                    <div style={{ flex: '1', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <a href={`/products/${item.ID}`} style={{ textDecoration: 'none', color: '#000' }}>
                        <strong style={{ fontSize: '14px', lineHeight: '1.4' }}>{item.NAME}</strong>
                      </a>
                      {item.CATEGORY_NAME && (
                        <span style={{ fontSize: '11px', color: '#ff6600', fontWeight: 'bold' }}>{item.CATEGORY_NAME}</span>
                      )}

                      {/* Controle de quantidade */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid #ddd', borderRadius: '20px', width: 'fit-content', backgroundColor: '#f9f9f9', overflow: 'hidden' }}>
                        <button
                          onClick={() => handleQuantity(item.ID, (item.QUANTITY || 1) - 1)}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px', color: '#555', padding: '6px 14px', lineHeight: 1 }}
                        >−</button>
                        <span style={{ fontSize: '14px', fontWeight: 'bold', minWidth: '28px', textAlign: 'center' }}>{item.QUANTITY || 1}</span>
                        <button
                          onClick={() => handleQuantity(item.ID, (item.QUANTITY || 1) + 1)}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px', color: '#555', padding: '6px 14px', lineHeight: 1 }}
                        >+</button>
                      </div>
                    </div>

                    {/* Preço + Remover */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                      <strong style={{ fontSize: '18px' }}>
                        R$ {(Number(item.PRICE) * (item.QUANTITY || 1)).toFixed(2).replace('.', ',')}
                      </strong>
                      <div style={{ fontSize: '12px', color: '#888' }}>
                        R$ {Number(item.PRICE).toFixed(2).replace('.', ',')} cada
                      </div>
                      <button
                        onClick={() => handleRemove(item.ID)}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '20px', color: '#ccc', transition: 'color 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.color = '#e53935'}
                        onMouseOut={e => e.currentTarget.style.color = '#ccc'}
                        title="Remover item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '16px' }}>
                <a href="/products" style={{ color: '#ff6600', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
                  ← Continuar comprando
                </a>
              </div>
            </div>

            {/* Resumo do pedido (sidebar) */}
            <div style={{ flex: '1', minWidth: '280px', position: 'sticky', top: '20px' }}>
              <div style={{ border: '1px solid #eee', borderRadius: '12px', padding: '24px', backgroundColor: '#fafafa' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #eee' }}>
                  Resumo do Pedido
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#555', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Itens selecionados:</span>
                    <span>{totalItens}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Subtotal:</span>
                    <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#27ae60' }}>
                    <span>Frete:</span>
                    <span>Grátis</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingTop: '16px', borderTop: '2px solid #eee' }}>
                  <strong style={{ fontSize: '16px' }}>TOTAL:</strong>
                  <strong style={{ fontSize: '22px', color: '#222' }}>R$ {total.toFixed(2).replace('.', ',')}</strong>
                </div>

                <button
                  onClick={() => alert('Redirecionando para o pagamento...')}
                  disabled={itensSelecionados.length === 0}
                  style={{
                    width: '100%', backgroundColor: itensSelecionados.length === 0 ? '#ccc' : '#ed6c23',
                    color: '#fff', fontSize: '16px', fontWeight: 'bold',
                    border: 'none', borderRadius: '24px', padding: '14px',
                    cursor: itensSelecionados.length === 0 ? 'not-allowed' : 'pointer',
                    marginBottom: '12px', transition: 'background-color 0.2s',
                  }}
                  onMouseOver={e => { if (itensSelecionados.length > 0) e.currentTarget.style.backgroundColor = '#c95c1a' }}
                  onMouseOut={e => { if (itensSelecionados.length > 0) e.currentTarget.style.backgroundColor = '#ed6c23' }}
                >
                  Finalizar Compra
                </button>

                {itensSelecionados.length === 0 && (
                  <p style={{ textAlign: 'center', fontSize: '12px', color: '#e53935', marginBottom: '12px' }}>
                    Selecione ao menos um item para continuar
                  </p>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#555', cursor: 'pointer', justifyContent: 'center', padding: '8px 0', border: '1px dashed #ccc', borderRadius: '8px' }}>
                  <span style={{ border: '1px solid #aaa', padding: '1px 5px', borderRadius: '4px', fontSize: '11px' }}>%</span>
                  Inserir Cupom de Desconto
                </div>
              </div>

              {/* Selos de confiança */}
              <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '12px', color: '#15803d', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>🔒 Compra 100% segura</div>
                  <div>📦 Frete grátis em todos os pedidos</div>
                  <div>↩️ Devolução em até 30 dias</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seção de recomendações */}
        {cartItems.length > 0 && (
          <div style={{ marginTop: '64px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>Você também pode gostar</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              {[
                { emoji: '🎮', nome: 'Controle Sem Fio Pro', preco: 'R$ 349,90' },
                { emoji: '🎧', nome: 'Headset Gamer RGB', preco: 'R$ 289,90' },
                { emoji: '💡', nome: 'Luminária de Mesa LED', preco: 'R$ 65,00' },
              ].map((rec, i) => (
                <div key={i} style={{ border: '1px solid #eee', borderRadius: '10px', padding: '16px', textAlign: 'center', backgroundColor: '#fff' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>{rec.emoji}</div>
                  <p style={{ fontSize: '13px', margin: '0 0 8px 0', fontWeight: 'bold' }}>{rec.nome}</p>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#222', margin: '0 0 12px 0' }}>{rec.preco}</p>
                  <a href="/products" style={{ backgroundColor: '#ed6c23', color: '#fff', padding: '8px 16px', borderRadius: '16px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                    Ver produto
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}