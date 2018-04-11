/**
 * Created by brain_000 on 2015/12/18.
 */
fishGame.LoadingController = fishGame.UIController.extend({
    ctor: function(){
        this._super();
    },

    __loadUI: function(){
        this.ui = $('#loading');
    },

    attach: function(){
        this.ui.show();
    },

    deattach: function(){
        this.ui.hide();
    }
});