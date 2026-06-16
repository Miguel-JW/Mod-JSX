// src/components/ProdutoCard.jsx
function ProdutoCard({ nome, preco, descricao, imagem }) {
  return (
    <div className="produto-card">
      <div className="produto-card__img-wrap">
        <img src={imagem} alt={nome} className="produto-card__img" />
      </div>
      <div className="produto-card__body">
        <h3 className="produto-card__nome">{nome}</h3>
        <p className="produto-card__desc">{descricao}</p>
        <span className="produto-card__preco">
          {preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>
    </div>
  );
}

export default ProdutoCard;
