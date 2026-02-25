import type { Request, Response } from "express";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --bg-primary: #0d0d0d;
    --bg-secondary: #161616;
    --bg-tertiary: #1e1e1e;
    --bg-elevated: #252525;
    --text-primary: #e8e6e3;
    --text-secondary: #9a9590;
    --text-muted: #5c5955;
    --accent: #d4a574;
    --accent-hover: #e8c49a;
    --accent-glow: rgba(212, 165, 116, 0.15);
    --border: #2a2a2a;
    --border-light: #333333;
    --success: #7cb87c;
    --error: #c97070;
  }

  * { box-sizing: border-box; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    min-height: 100vh;
    margin: 0;
    padding: 0;
    position: relative;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(ellipse 80% 50% at 50% -20%, var(--accent-glow), transparent),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    z-index: 0;
  }

  .app {
    position: relative;
    z-index: 1;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
    min-height: 100vh;
  }

  header {
    text-align: center;
    margin-bottom: 2.5rem;
    animation: fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 0.95rem;
    color: var(--text-secondary);
    font-weight: 400;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
  }

  .panel {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .panel:hover {
    border-color: var(--border-light);
  }

  .panel:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 1px var(--accent-glow);
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    background: var(--bg-tertiary);
    border-bottom: 1px solid var(--border);
  }

  .panel-title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-secondary);
  }

  .panel-badge {
    font-size: 0.65rem;
    padding: 0.25rem 0.6rem;
    background: var(--bg-elevated);
    border-radius: 20px;
    color: var(--text-muted);
    font-family: 'JetBrains Mono', monospace;
  }

  .editor-wrapper {
    position: relative;
  }

  textarea {
    width: 100%;
    height: 450px;
    padding: 1.25rem;
    background: var(--bg-secondary);
    border: none;
    color: var(--text-primary);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    line-height: 1.7;
    resize: none;
    outline: none;
  }

  textarea::placeholder {
    color: var(--text-muted);
  }

  .toolbar {
    display: flex;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: var(--bg-tertiary);
    border-top: 1px solid var(--border);
    align-items: center;
  }

  .file-upload {
    position: relative;
  }

  .file-upload input {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.65rem 1.25rem;
    font-size: 0.8rem;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .btn-secondary {
    background: var(--bg-elevated);
    color: var(--text-secondary);
    border: 1px solid var(--border);
  }

  .btn-secondary:hover {
    background: var(--border);
    color: var(--text-primary);
  }

  .btn-primary {
    background: var(--accent);
    color: var(--bg-primary);
    font-weight: 600;
  }

  .btn-primary:hover {
    background: var(--accent-hover);
    transform: translateY(-1px);
    box-shadow: 0 4px 20px var(--accent-glow);
  }

  .btn-primary:active {
    transform: translateY(0);
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .spinner {
    display: none;
    width: 14px;
    height: 14px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
  }

  .loading .spinner {
    display: block;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .preview-box {
    height: 450px;
    padding: 1.25rem;
    overflow-y: auto;
    background: var(--bg-secondary);
  }

  .preview-box::-webkit-scrollbar {
    width: 8px;
  }

  .preview-box::-webkit-scrollbar-track {
    background: var(--bg-tertiary);
  }

  .preview-box::-webkit-scrollbar-thumb {
    background: var(--border-light);
    border-radius: 4px;
  }

  .preview-box::-webkit-scrollbar-thumb:hover {
    background: var(--text-muted);
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--text-muted);
    font-size: 0.9rem;
    padding: 2rem;
    text-align: center;
  }

  .empty-state svg {
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
    opacity: 0.4;
  }

  /* Preview Content Styles */
  .preview-content {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    line-height: 1.7;
    color: var(--text-primary);
  }

  .preview-content h1,
  .preview-content h2,
  .preview-content h3 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    margin: 1.5rem 0 0.75rem 0;
    color: var(--text-primary);
  }

  .preview-content h1 { font-size: 1.75rem; }
  .preview-content h2 { font-size: 1.4rem; }
  .preview-content h3 { font-size: 1.15rem; }

  .preview-content p {
    margin: 0 0 1rem 0;
  }

  .preview-content a {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  .preview-content a:hover {
    border-bottom-color: var(--accent);
  }

  .preview-content code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8em;
    background: var(--bg-tertiary);
    padding: 0.2em 0.4em;
    border-radius: 4px;
    color: var(--accent);
  }

  .preview-content pre {
    background: var(--bg-tertiary);
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1rem 0;
  }

  .preview-content pre code {
    background: none;
    padding: 0;
    color: var(--text-primary);
  }

  .preview-content blockquote {
    border-left: 3px solid var(--accent);
    margin: 1rem 0;
    padding: 0.5rem 0 0.5rem 1rem;
    color: var(--text-secondary);
    font-style: italic;
  }

  .preview-content ul,
  .preview-content ol {
    margin: 0 0 1rem 0;
    padding-left: 1.5rem;
  }

  .preview-content li {
    margin: 0.25rem 0;
  }

  .preview-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }

  .preview-content th,
  .preview-content td {
    border: 1px solid var(--border);
    padding: 0.5rem 0.75rem;
    text-align: left;
  }

  .preview-content th {
    background: var(--bg-tertiary);
    font-weight: 600;
  }

  .preview-content tr:nth-child(even) {
    background: var(--bg-tertiary);
  }

  .preview-content img {
    max-width: 100%;
    border-radius: 8px;
    margin: 1rem 0;
  }

  /* Task lists */
  .preview-content .task-list-item {
    list-style: none;
    margin-left: -1.25rem;
  }

  .preview-content .task-list-item input {
    margin-right: 0.5rem;
  }

  /* Animations */
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 900px) {
    .container {
      grid-template-columns: 1fr;
    }
    
    h1 {
      font-size: 2.25rem;
    }
    
    .app {
      padding: 1.5rem 1rem;
    }
  }
`;

export function home(req: Request, res: Response) {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MarkDocument — Conversor Markdown → PDF</title>
        <meta name="description" content="Converta seus documentos Markdown em PDF com estilo">
        <style>${styles}</style>
      </head>
      <body>
        <div class="app">
          <header>
            <h1>MarkDocument</h1>
            <p class="subtitle">Conversor Markdown → PDF</p>
          </header>
          
          <div class="container">
            <div class="panel">
              <div class="panel-header">
                <span class="panel-title">Editor</span>
                <span class="panel-badge">Markdown</span>
              </div>
              <div class="editor-wrapper">
                <textarea 
                  id="markdown" 
                  placeholder="# Seu documento aqui...

## Exemplo de uso

Escreva em **Markdown** e visualize o resultado em tempo real.

- [x] Task completa
- [ ] Task pendente

\`\`\`javascript
console.log('Hello, World!');
\`\`\`"
                  spellcheck="false"
                ></textarea>
              </div>
              <div class="toolbar">
                <div class="file-upload btn btn-secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <span>Carregar arquivo</span>
                  <input type="file" id="fileInput" accept=".md,.markdown,.txt">
                </div>
                <button class="btn btn-secondary" id="previewBtn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  Preview
                </button>
                <button class="btn btn-primary" id="submitBtn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                  <span>Gerar PDF</span>
                  <div class="spinner"></div>
                </button>
              </div>
            </div>
            
            <div class="panel">
              <div class="panel-header">
                <span class="panel-title">Preview</span>
                <span class="panel-badge">HTML</span>
              </div>
              <div class="preview-box" id="preview">
                <div class="empty-state">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <span>Digite ou carregue um arquivo Markdown<br>para ver o preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <script>
          const markdownInput = document.getElementById('markdown');
          const fileInput = document.getElementById('fileInput');
          const previewBox = document.getElementById('preview');
          const previewBtn = document.getElementById('previewBtn');
          const submitBtn = document.getElementById('submitBtn');
          
          let debounceTimer = null;
          
          fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (ev) => {
                markdownInput.value = ev.target.result;
                updatePreview();
              };
              reader.readAsText(file);
            }
          });
          
          async function updatePreview() {
            const text = markdownInput.value;
            if (!text.trim()) {
              previewBox.innerHTML = \`
                <div class="empty-state">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <span>Digite ou carregue um arquivo Markdown<br>para ver o preview</span>
                </div>
              \`;
              return;
            }
            try {
              const resp = await fetch('/preview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ markdown: text })
              });
              const data = await resp.json();
              if (data.error) {
                previewBox.innerHTML = \`<div class="empty-state" style="color: var(--error)">\${data.error}</div>\`;
              } else {
                previewBox.innerHTML = \`<div class="preview-content">\${data.html}</div>\`;
              }
            } catch (e) {
              previewBox.innerHTML = \`<div class="empty-state" style="color: var(--error)">Erro ao gerar preview</div>\`;
            }
          }
          
          markdownInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(updatePreview, 300);
          });
          
          previewBtn.addEventListener('click', updatePreview);
          
          submitBtn.addEventListener('click', () => {
            const formData = new FormData();
            formData.append('markdown', markdownInput.value);
            
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            fetch('/convert', {
              method: 'POST',
              body: formData
            })
            .then(resp => {
              if (!resp.ok) {
                return resp.json().then(err => { throw new Error(err.error || 'Erro'); });
              }
              return resp.blob();
            })
            .then(blob => {
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'documento.pdf';
              a.click();
              URL.revokeObjectURL(url);
            })
            .catch(err => {
              alert('Erro: ' + err.message);
            })
            .finally(() => {
              submitBtn.disabled = false;
              submitBtn.classList.remove('loading');
            });
          });
          
          // Initial preview check
          if (markdownInput.value.trim()) {
            updatePreview();
          }
        </script>
      </body>
    </html>
  `);
}
