/**
 * Created by brain_000 on 2015/12/19.
 */
fishGame.helpresultController = fishGame.UIController.extend({
    ctor: function(){
        this._super();
    },
    __onInit: function(cb){

        $('#help-result-nav').click(function(){
            window.IS_HELP = false;
            fishGame.HELP.is_help = false;

            fishGame.UIController.open('main');
        });

        cb();
    },

    __onOpen: function(params, cb){
        var award = params.award;
        var score = params.score;



        var iwidth = 367, iheight = 187;
        var fwidth = 463, wheight = 143;

        var hwidth = 86;

        var inviter = $('#help-result-inviter'),
            friend = $('#help-result-friend');


        console.log(inviter.width(), inviter.height(), inviter.offset(), inviter.position());

        console.log(friend.width(), friend.height(), friend.offset(), friend.position());

        var fscale = friend.width() / fwidth;
        var iscale = inviter.width() / iwidth;



        console.log(iscale, fscale);

        $('#inviter-head').css({
            'position': 'absolute',
            'left': Math.max(0,inviter.offset().left - hwidth * fscale),
            'top': inviter.offset().top,
            'width': hwidth*fscale,
            'height': hwidth*fscale,
            'border-radius': '3px',

        });

        $('#friend-head').css({
            'position': 'absolute',
            'left': friend.offset().left + friend.width() - hwidth*fscale,
            'top': friend.offset().top,
            'width': hwidth*fscale,
            'height': hwidth*fscale,
            'border-radius': '3px'
        });

        var x = inviter.position().left, y = inviter.position().top;
        var width = inviter.width(), height = inviter.height();

        $('#help-result-score').css({
            'position': 'absolute',
            'left': (x + 0.078 * width)+'px',
            'top': (y + 0.198 * height)+'px',
            'width': (width *0.60),
            'height': (height - height * 0.198),
            'font-size': '14px',
            'color': 'black'
        });

        $('#help-result-score').empty();
        /*有实物奖励*/
        if(award){
            $('#help-result-inviter').attr('src', 'https://static.souyidai.com/other/christmas/img/6002.png');
            $('#help-result-score').html('嗨，我帮你赚到了<span style="color: #f9e15f;">'+score+'元</span>圣诞红包,<span style="color: #f9e15f">'+award.desc+'</span>圣诞礼物哦!怎么报答我?');
        }else{
            $('#help-result-inviter').attr('src', 'https://static.souyidai.com/other/christmas/img/6003.png');
            $('#help-result-score').html('嗨，我帮你赚到了<span style="color: #f9e15f;">'+score+'元</span>圣诞红包哦,怎么报答我?');
        }

        fishGame.API.getInviterInfo(fishGame.HELP.uid, function(succ, data){
            $('#inviter-head').attr('src', data.picture);
            $('#friend-head').attr('src', data.friend_picture);

        });

        cb();
    },

    attach: function(){
        $('#helpresult').addClass('active');
    },
    deattach: function(){
        $('#helpresult').removeClass('active');
    }
})