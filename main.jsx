import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.html('Hello, World!'))

app.use('/about', async (c, next) => {
  c.setRenderer((content, head) => {
    return c.html(
      <html>
        <head>
          <title>{head.title ?? ''}</title>
        </head>
        <body>
          <p>{content}</p>
        </body>
      </html>
    )
  })
  await next()
})

app.get('/about', (c) => {
  return c.render('Hello!', { title: 'Hono SSG Page' })
})

export default app
Deno.serve({ port: 8000 }, app.fetch) 
