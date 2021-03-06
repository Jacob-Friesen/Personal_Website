module.exports = function(app){
  app.get('/', render_get_page);
  app.get('/home', render_get_page);
  app.get('/demos', render_get_page);
  app.get('/experience', render_get_page);
  app.get('/skills', render_get_page);
  app.get('/blog', render_get_page);
  
  app.post('/home', render_post_page);
  app.post('/demos', render_post_page);
  app.post('/experience', render_post_page);
  app.post('/skills', render_post_page);
  app.post('/blog', render_post_page);
  
  // gzipping main js file
  app.get('/js/min.js', function (req, res, next) {
    res.header('Content-Encoding', 'gzip');
    req.url = req.url + '.gz';
    next();
  });
  
  // Testing only
  app.get('/test', function(req, res){
    res.render('test/index.html', {layout: false});
  });
}

function render_post_page(req, res){
  res.render(req.url.substring(1) + "/index", { title: constant.title, prev_loaded: true });
}

function render_get_page(req, res){
  // Whatever page is passed in the system loads
  if (req.url == "/") req.url = "/" + constant.pages[0].toLowerCase();
  constant.to_load = req.url.substring(1);//remove /
  
  res.render('index', { title: constant.page_text[constant.to_load].title, prev_loaded: false});
}

//ಠ_ಠ
