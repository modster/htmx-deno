import { Hono } from "hono";

const app = new Hono();
let counter = 0;

app.get("/", (c) => {
  return c.html(
    <html>
      <head>
        <title>HTMX Page</title>
        <script
          src="https://unpkg.com/htmx.org@2.0.4/dist/htmx.js"
          integrity="sha384-oeUn82QNXPuVkGCkcrInrS1twIxKhkZiFfr2TdiuObZ3n3yIeMiqcRzkIcguaof1"
          crossorigin="anonymous"
        >
        </script>
      </head>
      <body>
        <div id="parent-div">
          <button
            hx-post="/"
            hx-trigger="click"
            hx-target="#parent-div"
            hx-swap="outerHTML"
          >
            {counter}
          </button>
        </div>
      </body>
    </html>,
  );
});

app.post("/", (c) => {
  counter++;
  return c.html(
    <div id="parent-div">
      <button
        hx-post="/"
        hx-trigger="click"
        hx-target="#parent-div"
        hx-swap="outerHTML"
      >
        {counter}
      </button>
    </div>,
  );
});

export default app;
Deno.serve({ port: 8000 }, app.fetch);