module.exports = function(app){
  app.get('/', render_main_page);
  app.get('/home', render_main_page);
  app.get('/demos', render_main_page);
  
  app.post('/home', function(req, res){
    res.render('home/index', { title: constant.title, prev_loaded: true });
  });
  app.post('/demos', function(req, res){
    res.render('demos/index', { title: constant.title, prev_loaded: true });
  });
}

function render_main_page(req, res){
  // Whatever page is passed in the system loads
  if (req.url == "/") req.url = "/" + constant.pages[0].toLowerCase();
  constant.to_load = req.url.substring(1);//remove /
  
  res.render('index', { title: constant.page_text[constant.to_load].title, prev_loaded: false});
}
