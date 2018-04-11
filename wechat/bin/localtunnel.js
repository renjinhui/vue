const express = require('express');
const localtunnel = require('localtunnel');
const app = express();

var tunnel = localtunnel(8889, {
    subdomain: 'liuxuewensyd'
}, function(err, tunnel) {
    if (err) {
        console.log('error');
    }

    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
    const url = tunnel.url;
    console.log(url);
});

tunnel.on('close', function() {
    console.log('重启');
    tunnel;
});
app.use((req, res, next) => {
    tunnel;
});
app.listen(7081);