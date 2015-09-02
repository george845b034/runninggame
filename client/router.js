
Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function(){
    this.route('main', {path: '/'});
    this.route('register', {path: '/register'});
    this.route('georgeuse', {path: '/georgeuse'});
});