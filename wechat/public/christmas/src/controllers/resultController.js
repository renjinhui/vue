/**
 * Created by jiangfengdun on 15/12/17.
 */
fishGame.resultController = fishGame.UIController.extend({
    ctor: function(){
        this._super();
    },
    __onInit: function(cb){
        /*�һ�*/
        var self = this;
        $('#r-exchange').click(function(){
            if(self.money <= 0)return;

            fishGame.UIController.open('reg', {type: self.type, money: self.money});
        });

        $('#replay').click(function(){
            fishGame.UIController.close();
        });

        cb();
    },

    __onOpen: function(params, cb){
        this.type = params.type;
        this.money = params.money;
        $('#score').text(params.money);

        if(this.money <= 0){
            $('#r-exchange').removeClass('mui-block');
            $('#r-exchange').hide();
        }else{
            $('#r-exchange').addClass('mui-block');
            $('#r-exchange').show();
        }

        cb();
    },

    attach: function(){
        $('#result').addClass('active');
    },
    deattach: function(){
        $('#result').removeClass('active');
    }
})