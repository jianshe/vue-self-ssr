const express = require('express')
const fs = require('fs')

const app = express();

// 1.渲染器
const {createBundleRenderer} = require('vue-server-renderer');
const bundle = require('../dist/server/vue-ssr-server-bundle.json')

app.use(express.static('../dist/client', {index: false}))

// bundle是服务端包
const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync('../public/index.tmpl.html', "utf-8"),
    clientManifest: require('../dist/client/vue-ssr-client-manifest.json')
})

app.get('*', async function(req, res) {
    console.log(req.url);
    
    const context = {
        title: 'SSR Test',
        url: req.url
    }

    // 2.执行渲染
    const html = await renderer.renderToString(context)
    res.send(html);
})

app.listen(3000, () => {
    console.log('渲染服务器就绪');
    
})