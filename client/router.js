
Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function(){
    this.route('main', {path: '/'});
    this.route('names81', {path: '/names81'});
    this.route('georgeuse', {path: '/georgeuse'});
});