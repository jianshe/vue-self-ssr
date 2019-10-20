const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

const resolve = dir => {
  return path.resolve(__dirname, dir);
};
// 1.渲染器
const { createBundleRenderer } = require('vue-server-renderer');
const bundle = require(resolve('../dist/server/vue-ssr-server-bundle.json'));
// 指定静态服务器目录，让其在client中下载（中间件）index: false 意思是把首页给关闭掉
app.use(express.static(resolve('../dist/client'), { index: false }));

// 2.bundle是服务端包
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync(resolve('../public/index.tmpl.html'), 'utf-8'),
  clientManifest: require(resolve(
    '../dist/client/vue-ssr-client-manifest.json'
  ))
});

app.get('*', async function(req, res) {
  console.log(req.url);
  const context = {
    title: 'SSR Test',
    url: req.url
  };
  // 2.执行渲染
  const html = await renderer.renderToString(context);
  res.send(html);
});

app.listen(3000, () => {
  console.log('渲染服务器就绪');
});
