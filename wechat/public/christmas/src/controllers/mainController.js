/**
 * Created by brain_000 on 2015/12/17.
 */
fishGame.mainController = fishGame.UIController.extend({
    ctor: function(){
        this._super();
    },

    __loadUI: function(){

    },

    __onInit: function(cb){

        var self = this;

        $('#play').click(function(){
            _paq.push(['trackEvent', 'christmas', 'play', 'start']);
            if(self.userInfo.count_play === 0){
                fishGame.UIController.alert({
                    content: '<p style="padding: 10px;color: black; font-weight: 500;">今天机会已经用完，快找好友帮忙获取红包和实物圣诞礼包！</p>',
                    close: '知道啦'
                });
                return;
            }

            if(fishGame.HELP.is_help && fishGame.HELP.uid == fishGame.HELP.self_uid){
                fishGame.UIController.alert({
                    content: '<p style="padding: 10px;color: black; font-weight: 500;">自己不能帮自己玩，分享给好友帮你赚礼物吧！</p>',
                    close: '知道啦'
                });
            }

            fishGame.UIController.open('guide');
        });

        $('#rules').click(function(){
            fishGame.UIController.open('intro');
        });

        /*兑换页*/
        $('#exchange').click(function(){
            fishGame.UIController.open('qrcode1');
        });

        /*打开分享*/
        $('#invite').click(function(){
            $('#share-mask').show();
        });

        $('#share-mask').click(function(){
            $('#share-mask').hide();
        })

        mui('#main').scroll();

        cb();
    },

    __onOpen: function(params, cb){
        var redPocket = null, friends = null, userInfo = null;

        var self = this;

        fishGame.API.getUserInfo(function(succ, data){
            userInfo = data;

            self.userInfo = userInfo;

            fishGame.API.getFriendRewards(function(succ, data){
                friends = data.list;
                self.score = data.score;
                self._refresh(data.score, friends, userInfo);

                cb();
            });
        });


    },

    attach: function(){
        $('#main').addClass('active');
    },
    deattach: function(){
        $('#main').removeClass('active');
    },

    _refresh: function(score, friends, user){
        $('.tip .value.rp').text(score);

        var template = '<li class="mui-table-view-cell mui-media reward"><a href="javascript:;"><div class="mui-media-object mui-pull-left head" ><img src="https://static.souyidai.com/other/christmas/img/4.png"/></div><div class="mui-media-body"><p class="name"></p><p class="word"></p><p class="award"></p></div></a></li>'

        friends = friends || [];

        friends.sort(function(a, b){
            return b.is_self - a.is_self;
        });

        var list = $('#friends');

        if(friends && friends.length > 1){
            $('#none').hide();
        }else{
            $('#none').show();
        }

        list.empty();

        for(var i = 0, length = friends.length; i < length; ++i){
            var reward = $(template);
            var friend = friends[i];

            var head = reward.find('.head > img'),
                name = reward.find('.name'),
                word = reward.find('.word'),
                award = reward.find('.award');

            if(friend.money > 0){
                if(friend.is_self){
                    reward.addClass('mine');
                    word.text('我赚了'+friend.money+'元圣诞红包');
                }else{
                    word.text('给我赚了'+friend.money+'元圣诞红包');
                }
            }else{
                word.hide();
            }



            /*实物奖励*/
            if(friend.award_type > 0){
                award.text('帮我获得'+friend.award_desc);
            }else{
                award.hide();
            }

            name.text(friend.username);

            head.attr('src', friend.picture);

            list.append(reward);
        }

        if(this.userInfo.count_play === 0 || (fishGame.HELP.is_help && fishGame.HELP.uid == fishGame.HELP.self_uid)){
            $('#play').attr('src', 'https://static.souyidai.com/other/christmas/img/5001.png');
        }else{
            $('#play').attr('src', 'https://static.souyidai.com/other/christmas/img/2.png');
        }
    }
});
