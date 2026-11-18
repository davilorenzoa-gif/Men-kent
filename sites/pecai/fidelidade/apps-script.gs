/**
 * Péçaí Atacado · Cartão fidelidade digital
 * Cole este arquivo inteiro em: Planilha > Extensões > Apps Script.
 * Passo a passo no README.md desta pasta.
 *
 * A planilha fica PRIVADA. A página do cartão pede só o código do cliente
 * e este script devolve só os dados daquele cliente (nunca a lista toda).
 */

// ===== REGRAS (a dona da Péçaí decide; mude aqui e reimplante) =====
var REGRAS = {
  litrosPorCarimbo: 10,   // a cada 10 L comprados = 1 carimbo
  carimbosPorPremio: 10,  // 10 carimbos = 1 prêmio
  premio: '1 balde de açaí de 10 L',
  contaCupuacu: true,     // cupuaçu soma litros junto com o açaí?
  validadeDias: 180       // carimbos zeram se o cliente ficar esse tempo sem pedir (0 = nunca)
};
// Endereço da página do cartão (troque quando o site estiver no domínio final)
var LINK_CARTAO = 'https://proposta-pecai.netlify.app/fidelidade.html';

var ABA_CLIENTES = 'Clientes';
var ABA_PEDIDOS = 'Pedidos';
var LETRAS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // sem 0/O, 1/I/L

// ===== Página pede o cartão: ...exec?c=CODIGO =====
function doGet(e) {
  var c = String((e && e.parameter && e.parameter.c) || '').trim().toUpperCase();
  var resposta;
  if (!/^[A-Z0-9]{4,8}$/.test(c)) {
    resposta = { ok: false, erro: 'codigo' };
  } else {
    var cliente = acharCliente_(c);
    resposta = cliente
      ? Object.assign({ ok: true, codigo: c, empresa: cliente.empresa }, calcularCartao(pedidosDo_(c), new Date(), REGRAS))
      : { ok: false, erro: 'nao-encontrado' };
  }
  return ContentService.createTextOutput(JSON.stringify(resposta)).setMimeType(ContentService.MimeType.JSON);
}

// ===== Conta (função pura: dá pra testar fora do Google) =====
// pedidos: [{data: Date, acai: n, cupuacu: n, tipo: 'Pedido'|'Resgate'}]
function calcularCartao(pedidos, hoje, R) {
  var DIA = 86400000;
  var lista = pedidos
    .filter(function (p) { return p.data instanceof Date && !isNaN(p.data); })
    .sort(function (a, b) { return a.data - b.data; });

  var litros = 0, resgates = 0, ultimo = null, carimbos = [], hist = [];
  lista.forEach(function (p) {
    // Ficou mais que a validade sem pedir: zera tudo antes deste pedido.
    if (R.validadeDias && ultimo && (p.data - ultimo) / DIA > R.validadeDias) {
      litros = 0; resgates = 0; carimbos = [];
    }
    if (String(p.tipo || '').toLowerCase().indexOf('resgat') === 0) {
      resgates++;
      hist.push({ data: iso_(p.data), tipo: 'resgate' });
      return;
    }
    var l = (Number(p.acai) || 0) + (R.contaCupuacu ? (Number(p.cupuacu) || 0) : 0);
    if (l <= 0) return;
    var antes = Math.floor(litros / R.litrosPorCarimbo);
    litros += l;
    var depois = Math.floor(litros / R.litrosPorCarimbo);
    for (var i = antes; i < depois; i++) carimbos.push(iso_(p.data));
    ultimo = p.data;
    hist.push({ data: iso_(p.data), tipo: 'pedido', litros: l, carimbos: depois - antes });
  });

  if (R.validadeDias && ultimo && (hoje - ultimo) / DIA > R.validadeDias) {
    litros = 0; resgates = 0; carimbos = []; ultimo = null;
  }

  var usados = resgates * R.carimbosPorPremio;
  var saldo = carimbos.slice(Math.min(usados, carimbos.length));
  var premios = Math.floor(saldo.length / R.carimbosPorPremio);
  var noCartao = saldo.slice(premios * R.carimbosPorPremio);
  if (premios > 0 && noCartao.length === 0) noCartao = saldo.slice(0, R.carimbosPorPremio); // cartão cheio

  return {
    carimbos: noCartao,                                  // datas dos carimbos do cartão atual
    premiosProntos: premios,
    faltamLitros: R.litrosPorCarimbo - (litros % R.litrosPorCarimbo),
    litrosNoPeriodo: litros,
    venceEm: (R.validadeDias && ultimo) ? iso_(new Date(ultimo.getTime() + R.validadeDias * DIA)) : null,
    historico: hist.slice(-6).reverse(),
    regras: { litrosPorCarimbo: R.litrosPorCarimbo, carimbosPorPremio: R.carimbosPorPremio, premio: R.premio, contaCupuacu: R.contaCupuacu, validadeDias: R.validadeDias }
  };
}

function iso_(d) {
  return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
}

// ===== Leitura da planilha =====
function acharCliente_(c) {
  var aba = SpreadsheetApp.getActive().getSheetByName(ABA_CLIENTES);
  var v = aba.getDataRange().getValues();
  for (var i = 1; i < v.length; i++) {
    if (String(v[i][0]).trim().toUpperCase() === c) return { linha: i + 1, empresa: String(v[i][1]).trim() };
  }
  return null;
}

function pedidosDo_(c) {
  var v = SpreadsheetApp.getActive().getSheetByName(ABA_PEDIDOS).getDataRange().getValues();
  var out = [];
  for (var i = 1; i < v.length; i++) {
    if (String(v[i][1]).trim().toUpperCase() !== c) continue;
    out.push({ data: v[i][0] instanceof Date ? v[i][0] : new Date(v[i][0]), acai: v[i][2], cupuacu: v[i][3], tipo: v[i][4] || 'Pedido' });
  }
  return out;
}

// ===== Menu "Fidelidade" dentro da planilha =====
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Fidelidade')
    .addItem('Novo cliente', 'novoCliente')
    .addItem('Mensagem pro cliente (linha selecionada)', 'mensagemCliente')
    .addToUi();
}

function novoCliente() {
  var ui = SpreadsheetApp.getUi();
  var r = ui.prompt('Novo cliente do atacado', 'Nome da empresa:', ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK || !r.getResponseText().trim()) return;
  var codigo;
  do {
    codigo = '';
    for (var i = 0; i < 5; i++) codigo += LETRAS.charAt(Math.floor(Math.random() * LETRAS.length));
  } while (acharCliente_(codigo));
  SpreadsheetApp.getActive().getSheetByName(ABA_CLIENTES).appendRow([codigo, r.getResponseText().trim(), new Date()]);
  mostrarMensagem_(codigo, r.getResponseText().trim(), true);
}

function mensagemCliente() {
  var aba = SpreadsheetApp.getActiveSheet();
  var linha = aba.getActiveRange().getRow();
  var col = aba.getName() === ABA_PEDIDOS ? 2 : 1;
  var c = String(aba.getRange(linha, col).getValue()).trim().toUpperCase();
  var cliente = acharCliente_(c);
  if (!cliente) { SpreadsheetApp.getUi().alert('Selecione uma linha com o código do cliente (aba Clientes ou Pedidos).'); return; }
  mostrarMensagem_(c, cliente.empresa, false);
}

function mostrarMensagem_(codigo, empresa, novo) {
  var link = LINK_CARTAO + '?c=' + codigo;
  var cartao = calcularCartao(pedidosDo_(codigo), new Date(), REGRAS);
  var texto = novo
    ? 'Oi! Aqui é da Péçaí 💜 A ' + empresa + ' agora tem cartão fidelidade do atacado: a cada ' + REGRAS.litrosPorCarimbo +
      ' L ganha 1 carimbo, e com ' + REGRAS.carimbosPorPremio + ' carimbos ganha ' + REGRAS.premio + '. Seu cartão: ' + link
    : (cartao.premiosProntos > 0
      ? 'Oi! Aqui é da Péçaí 💜 Seu cartão encheu: ' + REGRAS.premio + ' liberado! Confere aqui: ' + link
      : 'Oi! Aqui é da Péçaí 💜 Carimbo novo no seu cartão: ' + cartao.carimbos.length + ' de ' + REGRAS.carimbosPorPremio +
        '. Faltam ' + (REGRAS.carimbosPorPremio - cartao.carimbos.length) + ' pro prêmio. Confere: ' + link);
  var html = HtmlService.createHtmlOutput(
    '<div style="font:14px sans-serif"><p><b>' + empresa + '</b> · código <b>' + codigo + '</b></p>' +
    '<textarea id="t" style="width:100%;height:120px">' + texto.replace(/</g, '&lt;') + '</textarea>' +
    '<p><button onclick="t.select();document.execCommand(\'copy\');this.textContent=\'Copiado!\'">Copiar mensagem</button></p></div>'
  ).setWidth(420).setHeight(230);
  SpreadsheetApp.getUi().showModalDialog(html, 'Mensagem pro WhatsApp');
}
