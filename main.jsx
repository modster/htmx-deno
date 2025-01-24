import { Hono } from "hono";

const app = new Hono();
let counter = 0;

app.use("/", async (c, next) => {
  c.setRenderer((content, head) => {
    return c.html(
      <html>
        <head>
          <title>{head.title ?? ""}</title>
          <script src="https://unpkg.com/htmx.org@2.0.4"></script>
        </head>
        <body>
          <p>{content}</p>
        </body>
      </html>,
    );
  });
  await next();
});

app.get("/", (c) => {
  return c.render("Hello!", { title: "Hono SSG Page" });
});

app.get("/htmx", (c) => {
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
            hx-post="/htmx"
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

app.post("/htmx", (c) => {
  counter++;
  return c.html(
    <div id="parent-div">
      <button
        hx-post="/htmx"
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
