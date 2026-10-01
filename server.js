const http=require("http");
const WebSocket=require("ws");
const PORT=process.env.PORT||10000;
const server=http.createServer((req,res)=>{
 if(req.url==="/health"){res.writeHead(200,{"Content-Type":"application/json"});return res.end(JSON.stringify({ok:true,clients:wss.clients.size}))}
 res.writeHead(200,{"Content-Type":"text/plain; charset=utf-8"});res.end("Gesto → Arduino WebSocket online");
});
const wss=new WebSocket.Server({server,path:"/ws"});
wss.on("connection",ws=>{
 ws.send("CONNECTED");
 ws.on("message",raw=>{
  const msg=raw.toString().trim();
  if(!["0","1","2","3","4","5"].includes(msg))return;
  for(const c of wss.clients)if(c!==ws&&c.readyState===WebSocket.OPEN)c.send(msg);
 });
});
server.listen(PORT,"0.0.0.0",()=>console.log("Servidor na porta "+PORT));