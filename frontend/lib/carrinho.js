// Utilitário de carrinho usando localStorage

export function getCarrinho() {
  try {
    const stored = localStorage.getItem('carrinho')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function salvarCarrinho(items) {
  try {
    localStorage.setItem('carrinho', JSON.stringify(items))
    // Dispara evento customizado para atualizar o header
    window.dispatchEvent(new Event('carrinho-atualizado'))
  } catch {}
}

export function adicionarAoCarrinho(produto) {
  const items = getCarrinho()
  const existente = items.find(i => i.ID === produto.ID)
  if (existente) {
    existente.QUANTITY = (existente.QUANTITY || 1) + 1
  } else {
    items.push({ ...produto, QUANTITY: 1, SELECTED: true })
  }
  salvarCarrinho(items)
  return items
}

export function removerDoCarrinho(id) {
  const items = getCarrinho().filter(i => i.ID !== id)
  salvarCarrinho(items)
  return items
}

export function atualizarQuantidade(id, quantidade) {
  if (quantidade < 1) return removerDoCarrinho(id)
  const items = getCarrinho().map(i => i.ID === id ? { ...i, QUANTITY: quantidade } : i)
  salvarCarrinho(items)
  return items
}

export function toggleSelecionado(id) {
  const items = getCarrinho().map(i => i.ID === id ? { ...i, SELECTED: !i.SELECTED } : i)
  salvarCarrinho(items)
  return items
}
