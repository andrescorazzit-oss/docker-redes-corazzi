const http = require(&#39;http&#39;);
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL;
const VERSION = process.env.APP_VERSION || &#39;1.0&#39;;
const server = http.createServer(async (req, res) =&gt; {
console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
if (req.url === &#39;/health&#39;) {
res.writeHead(200, { &#39;Content-Type&#39;: &#39;application/json; charset=utf-8&#39; });
res.end(JSON.stringify({ estado: &#39;ok&#39;, version: VERSION, puerto: PORT }));
return;
}
if (req.url === &#39;/api&#39;) {
try {
const respuesta = await fetch(API_URL);
const datos = await respuesta.text();
res.writeHead(respuesta.status, { &#39;Content-Type&#39;: &#39;application/json; charset=utf-8&#39; });
res.end(datos);
} catch (error) {
console.error(&#39;Error al conectar con la API:&#39;, error.message);
res.writeHead(502, { &#39;Content-Type&#39;: &#39;application/json; charset=utf-8&#39; });
res.end(JSON.stringify({ error: &#39;no se pudo conectar con api-interna&#39; }));
}
return;
}
res.writeHead(200, { &#39;Content-Type&#39;: &#39;text/html; charset=utf-8&#39; });
res.end(`
&lt;h1&gt;Redes con Docker&lt;/h1&gt;

Sistemas Operativos - 4.º año

&lt;p&gt;Servicio público funcionando&lt;/p&gt;
&lt;p&gt;Versión ${VERSION}&lt;/p&gt;
&lt;p&gt;&lt;a href=&quot;/health&quot;&gt;Comprobar /health&lt;/a&gt;&lt;/p&gt;
&lt;p&gt;&lt;a href=&quot;/api&quot;&gt;Consultar /api&lt;/a&gt;&lt;/p&gt;
`);
});
server.listen(PORT, &#39;0.0.0.0&#39;, () =&gt; {
console.log(`web-publica escuchando en ${PORT}`);
});
