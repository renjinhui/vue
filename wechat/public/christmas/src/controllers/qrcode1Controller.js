/**
 * Created by brain_000 on 2015/12/18.
 */
fishGame.qrcode1Controller = fishGame.UIController.extend({
    ctor: function(){
        this._super('');
    },

    __onInit: function(cb){
        mui('#qrcode1').scroll();

        $('#qrcode1').click(function(){
           //fishGame.UIController.close();
        });

        this.styles = {
            1: {
                'padding-left': '30%',
                'font-size': '20px'
            },
            2: {
                'padding-left': '30%',
                'font-size': '20px'
            },
            3: {
                'padding-left': '30%',
                'font-size': '20px'
            },
            4: {
                'padding-left': '12%',
                'font-size': '18px'
            },
            5: {
                'padding-left': '15%',
                'font-size': '18px'
            },
            6: {
                'padding-left': '15%',
                'font-size': '18px'
            }

        }

        cb();
    },

    attach: function(){
        $('#qrcode1').addClass('active');
    },
    deattach: function(){
        $('#qrcode1').removeClass('active');
    },

    checkExchange: function(key){
        /*已领取过*/
        if((this.changeType == 2 && this.rewards.is_cash_friend != 1) || (this.changeType === 1 && this.rewards.is_cash_self != 1)){
            var html = '<p style="color:black;">北鼻,今天的圣诞红包你已经</p><p style="color:black;">领了哟~但还有，“实物圣诞大礼”</p><p style="color:black;">在等你,邀请好友助你玩出</p><p style="color:black;">新奖励！</p>';

            fishGame.UIController.alert({
                content: html,
                close: '新技能GET'
            });

            return false;
        }

        if(this.rewards.money_usable <= 0){
            var html = '<p style="color:black;">今日领取红包金额超过最大限制</p>';

            fishGame.UIController.alert({
                content: html,
                close: '新技能GET'
            });

            return false;
        }

        if((this.changeType == 1 && this.rewards.money_usable < this.rewards.money_self) || (this.changeType == 2 && this.rewards.money_usable < this.rewards.money_friend)){
            var html = '<p style="color:black;">每日累计兑换金额为'+fishGame.Constant.MAX+'元,当前申请的兑换额度已超出总额,您今日还可以再兑换'+(this.rewards.money_usable)+'元</p>';

            var self = this;

            fishGame.UIController.alert({
                content: html,
                close: '暂不兑换',
                ok: '立即兑换',
                okcb: function(){
                    self.doExchangeMoney()
                }
            });

            return false;
        }
        return true;
    },
    doExchangeMoney: function(){

        var change = 0;

        if(this.changeType === 1){
            change = this.rewards.money_self;
        }else if(this.changeType === 2){
            change = this.rewards.money_friend;
        }

        if(this.rewards.money_use + change > fishGame.Constant.MAX){
            change = fishGame.Constant.MAX - this.rewards.money_use;
        }

        if(change > 0){
            fishGame.UIController.open('reg', {money: change,type:this.changeType});
        }

    },

    doExchangeAward: function(awardType, awardId){
        setTimeout(function(){
            fishGame.UIController.open('reg', {awardType: awardType, awardId: awardId, type:this.changeType});
        }, 300);

    },

    __onOpen: function(params, cb) {
        var self = this;

        fishGame.API.getUserInfo(function (succ, data) {

            self.userInfo = data;

            self.isBind = data.is_bind;

            fishGame.API.getRewards(function (succ, data) {
                self.rewards = data;

                self._refresh();

                cb();
            });
        });
    },

    _refresh: function(){
        $('#mine .exchange').off();
        $('#friend .exchange').off();
        $('#applewatch .exchange').off();
        $('#jingdong .exchange').off();
        $('#hongmi .exchange').off();


        $('#qr-exchange').text(Math.max(0, this.rewards.money_usable));
        $('#qr-free').text(Math.max(0, this.rewards.money_use));

        var self = this;

        if(this.rewards.is_cash_self){
            $('#mine .exchange').addClass('free');/*立即兑换*/

            ///*灰色立即兑换*/
            //if(this.rewards.money_self <= 0){
            //    $('#mine .exchange').addClass('none');
            //}else{
            //    /*立即兑换*/
            //}

            $('#mine .exchange.free').click(function(event){
                event.stopPropagation();

                //if(self.rewards.money_self <= 0)return;

                self.changeType = 1;
                if(self.checkExchange()){
                    self.doExchangeMoney();
                }
            });
        }else {
            $('#mine .exchange').addClass('none');/*灰色立即兑换*/
            if(self.rewards.convert_money_self === 0){
                $('#mine .exchange').addClass('free');/*已兑换*/
            }

        }
        $('#mine .value').text(this.rewards.money_self+'元');

        /*好友红包*/
        $('#friend').addClass('exist');

        if(this.rewards.is_cash_friend){
            $('#friend .exchange').addClass('free'); /*立即兑换*/

            //if(this.rewards.money_friend <= 0){
            //    $('#friend .exchange').addClass('none');
            //}

            $('#friend .exchange.free').click(function(){
                event.stopPropagation();

                //if(self.rewards.money_friend <= 0)return;

                self.changeType = 2;
                if(self.checkExchange()){
                    self.doExchangeMoney();
                }
            });
        }else{
            $('#friend .exchange').addClass('none');    /*灰色立即兑换*/
            if(self.rewards.convert_money_friend === 0){
                $('#friend .exchange').addClass('free'); /*已兑换*/
            }
        }

        $('#friend .value').text(this.rewards.money_friend+'元');

        var awards = this.rewards.awards;

        var template = "<div class='reward1 exist' align='left'><p class='type'></p><p class='value'></p><p class='extra'></p><p class='exchange'></p></div>";

        var container = $('#awards');

        container.empty();

        for(var i = 0, length = awards.length; i < length; ++i){
            var awardTemplate = $(template),
                award = awards[i];

            switch(award.type){
                case 1:
                case "1":
                    awardTemplate.find('.type').text('京东e卡一张');
                    awardTemplate.find('.value').text('100元');
                    break;
                case 2:
                case "2":
                    awardTemplate.find('.type').text('京东e卡一张');
                    awardTemplate.find('.value').text('50元');
                    break;
                case 3:
                case "3":
                    awardTemplate.find('.type').text('水果卡一张');
                    awardTemplate.find('.value').text('100元');
                    break;
                case 4:
                case "4":
                    awardTemplate.find('.type').text('空气净化器');
                    awardTemplate.find('.value').text('小米空气净化器');
                    break;
                case 5:
                case "5":
                    awardTemplate.find('.type').text('小米手机一部');
                    awardTemplate.find('.value').text('小米NOTE3');
                    break;
                case 6:
                case "6":
                    awardTemplate.find('.type').text('苹果手表');
                    awardTemplate.find('.value').text('AppleWatch');
                    break;
            }

            awardTemplate.find('.value').css(this.styles[award.type]);

            if(!award.code || award.code == ''){
                awardTemplate.find('.exchange').addClass('free');
                awardTemplate.find('.extra').hide();
            }else{
                if(award.type == 1 || award.type == 2 || award.type == 3){
                    awardTemplate.find('.extra').text('兑换码: '+award.code);
                }else{
                    awardTemplate.find('.extra').hide();
                }
                awardTemplate.attr('data-code', award.code);
            }

            awardTemplate.attr('data-type', award.type);
            awardTemplate.attr('data-id', award.id);


            container.append(awardTemplate);
        }

        var self = this;
        container.find('.reward1').click(function(event){
            event.stopPropagation();

            var code = $(this).attr('data-code');
            var id = $(this).attr('data-id');

           if(code){
               return ;
           }

            self.doExchangeAward($(this).attr('data-type'), $(this).attr('data-id'));
        });
    }
})
