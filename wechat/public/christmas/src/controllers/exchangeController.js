/**
 * Created by jiangfengdun on 15/12/19.
 */
fishGame.exchangeController = fishGame.UIController.extend({
    ctor: function(){
        this._super();
    },
    __onInit: function(cb){

        $('#exchange-download').click(function(){
            window.location.href = fishGame.Constant.DOWNLOAD;
        });

        $('#exchange-share').click(function(){
            $('#exchange-mask').show();
        });

        $('#exchange-mask').click(function(){
            $(this).hide();
        });

        cb();
    },

    attach: function(){
        $('#exchange-page').addClass('active');
    },
    deattach: function(){
        $('#exchange-page').removeClass('active');
    },

    __onOpen: function(params, cb){
        var money = params.money,
            isBind = params.isBind,
            awardType = params.awardType,
            awardId = params.awardId,
            phone = params.phone,
            type = params.type,
            code = params.code;

        if(isBind || awardId){
            if(!awardId){
                $('#exchange-money').show();
                $('#exchange-award').hide();
                $('#exchange-card').hide();
                $('#exchange-value').text(money);
                $('#exchange-phone').text(phone);
                $('#exchange-word').text('领取成功');
                $('#exchange-word').css({
                    'font-size': '28px'
                })
            }else{
                $('#exchange-money').hide();
                $('#exchange-award').show();
                var award = null;
                switch(awardType){
                    case 1:
                    case "1":
                        award = '京东e卡100元';
                        break;
                    case 2:
                    case "2":
                        award = '京东e卡50元';
                        break;
                    case 3:
                    case "3":
                        award = '水果卡100元';
                        break;
                    case 4:
                    case "4":
                        award = '小米空气净化器';
                        break;
                    case 5:
                    case "5":
                        award = '小米NOTE3';
                        break;
                    case 6:
                    case "6":
                        award = 'AppleWatch';
                        break;
                }
                $('#exchange-word').text('成功获得'+award);
                $('#exchange-word').css({
                    'font-size': '20px'
                });

                if(!(awardType == 1 || awardType == 2 || awardType == 3)){
                    $('#exchange-code').text('关注搜易贷服务号(微信号: souyidai888)回复“领奖”领取');
                    $('#exchange-card').hide();
                }else{
                    $('#exchange-code').text('兑换码: '+code);
                    $('#exchange-card').show();
                }
            }


            $('#exchange-old').show();
        }else{

            /**/
            var img = $('#exchange-new-img');

            var windowWidth = $('body').width();
            var x = img.position().left, y = img.position().top;
            var width = windowWidth * 0.8;

            var scale = width / 568;

            $('#exchange-new-word').css({
                'position': 'absolute',
                'left': (270 * scale)+'px',
                'top': (370 * scale)+'px',
                'width': 72,
                'height': 32,
                'color': '#f9e15f',
                'font-size': '24px'
            });

            $('#exchange-new-word').text(money+'元');

            $('#exchange-new').show();
        }

        var img = $('#exchange-img');
        var x = img.position().left, y = img.position().top;
        var width = img.width(), height = img.height();

        $('#exchange-word').css({
            left: (x + width * 0.14)+'px',
            top: y+'px',
            width: width * (1-0.28),
            height: (height),
            'line-height': (height*0.8)+'px',
            'vertical-align': 'middle',
            'z-index': 2
        });
    }
});