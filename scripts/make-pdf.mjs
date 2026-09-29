import fs from 'fs';
import path from 'path';
import { jsPDF } from 'jspdf';

// Create landscape A4 PDF: 297mm width x 210mm height
const doc = new jsPDF({
  orientation: 'landscape',
  unit: 'mm',
  format: 'a4',
});

const pageWidth = 297;
const pageHeight = 210;

// Helper to load image as base64
function getBase64Image(filePath) {
  try {
    const fullPath = path.resolve(filePath);
    if (fs.existsSync(fullPath)) {
      const bitmap = fs.readFileSync(fullPath);
      const ext = path.extname(fullPath).replace('.', '').toLowerCase();
      const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
      return `data:${mime};base64,${bitmap.toString('base64')}`;
    }
  } catch (e) {
    console.error('Error loading image:', filePath, e);
  }
  return null;
}

// Images
const heroImg = getBase64Image('src/assets/images/behance_hero_mockup_1790695552913.jpg');
const ketImg = getBase64Image('src/assets/images/ket_official_supermarket_1790697750637.jpg');
const videoSlideImg = getBase64Image('src/assets/images/phone_video_mockup_slide_1790697720414.jpg');

// ==========================================
// PÁGINA 1: CAPA OFICIAL HORIZONTAL
// ==========================================
doc.setFillColor(15, 15, 17);
doc.rect(0, 0, pageWidth, pageHeight, 'F');

if (heroImg) {
  doc.addImage(heroImg, 'JPEG', 20, 28, 257, 144);
}

// Header brand
doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(255, 107, 0); // #FF6B00
doc.text('UX/UI CASE STUDY · EBAC 2022-2023', 20, 16);

doc.setFontSize(9);
doc.setTextColor(160, 160, 160);
doc.text('AUTOR: MATHEUS LEMES', pageWidth - 20, 16, { align: 'right' });

// Bottom title strip
doc.setFillColor(24, 24, 27);
doc.roundedRect(20, 178, 257, 22, 3, 3, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.setTextColor(255, 255, 255);
doc.text('KET · App Mobile para Cálculos Automáticos em Supermercados', 26, 188);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(200, 200, 200);
doc.text('Um facilitador na vida de quem se sente desconfortável fazendo contas de cabeça nos corredores', 26, 194);

// ==========================================
// PÁGINA 2: DESK RESEARCH & DIEESE
// ==========================================
doc.addPage('a4', 'landscape');
doc.setFillColor(248, 249, 250);
doc.rect(0, 0, pageWidth, pageHeight, 'F');

// Top bar
doc.setFillColor(255, 107, 0);
doc.rect(0, 0, pageWidth, 6, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(255, 107, 0);
doc.text('01. CONTEXTO & DESK RESEARCH', 20, 18);

doc.setFontSize(18);
doc.setTextColor(24, 24, 27);
doc.text('O Problema da Inflação e do Cálculo Mental na Gôndola', 20, 28);

doc.setFont('helvetica', 'normal');
doc.setFontSize(11);
doc.setTextColor(80, 80, 80);
doc.text(
  '"Sabe quando você vai ao supermercado pegando os itens e de repente se pega pensando:\nNossa, quanto tudo isso vai custar? Tenho dinheiro suficiente? Esses itens são realmente necessários?"',
  20,
  38
);

// Card 1: DIEESE
doc.setFillColor(255, 255, 255);
doc.roundedRect(20, 56, 122, 68, 4, 4, 'F');
doc.setDrawColor(228, 228, 231);
doc.roundedRect(20, 56, 122, 68, 4, 4, 'S');

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(255, 107, 0);
doc.text('DADOS DIEESE (SÃO PAULO)', 26, 66);

doc.setFontSize(26);
doc.setTextColor(24, 24, 27);
doc.text('R$ 750,74', 26, 80);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(100, 100, 100);
doc.text(
  'Custo médio da cesta básica em São Paulo, registrando alta de +11,48%.\nO brasileiro adotou como hábito usar a calculadora do smartphone\npara evitar surpresas desagradáveis ou constrangimento no caixa.',
  26,
  90
);

// Card 2: Rappi/iFood Limitation
doc.setFillColor(255, 255, 255);
doc.roundedRect(154, 56, 122, 68, 4, 4, 'F');
doc.roundedRect(154, 56, 122, 68, 4, 4, 'S');

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(255, 107, 0);
doc.text('A LIMITAÇÃO DO DELIVERY ONLINE', 160, 66);

doc.setFontSize(26);
doc.setTextColor(24, 24, 27);
doc.text('Autonomia', 160, 80);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(100, 100, 100);
doc.text(
  'Apps como Rappi e iFood tiram a autonomia do cliente de escolher a\nmaturação da fruta, o peso por kg no hortifruti e checar a validade\ne a integridade das embalagens físicas. O Ket atua no mercado presencial.',
  160,
  90
);

// Bottom Research Insight
doc.setFillColor(255, 247, 237);
doc.roundedRect(20, 134, 256, 56, 4, 4, 'F');
doc.setDrawColor(254, 215, 170);
doc.roundedRect(20, 134, 256, 56, 4, 4, 'S');

doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(154, 52, 18);
doc.text('Perguntas Centrais da Pesquisa EBAC:', 28, 146);

doc.setFont('helvetica', 'normal');
doc.setFontSize(10);
doc.setTextColor(124, 45, 18);
doc.text('1. Como facilitar as contas das compras em tempo real, sem cansaço mental?', 28, 156);
doc.text('2. Como dar visibilidade clara do saldo antes de chegar ao caixa registrador?', 28, 166);
doc.text('3. Como preservar a autonomia do consumidor ao comprar hortifruti a granel e controlar supérfluos?', 28, 176);

// ==========================================
// PÁGINA 3: O MASCOTE KET OFICIAL DO MERCADO
// ==========================================
doc.addPage('a4', 'landscape');
doc.setFillColor(248, 249, 250);
doc.rect(0, 0, pageWidth, pageHeight, 'F');

doc.setFillColor(255, 107, 0);
doc.rect(0, 0, pageWidth, 6, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(255, 107, 0);
doc.text('02. PERSONA & IDENTIDADE VISUAL', 20, 18);

doc.setFontSize(18);
doc.setTextColor(24, 24, 27);
doc.text('O Mascote "Ket": Amigável, Urbano e Estratégico', 20, 28);

// Mascot Render Box
if (ketImg) {
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 36, 105, 155, 4, 4, 'F');
  doc.setDrawColor(228, 228, 231);
  doc.roundedRect(20, 36, 105, 155, 4, 4, 'S');
  doc.addImage(ketImg, 'JPEG', 24, 40, 97, 97);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(24, 24, 27);
  doc.text('Ket · O Gato do Mercado', 72, 146, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(120, 120, 120);
  doc.text('Pelagem laranja malhada com jaqueta jeans estilosa', 72, 153, { align: 'center' });
  doc.text('Avental oficial de mercado com bloco de notas e lápis', 72, 159, { align: 'center' });
  doc.text('Tênis esportivo laranja, calça cargo e sacolinha de legumes', 72, 165, { align: 'center' });
}

// Persona Details
doc.setFillColor(255, 255, 255);
doc.roundedRect(135, 36, 142, 155, 4, 4, 'F');
doc.setDrawColor(228, 228, 231);
doc.roundedRect(135, 36, 142, 155, 4, 4, 'S');

doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(255, 107, 0);
doc.text('CONCEITO DO NOME & ANTROPOMORFISMO', 143, 48);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(70, 70, 70);
doc.text(
  'Ket vem da palavra "Market" e a pronúncia soa exatamente como "Cat".\nGatos são urbanos, curiosos, ágeis e calculam estrategicamente seus pulos.\nUm mascote antropomórfico que cria empatia imediata nos corredores.',
  143,
  58
);

doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(255, 107, 0);
doc.text('PERFIL DEMOGRÁFICO DA PERSONA', 143, 86);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(70, 70, 70);
doc.text(
  '• Faixa etária: 25 a 30 anos (Jovens adultos, estudantes e recém-casados)\n• Região: Grandes centros urbanos (Sudeste do Brasil)\n• Renda: Média, consciente e atenta aos gastos do mês\n• Comportamento: Valoriza compras rápidas e autonomia de escolha',
  143,
  96
);

doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(255, 107, 0);
doc.text('TOM DE VOZ & VOZ ATIVA', 143, 130);

doc.setFillColor(255, 247, 237);
doc.roundedRect(143, 136, 126, 44, 3, 3, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(154, 52, 18);
doc.text('"Eae! Bem-vindo de volta :D"', 149, 146);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(124, 45, 18);
doc.text(
  'Comunicação direta, informal e acolhedora. O Ket não repreende o\nconsumidor, mas atua como um companheiro de compras inteligente\nque avisa antes do limite orçamentário ser ultrapassado.',
  149,
  154
);

// ==========================================
// PÁGINA 4: FLUXO DE TELAS DO APP
// ==========================================
doc.addPage('a4', 'landscape');
doc.setFillColor(248, 249, 250);
doc.rect(0, 0, pageWidth, pageHeight, 'F');

doc.setFillColor(255, 107, 0);
doc.rect(0, 0, pageWidth, 6, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(255, 107, 0);
doc.text('03. PROTÓTIPO & FLUXO DO USUÁRIO', 20, 18);

doc.setFontSize(18);
doc.setTextColor(24, 24, 27);
doc.text('As 4 Etapas Chave da Experiência no Supermercado', 20, 28);

const screenBoxes = [
  {
    num: 'Tela 01',
    title: 'Boas-Vindas',
    desc: 'Reconhecimento acolhedor do mascote Ket ("Eae! Bem-vindo de volta :D") e entrada rápida.',
  },
  {
    num: 'Tela 02',
    title: 'Definição de Saldo',
    desc: 'Entrada do teto de gastos pretendido com atalhos de R$ 100 a R$ 500 ou opção sem limite.',
  },
  {
    num: 'Tela 05 & 07',
    title: 'Scanner de Gôndola',
    desc: 'Leitor com laser animado, bip de confirmação e slider de peso em KG para Hortifruti.',
  },
  {
    num: 'Tela 06',
    title: 'Minha Lista (HUD)',
    desc: 'HUD escuro de alto contraste com R$ gigante (solução do teste de usabilidade com Ícaro).',
  },
];

screenBoxes.forEach((s, idx) => {
  const x = 20 + idx * 66;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(x, 40, 59, 148, 4, 4, 'F');
  doc.setDrawColor(228, 228, 231);
  doc.roundedRect(x, 40, 59, 148, 4, 4, 'S');

  doc.setFillColor(244, 244, 245);
  doc.roundedRect(x + 4, 46, 51, 24, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 107, 0);
  doc.text(s.num, x + 8, 55);

  doc.setFontSize(11);
  doc.setTextColor(24, 24, 27);
  doc.text(s.title, x + 8, 64);

  doc.setFillColor(idx === 3 ? 24 : 250, idx === 3 ? 24 : 250, idx === 3 ? 27 : 250);
  doc.roundedRect(x + 4, 76, 51, 62, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(idx === 3 ? 12 : 9);
  doc.setTextColor(idx === 3 ? 255 : 40, idx === 3 ? 255 : 40, idx === 3 ? 255 : 40);
  if (idx === 3) {
    doc.text('R$ 214,87', x + 10, 95);
    doc.setFontSize(7.5);
    doc.setTextColor(255, 107, 0);
    doc.text('TOTAL DO CARRINHO', x + 10, 105);
  } else if (idx === 2) {
    doc.text('||| || ||||| ||', x + 10, 95);
    doc.setFontSize(7.5);
    doc.setTextColor(255, 107, 0);
    doc.text('Laser Ativo & 0.85kg', x + 10, 105);
  } else if (idx === 1) {
    doc.text('R$ 200,00', x + 10, 95);
    doc.setFontSize(7.5);
    doc.setTextColor(16, 185, 129);
    doc.text('Teto Estabelecido', x + 10, 105);
  } else {
    doc.text('Eae, Matheus!', x + 10, 95);
    doc.setFontSize(7.5);
    doc.setTextColor(255, 107, 0);
    doc.text('Bora Economizar', x + 10, 105);
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(90, 90, 90);
  doc.text(doc.splitTextToSize(s.desc, 49), x + 5, 148);
});

// ==========================================
// PÁGINA 5: DEMONSTRAÇÃO EM VÍDEO DO APP (MOCKUP CENTRALIZADO)
// ==========================================
doc.addPage('a4', 'landscape');
doc.setFillColor(15, 15, 17);
doc.rect(0, 0, pageWidth, pageHeight, 'F');

if (videoSlideImg) {
  doc.addImage(videoSlideImg, 'JPEG', 20, 24, 257, 144);
}

// Title and instruction banner at bottom
doc.setFillColor(24, 24, 27);
doc.roundedRect(20, 174, 257, 26, 3, 3, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(12);
doc.setTextColor(255, 107, 0);
doc.text('04. DEMONSTRAÇÃO DO APP EM VÍDEO (PROTÓTIPO INTERATIVO)', 26, 184);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(200, 200, 200);
doc.text(
  'Espaço em proporção 16:9 com smartphone centralizado para inserção do vídeo de gravação de tela no Behance.\nDemonstra o leitor de código de barras em ação, adição de gramas em tempo real e atualização instantânea do HUD.',
  26,
  192
);

// ==========================================
// PÁGINA 6: TESTES DE USABILIDADE (EBAC)
// ==========================================
doc.addPage('a4', 'landscape');
doc.setFillColor(248, 249, 250);
doc.rect(0, 0, pageWidth, pageHeight, 'F');

doc.setFillColor(255, 107, 0);
doc.rect(0, 0, pageWidth, 6, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(255, 107, 0);
doc.text('05. VALIDAÇÃO & TESTES DE USABILIDADE', 20, 18);

doc.setFontSize(18);
doc.setTextColor(24, 24, 27);
doc.text('Testes com 3 Usuários Reais (Pesquisa EBAC)', 20, 28);

// Table container
doc.setFillColor(255, 255, 255);
doc.roundedRect(20, 38, 256, 106, 4, 4, 'F');
doc.setDrawColor(228, 228, 231);
doc.roundedRect(20, 38, 256, 106, 4, 4, 'S');

// Table Header
doc.setFillColor(244, 244, 245);
doc.rect(20, 38, 256, 14, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(100, 100, 100);
doc.text('USUÁRIO', 30, 47);
doc.text('HUMOR', 65, 47);
doc.text('TEMPO', 105, 47);
doc.text('DIFICULDADE IDENTIFICADA', 135, 47);
doc.text('SOLUÇÃO IMPLEMENTADA NO KET', 200, 47);

// Row 1: Rai
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(24, 24, 27);
doc.text('Rai', 30, 64);
doc.setFont('helvetica', 'normal');
doc.text('Pensativo', 65, 64);
doc.setFont('helvetica', 'bold');
doc.text('31 segundos', 105, 64);
doc.setFont('helvetica', 'normal');
doc.setTextColor(80, 80, 80);
doc.text('Clicou nos cantos superiores', 135, 64);
doc.setTextColor(16, 185, 129);
doc.text('Header fixo com botão voltar evidente', 200, 64);

// Row 2: Lewi
doc.setFont('helvetica', 'bold');
doc.setTextColor(24, 24, 27);
doc.text('Lewi', 30, 86);
doc.setFont('helvetica', 'normal');
doc.text('Animado', 65, 86);
doc.setFont('helvetica', 'bold');
doc.text('16 segundos', 105, 86);
doc.setFont('helvetica', 'normal');
doc.setTextColor(80, 80, 80);
doc.text('Nenhum erro no fluxo', 135, 86);
doc.setTextColor(16, 185, 129);
doc.text('Aprovado sem atritos (scan rápido)', 200, 86);

// Row 3: Ícaro
doc.setFont('helvetica', 'bold');
doc.setTextColor(24, 24, 27);
doc.text('Ícaro', 30, 108);
doc.setFont('helvetica', 'normal');
doc.text('Cauteloso', 65, 108);
doc.setFont('helvetica', 'bold');
doc.text('12 segundos', 105, 108);
doc.setFont('helvetica', 'normal');
doc.setTextColor(239, 68, 68);
doc.text('Demorou a achar o preço total', 135, 108);
doc.setTextColor(16, 185, 129);
doc.text('Criado HUD escuro de alto contraste', 200, 108);

// Nielsen Heuristics Card
doc.setFillColor(255, 247, 237);
doc.roundedRect(20, 152, 256, 42, 3, 3, 'F');
doc.setDrawColor(254, 215, 170);
doc.roundedRect(20, 152, 256, 42, 3, 3, 'S');

doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(154, 52, 18);
doc.text('Aplicação das Heurísticas de Jakob Nielsen:', 28, 163);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(124, 45, 18);
doc.text('• #1 Visibilidade do Status: Barra de progresso orçamentária verde ➔ amarelo ➔ vermelho em tempo real.', 28, 172);
doc.text('• #3 Liberdade e Controle: Ajuste fino de peso por KG para hortifruti e remoção de itens com 1 toque.', 28, 180);
doc.text('• #5 Prevenção de Erros: Alerta antecipado do Mascote Ket antes de ultrapassar o limite orçamentário.', 28, 188);

// ==========================================
// PÁGINA 7: DESIGN SYSTEM & CRÉDITOS
// ==========================================
doc.addPage('a4', 'landscape');
doc.setFillColor(248, 249, 250);
doc.rect(0, 0, pageWidth, pageHeight, 'F');

doc.setFillColor(255, 107, 0);
doc.rect(0, 0, pageWidth, 6, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(255, 107, 0);
doc.text('06. DESIGN SYSTEM & CRÉDITOS', 20, 18);

doc.setFontSize(18);
doc.setTextColor(24, 24, 27);
doc.text('Design System Oficial do Projeto Ket', 20, 28);

// Color swatches
const colors = [
  { name: 'Primary Orange', hex: '#FF6B00', r: 255, g: 107, b: 0, textDark: false },
  { name: 'Secondary Amber', hex: '#FFA900', r: 255, g: 169, b: 0, textDark: true },
  { name: 'Success Emerald', hex: '#10B981', r: 16, g: 185, b: 129, textDark: false },
  { name: 'Alert Red', hex: '#EF4444', r: 239, g: 68, b: 68, textDark: false },
];

colors.forEach((c, idx) => {
  const x = 20 + idx * 66;
  doc.setFillColor(c.r, c.g, c.b);
  doc.roundedRect(x, 40, 59, 44, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(c.textDark ? 24 : 255, c.textDark ? 24 : 255, c.textDark ? 24 : 255);
  doc.text(c.name, x + 6, 55);

  doc.setFontSize(14);
  doc.text(c.hex, x + 6, 72);
});

// Typography box
doc.setFillColor(255, 255, 255);
doc.roundedRect(20, 94, 256, 44, 4, 4, 'F');
doc.setDrawColor(228, 228, 231);
doc.roundedRect(20, 94, 256, 44, 4, 4, 'S');

doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(24, 24, 27);
doc.text('Tipografia: Inter & Plus Jakarta Sans', 28, 107);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(90, 90, 90);
doc.text(
  'Hierarquia baseada em escala de 12px a 32px com uso obrigatório de tabular-nums para valores monetários (R$).\nIsso garante que os centavos não causem vibração visual na tela enquanto o usuário caminha com o carrinho.',
  28,
  118
);

// Author & EBAC footer
doc.setFillColor(24, 24, 27);
doc.roundedRect(20, 146, 256, 48, 4, 4, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(12);
doc.setTextColor(255, 107, 0);
doc.text('Projeto Ket · Calculadora de Supermercados', 30, 160);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(220, 220, 220);
doc.text('Concepção, Pesquisa de Campo & UX/UI Design por Matheus Lemes', 30, 170);
doc.setTextColor(160, 160, 160);
doc.text('British School of Creative Arts & Technology (EBAC) · São Paulo, Brasil', 30, 178);

// Save PDF to public folder
const pdfBuffer = doc.output('arraybuffer');
fs.writeFileSync('public/ket-case-study-behance.pdf', Buffer.from(pdfBuffer));
console.log('Updated PDF generated at public/ket-case-study-behance.pdf (Size:', pdfBuffer.byteLength, 'bytes)');
