/* ==========================================================================
   GuDev · contato
   O formulário não envia nada sozinho: valida, monta a mensagem e entrega um
   link de verdade pro WhatsApp. Quem envia é a pessoa, lá no WhatsApp.
   ========================================================================== */
(function () {
  'use strict';
  var G = window.GuDev;
  var form = document.getElementById('form');
  if (!form || !G) return;
  var pronto = document.getElementById('pronto'), previa = document.getElementById('previa');
  var abrir = document.getElementById('abrirZap'), estado = document.getElementById('estado');
  var aviso = document.getElementById('aviso'), enviar = document.getElementById('enviar');
  var msg = document.getElementById('f-mensagem'), conta = document.getElementById('a-mensagem');
  var tentou = false, texto = '';

  /* ?tipo=essencial | plano | sob-medida já marca a opção */
  var MAPA = { essencial: 'Site Essencial', plano: 'Plano mensal', 'sob-medida': 'Projeto sob medida' };
  var pedido = new URLSearchParams(location.search).get('tipo');
  if (pedido && MAPA[pedido]) {
    var r = form.querySelector('input[name="tipo"][value="' + MAPA[pedido] + '"]');
    if (r) r.checked = true;
  }

  function contador() { conta.textContent = msg.value.length + ' de 800'; }
  msg.addEventListener('input', contador);
  contador();

  var REGRAS = [
    { campo: 'nome', erro: 'e-nome', ok: function (v) { return v.trim().length >= 2; }, texto: 'Escreva seu nome.' },
    { campo: 'negocio', erro: 'e-negocio', ok: function (v) { return v.trim().length >= 2; }, texto: 'Escreva o nome do negócio.' },
    { campo: 'tipo', erro: 'e-tipo', ok: function (v) { return !!v; }, texto: 'Escolha uma opção.' },
    { campo: 'mensagem', erro: 'e-mensagem', ok: function (v) { return v.trim().length >= 10; }, texto: 'Conte um pouco mais, pelo menos uma frase.' }
  ];
  function valor(nome) {
    if (nome === 'tipo') { var r = form.querySelector('input[name="tipo"]:checked'); return r ? r.value : ''; }
    return form.elements[nome].value;
  }
  function marca(regra, mostra) {
    var ok = regra.ok(valor(regra.campo));
    var alvo = regra.campo === 'tipo' ? document.getElementById('f-tipo') : form.elements[regra.campo];
    var caixa = document.getElementById(regra.erro);
    if (!ok && mostra) {
      alvo.setAttribute('aria-invalid', 'true');
      caixa.innerHTML = '<svg class="ic" aria-hidden="true"><use href="img/icones.svg#alerta"/></svg>';
      caixa.appendChild(document.createTextNode(regra.texto));
    } else if (ok) {
      alvo.removeAttribute('aria-invalid');
      caixa.textContent = '';
    }
    return ok;
  }
  function valida() {
    var primeiro = null;
    REGRAS.forEach(function (r) {
      if (!marca(r, true) && !primeiro) primeiro = r.campo === 'tipo' ? form.querySelector('input[name="tipo"]') : form.elements[r.campo];
    });
    aviso.hidden = !primeiro;
    return primeiro;
  }
  /* depois da primeira tentativa, os erros somem assim que o campo fica certo */
  form.addEventListener('input', function () {
    if (!tentou) return;
    REGRAS.forEach(function (r) { marca(r, false); });
    if (REGRAS.every(function (r) { return r.ok(valor(r.campo)); })) aviso.hidden = true;
  });
  form.addEventListener('focusout', function (e) {
    if (!tentou) return;
    REGRAS.forEach(function (r) { if (e.target.name === r.campo) marca(r, true); });
  });

  function monta() {
    var l = ['Oi! Vim pelo site da GuDev.', 'Nome: ' + valor('nome').trim(), 'Negócio: ' + valor('negocio').trim()];
    if (valor('cidade').trim()) l.push('Cidade: ' + valor('cidade').trim());
    if (valor('link').trim()) l.push('Instagram ou Maps: ' + valor('link').trim());
    l.push('Preciso de: ' + valor('tipo'));
    if (valor('orcamento')) l.push('Quanto penso investir: ' + valor('orcamento'));
    l.push('Sobre o negócio: ' + valor('mensagem').trim());
    return l.join('\n');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    tentou = true;
    var erro = valida();
    if (erro) { erro.focus(); return; }
    enviar.setAttribute('aria-busy', 'true');
    enviar.querySelector('span').textContent = 'Montando a mensagem';
    setTimeout(function () {
      texto = monta();
      previa.textContent = texto;
      abrir.href = G.wa(texto);
      estado.textContent = '';
      form.hidden = true;
      pronto.hidden = false;
      enviar.removeAttribute('aria-busy');
      enviar.querySelector('span').textContent = 'Montar mensagem pro WhatsApp';
      document.getElementById('t-pronto').focus();
    }, G.reduz ? 0 : 450);
  });

  abrir.addEventListener('click', function () {
    estado.textContent = 'O WhatsApp abre numa nova aba com a mensagem escrita. Se não abrir, copie a mensagem e mande pro (11) 96465-0141.';
  });

  document.getElementById('copiar').addEventListener('click', function () {
    var seleciona = function () {
      var s = window.getSelection(), r = document.createRange();
      r.selectNodeContents(previa); s.removeAllRanges(); s.addRange(r);
      estado.textContent = 'Não deu pra copiar automático. A mensagem está selecionada: é só copiar.';
    };
    try {
      navigator.clipboard.writeText(texto).then(function () { estado.textContent = 'Mensagem copiada.'; }, seleciona);
    } catch (er) { seleciona(); }
  });

  document.getElementById('editar').addEventListener('click', function () {
    pronto.hidden = true;
    form.hidden = false;
    form.elements.nome.focus();
  });
})();
