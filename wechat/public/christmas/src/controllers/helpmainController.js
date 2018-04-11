/**
 * Created by brain_000 on 2015/12/19.
 */
fishGame.helpmainController = fishGame.UIController.extend({
    ctor: function(){
        this._super();
    },

    __onInit: function(cb){

        this.max = 1;

        this.helpInfo = null;

        var self = this;

        $('#help-play').click(function(){

            if(fishGame.HELP.is_help && fishGame.HELP.uid == fishGame.HELP.self_uid){
                fishGame.UIController.alert({
                    content: '<p style="padding: 10px;color: black; font-weight: 500;">自己不能帮自己哟</p>',
                    close: '知道啦'
                });
                return;
            }

            if(self.helpInfo.count_play <= 0){
                fishGame.UIController.alert({
                    content: '<p style="padding: 10px;color: black; font-weight: 500;">今天你已经帮过他了，为自己赚礼物吧</p>',
                    close: '知道啦'
                });
                return;
            }
            fishGame.UIController.open('guide');
        });



        $('#help-rules').click(function(){


            fishGame.UIController.open('intro');
        });

        $('#help-nav').click(function(){
            window.IS_HELP = false;
            fishGame.HELP.is_help = false;
            fishGame.UIController.open('main');
        });

        cb();
    },

    __onOpen: function(params, cb){
        var uid = fishGame.getParameter('friend_uid');

        var self = this;

        fishGame.API.getInviterInfo(uid, function(succ, data){
            self.helpInfo = data;

            $('#help-inviter').text(data.friend_username);
            $('#help-inviter-head').attr('src', data.friend_picture);

            $('#time').text(data.count_play);

            if(data.count_play <= 0){
                $('#help-play').attr('src', 'https://static.souyidai.com/other/christmas/img/5001.png');
            }else{
                $('#help-play').attr('src', 'https://static.souyidai.com/other/christmas/img/2.png');
            }

            cb();
        });
    },

    attach: function(){
        $('#helpmain').addClass('active');
    },
    deattach: function(){
        $('#helpmain').removeClass('active');
    }
})
