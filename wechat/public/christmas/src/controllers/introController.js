/**
 * Created by brain_000 on 2015/12/18.
 */
fishGame.introController = fishGame.UIController.extend({
    ctor: function(){
        this._super('res/intro.json');
    },

    __onInit: function(cb){
        mui('#intro').scroll();

        $('#intro-content').click(function(){
            fishGame.UIController.close();
        });

        cb();
    },

    attach: function(){
        $('#intro').addClass('active');
    },
    deattach: function(){
        $('#intro').removeClass('active');
    }
})