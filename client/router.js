
Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});

Router.map(function(){
    this.route('main', {path: '/'});
    this.route('register', {path: '/register'});
    this.route('game', {
    					path: '/game/:_id', 
    					data: function(){
					    	var params = this.params;
					  		var id = params._id;
					  		return {_id: params._id};
					    }
	});
});