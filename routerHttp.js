// Router HTTP / HTTPS
let path = require('path');
let mobile = require('is-mobile');
let bank   = require('./routes/bank');
module.exports = function(app, redT) {
    // Home
    app.get('/', function(req, res) {
        if (mobile({ua:req})){
            return res.redirect('/mobile/');
        } else {
            return res.redirect('/web/');
        }
    });
    app.get('/web/', function(req, res) {
        if (mobile({ua:req})){
            return res.redirect('/mobile/');
        } else {
            return res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
        }
    });
    app.get('/mobile/', function(req, res) {
        if (mobile({ua:req})){
            return res.sendFile(path.join(process.cwd(), 'public', 'index_mobile.html'));
        } else {
            return res.redirect('/web/');
        }
    });

    // Android
    app.get('/download/android', function(req, res) {
        return res.sendFile(path.join(process.cwd(), 'public', 'download', 'android.html'));
    });

    // Admin
    app.get('/68ClubA/', function(req, res) {
        return res.sendFile(path.join(process.cwd(), 'public', 'admin.html'));
    });

    // Fanpage
    app.get('/fanpage/', function(req, res) {
        return require('./routes/fanpage/redirect')(res);
    });

    // Help IOS
    app.get('/help/ios/', function(req, res) {
        return res.sendFile(path.join(process.cwd(), 'public', 'help', 'ios.html'));
    });

    //Telegram
    app.get('/telegram/', function(req, res) {
        return require('./routes/telegram/redirect')(res);
    });
    
    // thesieutoc callback
    app.post('/dothienlong/tst_callback', function(req, res) {
        return require('./app/Controllers/shop/nap_the_callback')(req,res);
    });

    // Bank
    app.get('/bank/', function(req, res) {
        bank(res, req.query);
    });

    // Sign API
    require('./routes/api')(app, redT);  // load routes API
};