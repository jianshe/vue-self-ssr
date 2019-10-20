const express = require('express')
const Vue = require('vue')

const app = express();
const page = new Vue({
    data: {name:'开课吧'},
    template: '<div>{{name}}</div>'
})

// 1.渲染器
const renderer = require('vue-server-renderer').createRenderer();

app.get('/', async function(req, res){
    // 2.执行渲染
    const html = await renderer.renderToString(page)
    res.send(html);
})

app.listen(3000, () => {
    console.log('渲染服务器就绪');
    
})