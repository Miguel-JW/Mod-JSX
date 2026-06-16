// src/components/FormularioProduto.jsx
import { useState } from 'react';

const estadoInicial = { nome: '', preco: '', descricao: '', imagem: '' };

function FormularioProduto({ onAdicionar }) {
  const [form, setForm]     = useState(estadoInicial);
  const [erros, setErros]   = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (erros[name]) setErros(prev => ({ ...prev, [name]: '' }));
  }

  function validar() {
    const novosErros = {};
    if (!form.nome.trim())    novosErros.nome    = 'Informe o nome do produto.';
    if (!form.preco.trim())   novosErros.preco   = 'Informe o preço.';
    else if (isNaN(Number(form.preco)) || Number(form.preco) <= 0)
                              novosErros.preco   = 'Preço inválido.';
    if (!form.descricao.trim()) novosErros.descricao = 'Informe a descrição.';
    return novosErros;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const novosErros = validar();
    if (Object.keys(novosErros).length > 0) { setErros(novosErros); return; }

    onAdicionar({
      id: Date.now(),
      nome: form.nome.trim(),
      preco: Number(form.preco),
      descricao: form.descricao.trim(),
      imagem: form.imagem.trim() || 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
    });

    setForm(estadoInicial);
    setErros({});
  }

  return (
    <form className="formulario" onSubmit={handleSubmit} noValidate>
      <h2 className="formulario__titulo">Adicionar produto</h2>

      <div className="campo">
        <label htmlFor="nome" className="campo__label">Nome *</label>
        <input
          id="nome" name="nome" type="text"
          placeholder="Ex: Coleira Fashion"
          value={form.nome} onChange={handleChange}
          className={`campo__input${erros.nome ? ' campo__input--erro' : ''}`}
        />
        {erros.nome && <span className="campo__erro">{erros.nome}</span>}
      </div>

      <div className="campo">
        <label htmlFor="preco" className="campo__label">Preço (R$) *</label>
        <input
          id="preco" name="preco" type="number" min="0" step="0.01"
          placeholder="Ex: 79.90"
          value={form.preco} onChange={handleChange}
          className={`campo__input${erros.preco ? ' campo__input--erro' : ''}`}
        />
        {erros.preco && <span className="campo__erro">{erros.preco}</span>}
      </div>

      <div className="campo">
        <label htmlFor="descricao" className="campo__label">Descrição *</label>
        <textarea
          id="descricao" name="descricao" rows={3}
          placeholder="Breve descrição do produto"
          value={form.descricao} onChange={handleChange}
          className={`campo__input campo__textarea${erros.descricao ? ' campo__input--erro' : ''}`}
        />
        {erros.descricao && <span className="campo__erro">{erros.descricao}</span>}
      </div>

      <div className="campo">
        <label htmlFor="imagem" className="campo__label">URL da imagem <span className="campo__opcional">(opcional)</span></label>
        <input
          id="imagem" name="imagem" type="url"
          placeholder="https://..."
          value={form.imagem} onChange={handleChange}
          className="campo__input"
        />
      </div>

      <button type="submit" className="btn-submit">Adicionar ao catálogo</button>
    </form>
  );
}

export default FormularioProduto;
