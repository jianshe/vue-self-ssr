const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send(`
    <html>
<div>
<div id="app">
<h1>开课吧</h1>
<p class="demo">开课吧还不错</p>
开课吧web全栈架构师打开页面 查看源码
浏览器拿到的，就是全部的dom结构
SPA时代
到了vue，react时代，单页应用优秀的用户体验，逐渐成为了主流，页面整体是JS渲染出来的，称之为
客户端渲染CSR
</div>
</body>
</html>`);
});

app.listen(3000, () => {
  console.log('启动成功');
});
