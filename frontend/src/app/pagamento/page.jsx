"use client";

import "./pagamento.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Pagamento() {
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedSubtotal = localStorage.getItem("subtotal");
    const value = storedSubtotal ? parseFloat(storedSubtotal) : 0;
    setSubtotal(value);
    setTotal(value);
  }, []);

  const finalizarPagamento = () => {
    if (subtotal <= 0) {
      alert("Seu carrinho está vazio! Volte e adicione itens.");
      return;
    }

    alert("Pagamento realizado com sucesso!");

    localStorage.removeItem("carrinho");
    localStorage.removeItem("subtotal");

    window.location.href = "/";
  };

  return (
    <main className="container">
      <h1 className="page-title">Pagamento</h1>

      <div className="payment-layout">

        <div className="payment-details">
          <h2>Detalhes do Pagamento</h2>

          <form id="payment-form">
            <div className="form-group">
              <label>Número do Cartão</label>
              <input 
                type="text" 
                placeholder="0000 0000 0000 0000" 
                maxLength={16} 
              />
            </div>

            <div className="form-group">
              <label>Nome no Cartão</label>
              <input type="text" placeholder="Seu Nome Completo" />
            </div>

            <div className="form-row">
              <div className="form-group half-width">
                <label>Validade (MM/AA)</label>
                <input 
                  type="text" 
                  placeholder="MM/AA" 
                  maxLength={4} 
                />
              </div>

              <div className="form-group half-width">
                <label>CVC</label>
                <input 
                  type="text" 
                  placeholder="123" 
                  maxLength={3} 
                />
              </div>
            </div>
          </form>
        </div>

        <div className="order-summary">
          <h2>Resumo do Pedido</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>

          <button className="button" onClick={finalizarPagamento}>
            Finalizar Pagamento
          </button>

          <Link href="/carrinho" className="button-secondary">
            Voltar ao carrinho
          </Link>
        </div>

      </div>
    </main>
  );
}
