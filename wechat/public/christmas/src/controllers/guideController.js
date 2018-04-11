/**
 * Created by jiangfengdun on 15/12/17.
 */
fishGame.guideController = fishGame.UIController.extend({
    ctor: function(){
        this._super();
    },

    __loadUI: function(){

    },

    __onInit: function(cb){
        $('#guide').click(function(){
            fishGame.UIController.open('game');
        })
        cb();
    },
    attach: function(){
        $('#guide').addClass('active');
    },
    deattach: function(){
        $('#guide').removeClass('active');
    },
    __onOpen: function(params, cb){
        if(fishGame.HELP.is_help){
            $('#guide .mui-scroll img')[0].src = 'https://static.souyidai.com/other/christmas/img/14001.png';
            $('#guide .mui-scroll img')[1].src = 'https://static.souyidai.com/other/christmas/img/14002.png';
        }
        setTimeout(function(){
            fishGame.UIController.open('game', {}, function(){

            });
        }, 2500);
        cb();
    }
});
