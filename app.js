/* ================================================
   LUMINA LEARNING — app.js
   Toda a interatividade da plataforma
   ================================================ */

   'use strict';

   // ─── TOAST ───────────────────────────────────────
   function showToast(msg, duration = 2500) {
     const t = document.getElementById('toast');
     t.textContent = msg;
     t.classList.add('show');
     clearTimeout(t._timer);
     t._timer = setTimeout(() => t.classList.remove('show'), duration);
   }
   
   // ─── SCROLL SUAVE PARA SEÇÃO ─────────────────────
   function scrollTo(id) {
     const el = document.getElementById(id);
     if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }
   
   // ─── BOTÃO CONFIGURAÇÃO (welcome bar) ────────────
   document.getElementById('goConfigBtn').addEventListener('click', () => {
     scrollTo('sec-config');
     showToast('📋 Indo para Configurações...');
   });
   
   // ─── BOTÃO CONFIGURAÇÕES (header) ────────────────
   document.getElementById('configNavBtn').addEventListener('click', () => {
     scrollTo('sec-config');
     showToast('⚙ Configurações do perfil');
   });
   
   // ─── NOTIFICAÇÕES ────────────────────────────────
   const notifMessages = [
     '📚 Novo módulo disponível!',
     '✅ Revisão agendada para hoje',
     '🎯 Você completou 68% da semana!',
   ];
   let notifIndex = 0;
   document.getElementById('notifBtn').addEventListener('click', () => {
     const badge = document.getElementById('notifBadge');
     const count = parseInt(badge.textContent);
     if (count > 0) {
       showToast(notifMessages[notifIndex % notifMessages.length]);
       notifIndex++;
       const newCount = count - 1;
       badge.textContent = newCount;
       if (newCount === 0) badge.style.display = 'none';
     } else {
       showToast('Sem novas notificações');
     }
   });
   
   // ─── AVATAR ──────────────────────────────────────
   document.getElementById('avatarBtn').addEventListener('click', () => {
     scrollTo('sec-config');
     showToast('👤 Perfil de Fabrício');
   });
   
   // ─── CURSOS ──────────────────────────────────────
   document.getElementById('course1').addEventListener('click', () => {
     scrollTo('sec-study');
     showToast('📖 Abrindo Módulo 1...');
   });
   document.getElementById('course1').addEventListener('keydown', (e) => {
     if (e.key === 'Enter' || e.key === ' ') document.getElementById('course1').click();
   });
   document.getElementById('course2').addEventListener('click', () => {
     showToast('🔒 Módulo 2 disponível após concluir o Módulo 1');
   });
   document.getElementById('course2').addEventListener('keydown', (e) => {
     if (e.key === 'Enter' || e.key === ' ') document.getElementById('course2').click();
   });
   
   // ─── TAREFAS (toggle done/undone) ────────────────
   document.getElementById('taskList').addEventListener('click', (e) => {
     const btn = e.target.closest('.task-check');
     if (!btn) return;
     const item = btn.closest('.task-item');
     const isDone = item.dataset.done === 'true';
   
     if (isDone) {
       item.dataset.done = 'false';
       item.classList.remove('task-done');
       btn.classList.add('task-check--empty');
       btn.textContent = '';
       const name = item.querySelector('.task-name').textContent;
       showToast(`↩ "${name}" desmarcada`);
     } else {
       item.dataset.done = 'true';
       item.classList.add('task-done');
       btn.classList.remove('task-check--empty');
       btn.textContent = '✓';
       const name = item.querySelector('.task-name').textContent;
       showToast(`✅ "${name}" concluída!`);
     }
   });
   
   // ─── PAGINAÇÃO DA LEITURA ────────────────────────
   let currentPage = 0;
   const pages = document.querySelectorAll('.reading-page');
   const totalPages = pages.length;
   const prevBtn = document.getElementById('prevBtn');
   const nextBtn = document.getElementById('nextBtn');
   const pageIndicator = document.getElementById('pageIndicator');
   
   function goToPage(n) {
     pages[currentPage].classList.remove('active');
     currentPage = Math.max(0, Math.min(n, totalPages - 1));
     pages[currentPage].classList.add('active');
     pageIndicator.textContent = `Página ${currentPage + 1} de ${totalPages}`;
     prevBtn.disabled = currentPage === 0;
     nextBtn.disabled = currentPage === totalPages - 1;
     if (currentPage === totalPages - 1) {
       nextBtn.textContent = '✓ Concluído';
     } else {
       nextBtn.textContent = 'Próximo →';
     }
   }
   
   prevBtn.addEventListener('click', () => {
     if (currentPage > 0) { goToPage(currentPage - 1); showToast('← Página anterior'); }
   });
   nextBtn.addEventListener('click', () => {
     if (currentPage < totalPages - 1) {
       goToPage(currentPage + 1);
       showToast(`📄 Página ${currentPage + 1} de ${totalPages}`);
     } else {
       showToast('🎉 Leitura concluída! Parabéns!');
       nextBtn.style.background = 'var(--success)';
       nextBtn.style.borderColor = 'var(--success)';
       setTimeout(() => {
         nextBtn.style.background = '';
         nextBtn.style.borderColor = '';
       }, 2000);
     }
   });
   
   goToPage(0); // init
   
   // ─── MODO FOCO ────────────────────────────────────
   const focusToggle = document.getElementById('focusToggle');
   let focusActive = false;
   focusToggle.addEventListener('click', () => {
     focusActive = !focusActive;
     focusToggle.setAttribute('aria-checked', String(focusActive));
     document.body.classList.toggle('focus-mode', focusActive);
     showToast(focusActive ? '🎯 Modo Foco ativado' : '👁 Modo Foco desativado');
   });
   
   // ─── TROCA DE TEMA (cores de fundo) ──────────────
   const themeNames = { creme: 'Creme 🌿', pastel: 'Pastel 🌱', dark: 'Escuro 🌙', contrast: 'Alto Contraste ⚡' };
   document.querySelectorAll('.color-btn').forEach(btn => {
     btn.addEventListener('click', () => {
       const theme = btn.dataset.theme;
       document.documentElement.setAttribute('data-theme', theme);
       document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
       btn.classList.add('active');
       showToast(`🎨 Tema: ${themeNames[theme]}`);
     });
   });
   
   // ─── TROCA DE FONTE ──────────────────────────────
   document.getElementById('fontSans').addEventListener('click', function () {
     document.documentElement.setAttribute('data-font', 'sans');
     this.classList.add('active');
     document.getElementById('fontDys').classList.remove('active');
     showToast('🔤 Fonte: Sans Serif');
   });
   document.getElementById('fontDys').addEventListener('click', function () {
     document.documentElement.setAttribute('data-font', 'dyslexic');
     this.classList.add('active');
     document.getElementById('fontSans').classList.remove('active');
     showToast('🔤 Fonte: OpenDyslexic (espaçamento aumentado)');
   });
   
   // ─── SLIDER DE TAMANHO DE FONTE (painel sensorial) ─
   const fontSizeSlider = document.getElementById('fontSizeSlider');
   const fontSizeLabel  = document.getElementById('fontSizeLabel');
   fontSizeSlider.addEventListener('input', () => {
     const val = fontSizeSlider.value;
     fontSizeLabel.textContent = `${val}px`;
     document.querySelectorAll('.reading-text').forEach(el => {
       el.style.fontSize = `${val}px`;
     });
     // Sync com config panel
     const cfgSlider = document.getElementById('cfgFontSlider');
     if (cfgSlider) {
       cfgSlider.value = val;
       document.getElementById('cfgFontLabel').textContent = `${val}px`;
     }
   });
   
   // ─── SLIDER DE ESPAÇAMENTO ───────────────────────
   const lineHeightSlider = document.getElementById('lineHeightSlider');
   const lineHeightLabel  = document.getElementById('lineHeightLabel');
   lineHeightSlider.addEventListener('input', () => {
     const val = (lineHeightSlider.value / 100).toFixed(2);
     lineHeightLabel.textContent = val;
     document.querySelectorAll('.reading-text').forEach(el => {
       el.style.lineHeight = val;
     });
   });
   
   // ─── MAPA MENTAL ─────────────────────────────────
   const mindMapBtn       = document.getElementById('mindMapBtn');
   const mindMapContainer = document.getElementById('mindMapContainer');
   let mindMapOpen = false;
   mindMapBtn.addEventListener('click', () => {
     mindMapOpen = !mindMapOpen;
     mindMapContainer.hidden = !mindMapOpen;
     mindMapBtn.classList.toggle('active', mindMapOpen);
     if (mindMapOpen) {
       mindMapContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
       showToast('🧠 Mapa mental gerado!');
     } else {
       showToast('Mapa mental ocultado');
     }
   });
   
   // ─── ÁUDIO (Text-to-Speech) ──────────────────────
   const audioBtn      = document.getElementById('audioBtn');
   const audioBtnLabel = document.getElementById('audioBtnLabel');
   let speaking = false;
   let utterance = null;
   
   audioBtn.addEventListener('click', () => {
     if (!window.speechSynthesis) {
       showToast('⚠ Seu navegador não suporta TTS');
       return;
     }
   
     if (speaking) {
       window.speechSynthesis.cancel();
       speaking = false;
       audioBtnLabel.textContent = 'Ouvir Áudio';
       audioBtn.classList.remove('active');
       showToast('⏹ Áudio pausado');
       return;
     }
   
     const activePage = document.querySelector('.reading-page.active');
     const text = activePage ? activePage.innerText.trim() : 'Nenhum conteúdo';
     const speedVal = document.getElementById('audioSpeedSlider').value;
     const rate = parseFloat(speedVal) / 100;
   
    utterance = new SpeechSynthesisUtterance(text);

utterance.lang = 'pt-BR';

// Voz mais suave
utterance.rate = 0.9;   // velocidade mais calma
utterance.pitch = 1;    // tom natural
utterance.volume = 1;

// Procurar voz mais natural
const voices = speechSynthesis.getVoices();

const preferredVoice = voices.find(voice =>
  voice.lang.includes('pt-BR') &&
  (
    voice.name.includes('Google') ||
    voice.name.includes('Francisca') ||
    voice.name.includes('Maria')
  )
);

if (preferredVoice) {
  utterance.voice = preferredVoice;
}
   
     utterance.onend = () => {
       speaking = false;
       audioBtnLabel.textContent = 'Ouvir Áudio';
       audioBtn.classList.remove('active');
       showToast('✅ Leitura concluída!');
     };
   
     window.speechSynthesis.speak(utterance);
     speaking = true;
     audioBtnLabel.textContent = '⏹ Parar Áudio';
     audioBtn.classList.add('active');
     showToast('🔊 Lendo em voz alta...');
   });
   
   // ─── CONFIG: SLIDERS COM LABELS ──────────────────
   
   // Intensidade das cores
   const colorIntSlider = document.getElementById('colorIntSlider');
   const colorIntLabel  = document.getElementById('colorIntLabel');
   colorIntSlider.addEventListener('input', () => {
     const val = colorIntSlider.value;
     colorIntLabel.textContent = `${val}%`;
     document.documentElement.style.setProperty('--accent', `hsl(${230 + Math.round((val - 50) * 0.4)}, ${40 + Math.round(val * 0.4)}%, ${42 + Math.round((100 - val) * 0.1)}%)`);
   });
   
   // Tamanho da fonte (config panel)
   const cfgFontSlider = document.getElementById('cfgFontSlider');
   const cfgFontLabel  = document.getElementById('cfgFontLabel');
   cfgFontSlider.addEventListener('input', () => {
     const val = cfgFontSlider.value;
     cfgFontLabel.textContent = `${val}px`;
     document.querySelectorAll('.reading-text').forEach(el => { el.style.fontSize = `${val}px`; });
     // Sync com painel sensorial
     fontSizeSlider.value = val;
     fontSizeLabel.textContent = `${val}px`;
   });
   
   // Velocidade do áudio
   const audioSpeedSlider = document.getElementById('audioSpeedSlider');
   const audioSpeedLabel  = document.getElementById('audioSpeedLabel');
   audioSpeedSlider.addEventListener('input', () => {
     const rate = (audioSpeedSlider.value / 100).toFixed(1);
     audioSpeedLabel.textContent = `${rate}×`;
     if (utterance) utterance.rate = parseFloat(rate);
   });
   
   // Fragmentação
   const fragSlider = document.getElementById('fragSlider');
   const fragLabel  = document.getElementById('fragLabel');
   const fragNames  = ['Baixo', 'Médio', 'Alto'];
   fragSlider.addEventListener('input', () => {
     const val = parseInt(fragSlider.value);
     fragLabel.textContent = fragNames[val];
     showToast(`🧩 Fragmentação: ${fragNames[val]}`);
   });
   
   // ─── PREVIEW DO PERFIL ───────────────────────────
   function updatePreview() {
     const tags = [];
     if (document.getElementById('chkTDAH').checked)    tags.push('TDAH');
     if (document.getElementById('chkDislexia').checked) tags.push('Dislexia');
     if (document.getElementById('chkTEA').checked)      tags.push('TEA');
   
     const frag = fragNames[parseInt(fragSlider.value)];
     tags.push(`Fragmentação ${frag}`);
   
     const font = document.documentElement.getAttribute('data-font') === 'dyslexic' ? 'OpenDyslexic' : 'Sans Serif';
     tags.push(`Fonte ${font}`);
   
     if (document.getElementById('chkMindMap').checked) tags.push('Mapa Mental Auto');
   
     const container = document.getElementById('previewTags');
     container.innerHTML = tags.map(t => `<span class="preview-tag">${t}</span>`).join('');
   }
   
   ['chkTDAH','chkDislexia','chkTEA','chkMindMap'].forEach(id => {
     document.getElementById(id).addEventListener('change', updatePreview);
   });
   fragSlider.addEventListener('input', updatePreview);
   
   updatePreview(); // init
   
   // ─── SALVAR PERFIL ───────────────────────────────
   document.getElementById('saveProfileBtn').addEventListener('click', () => {
     const btn = document.getElementById('saveProfileBtn');
     btn.textContent = '⏳ Salvando...';
     btn.disabled = true;
   
     setTimeout(() => {
       btn.textContent = '✅ Perfil salvo!';
       btn.style.background = 'var(--success)';
       btn.style.borderColor = 'var(--success)';
       showToast('🎉 Perfil salvo com sucesso!', 3000);
   
       setTimeout(() => {
         btn.textContent = 'Salvar Perfil';
         btn.style.background = '';
         btn.style.borderColor = '';
         btn.disabled = false;
       }, 2000);
     }, 800);
   });
   
   // ─── CHECKBOX DISLEXIA → ativar fonte ────────────
   document.getElementById('chkDislexia').addEventListener('change', function () {
     if (this.checked) {
       document.documentElement.setAttribute('data-font', 'dyslexic');
       document.getElementById('fontDys').classList.add('active');
       document.getElementById('fontSans').classList.remove('active');
       showToast('🔤 Fonte OpenDyslexic ativada automaticamente');
     }
     updatePreview();
   });
   
   // ─── MAPA MENTAL AUTO (config) ───────────────────
   document.getElementById('chkMindMap').addEventListener('change', function () {
     if (this.checked) {
       mindMapOpen = true;
       mindMapContainer.hidden = false;
       mindMapBtn.classList.add('active');
       showToast('🧠 Mapa mental automático ativado');
       scrollTo('sec-study');
     } else {
       mindMapOpen = false;
       mindMapContainer.hidden = true;
       mindMapBtn.classList.remove('active');
       showToast('Mapa mental automático desativado');
     }
     updatePreview();
   });
   
   console.log('✦ Lumina Learning — app.js carregado com sucesso');