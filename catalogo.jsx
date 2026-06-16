// src/pages/Catalogo.jsx
import { useState, useEffect } from 'react';
import ProdutoCard      from '../components/ProdutoCard';
import FormularioProduto from '../components/FormularioProduto';
import produtosMock     from '../data/produtos';

function Catalogo() {
  const [produtos,    setProdutos]    = useState([]);
  const [carregando,  setCarregando]  = useState(true);

  // Simula fetch de API
  useEffect(() => {
    const timer = setTimeout(() => {
      setProdutos(produtosMock);
      setCarregando(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  function adicionarProduto(novoProduto) {
    setProdutos(prev => [novoProduto, ...prev]);
  }

  return (
    <div className="catalogo">

      {/* Header */}
      <header className="catalogo__header">
        <div className="catalogo__header-inner">
          <span className="logo-mark">P&amp;S</span>
          <h1 className="catalogo__titulo">Catálogo <span>Pet&amp;Style</span></h1>
        </div>
      </header>

      <main className="catalogo__main">

        {/* Formulário */}
        <section className="catalogo__form-section">
          <FormularioProduto onAdicionar={adicionarProduto} />
        </section>

        {/* Lista */}
        <section className="catalogo__lista-section">
          <h2 className="catalogo__subtitulo">
            Produtos disponíveis
            {!carregando && <span className="catalogo__contagem">{produtos.length}</span>}
          </h2>

          {carregando ? (
            <div className="carregando">
              <div className="carregando__spinner" />
              <p>Carregando produtos...</p>
            </div>
          ) : produtos.length === 0 ? (
            <p className="catalogo__vazio">Nenhum produto cadastrado ainda.</p>
          ) : (
            <div className="produtos-grid">
              {produtos.map(p => (
                <ProdutoCard
                  key={p.id}
                  nome={p.nome}
                  preco={p.preco}
                  descricao={p.descricao}
                  imagem={p.imagem}
                />
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default Catalogo;
