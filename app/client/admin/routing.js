Router.route('/', function () {
  document.body.style.backgroundImage = "url('/backgroundBlank.jpg')";
  this.render('admin');
});
