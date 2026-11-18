import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dotenv from 'dotenv'

// Load .env into process.env immediately — makes VISION_API_KEY and
// VISION_MODEL available to the api/analyze.js middleware at runtime
dotenv.config()

/** Vite plugin: serves api/analyze.js as a local middleware so /api/analyze
 *  works during `vite dev` without needing `vercel dev`. */
function localApiPlugin() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api/analyze', async (req, res) => {
        // Collect raw body chunks
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        try { req.body = JSON.parse(Buffer.concat(chunks).toString()) }
        catch { req.body = {} }

        // Shim: res.status(code).json(data) — matches Vercel/Express style
        res.status = (code) => ({
          json(data) {
            res.writeHead(code, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(data))
          }
        })

        try {
          const { default: handler } = await import('./api/analyze.js')
          await handler(req, res)
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ ok: false, error: 'Handler error: ' + e.message }))
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localApiPlugin()],
})
