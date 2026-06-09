import Head from 'next/head'
import { useEffect, useState } from 'react'
import SiteHeader from '../components/SiteHeader'

export default function FAQ() {
  const [faqs, setFaqs] = useState([])
  const [message, setMessage] = useState('')

  const load = async () => {
    try {
      // Exemplo de integração com o back-end. 
      // Quando a rota estiver pronta, descomente as linhas abaixo e remova o array estático.
      // const data = await request('/faq')
      // setFaqs(data)
      
      // Dados estáticos para visualização imediata baseada na sua imagem
      setFaqs([
        { 
          ID: 1, 
          QUESTION: 'O que é o Mercado Online?', 
          ANSWER: 'O Mercado Online é uma plataforma de e-commerce que oferece diversos produtos com praticidade e segurança para seus clientes.',
          ICON: '●'
        },
        { 
          ID: 2, 
          QUESTION: 'Como funciona a entrega?', 
          ANSWER: 'As entregas são realizadas em todo o Brasil, com prazos que variam de acordo com a localização e o tipo de frete escolhido.',
          ICON: '◆'
        },
        { 
          ID: 3, 
          QUESTION: 'Quais formas de pagamento são aceitas?', 
          ANSWER: 'O site aceita cartão de crédito, Pix e boleto bancário, garantindo opções variadas para o cliente.',
          ICON: '▲'
        },
        { 
          ID: 4, 
          QUESTION: 'Posso trocar ou devolver um produto?', 
          ANSWER: 'Sim, o cliente pode solicitar troca ou devolução dentro do prazo informado, desde que o produto esteja em boas condições.',
          ICON: '●'
        },
        { 
          ID: 5, 
          QUESTION: 'Como entrar em contato com o suporte?', 
          ANSWER: 'O cliente pode entrar em contato com o suporte por meio dos canais de atendimento disponíveis no site.',
          ICON: '◆'
        }
      ])
    } catch (error) {
      setMessage(error.message || 'Falha ao carregar as perguntas frequentes.')
    }
  }

  useEffect(() => { load() }, [])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Next MPA - FAQ</title>
      </Head>

      <SiteHeader active="faq" />

      {/* CONTEÚDO PRINCIPAL - FAQ */}
      <main style={{ fontFamily: 'Arial, sans-serif', padding: '64px 24px', maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Título (Esquerda) */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0' }}>Perguntas Frequentes</h1>
          {message ? <div style={{ marginTop: '16px', padding: 12, background: '#fee', border: '1px solid #fcc', borderRadius: 8, color: '#c00' }}>{message}</div> : null}
        </div>

        {/* Lista de Perguntas (Direita) */}
        <div style={{ flex: '2', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq) => (
            <div key={faq.ID} style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ color: '#888', fontSize: '12px' }}>{faq.ICON}</span>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0' }}>{faq.QUESTION}</h3>
              </div>
              <p style={{ fontSize: '13px', color: '#555', margin: '0', lineHeight: '1.5' }}>
                {faq.ANSWER}
              </p>
            </div>
          ))}
        </div>

      </main>

      {/* RODAPÉ */}
      <footer style={{ borderTop: '1px solid #eee', padding: '40px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '1000px', margin: '40px auto 0', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ flex: '1', minWidth: '250px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ color: '#00a8ff', fontSize: '18px', fontWeight: 'bold', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '24px' }}>🛒</span>
              <div>
                <span style={{ color: '#0070cc' }}>Mercado</span><br/>
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
    </>
  )
}