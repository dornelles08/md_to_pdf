import type { Request, Response } from "express";

export function home(req: Request, res: Response) {
  res.send(`
    <html>
      <head>
        <title>Conversor MD para PDF (Bun Edition)</title>
        <style>
            body { font-family: sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
            textarea { width: 100%; height: 300px; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
            button { display: inline-flex; align-items: center; justify-content: center; padding: 10px 20px; font-size: 16px; background: #f6821f; color: white; border: none; cursor: pointer; margin-top: 10px; border-radius: 4px; transition: background 0.2s; }
            button:hover { background: #e06c00; }
            button:disabled { background: #9ca3af; cursor: not-allowed; }
            
            /* Spinner de carregamento */
            .spinner { display: none; width: 16px; height: 16px; border: 2px solid #ffffff; border-radius: 50%; border-top-color: transparent; animation: spin 1s linear infinite; margin-left: 8px; }
            @keyframes spin { to { transform: rotate(360deg); } }
        </style>
      </head>
      <body>
        <h1>Conversor Markdown</h1>
        <form action="/convert" method="POST" id="pdfForm">
            <textarea name="markdown" placeholder="# Digite seu Markdown aqui..."></textarea>
            <br>
            <button type="submit" id="submitBtn">
                <span>Gerar PDF</span>
                <div class="spinner"></div>
            </button>
        </form>
        
        <script>
            const form = document.getElementById('pdfForm');
            const btn = document.getElementById('submitBtn');
            const spinner = btn.querySelector('.spinner');
            
            form.addEventListener('submit', () => {
                btn.disabled = true;
                spinner.style.display = 'block';
                // Reabilita o botão após 5 segundos para permitir nova conversão
                setTimeout(() => { btn.disabled = false; spinner.style.display = 'none'; }, 5000);
            });
        </script>
      </body>
    </html>
  `);
}
