/**
 * Created by brain_000 on 2015/12/18.
 */
fishGame.regController = fishGame.UIController.extend({
    ctor: function(){
        this._super('');
    },
    __loadUI: function(){
        this.login1 = $('#login1');
        this.login2 = $('#login2');
        this.login3 = $('#login3');
    },

    __onInit: function(cb){

        this.phone = null;

        this.password = null;

        this.imgCode = null;

        this.code = null;

        this.fetching = false;

        var self = this;

        $('#next1').click(function(){
            var phone = $('#phone').val(),
                code = $('#imgcode').val();

            if(!/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(phone)){
                alert('请正确填写手机号');
                return;
            }

            if(!code || code == ''){
                alert('请输入验证码内容');
                return;
            }


            self.phone = phone;

            self.imgCode = code;

            fishGame.API.verify({
                captcha: code,
                phone: phone,
                money: self.money
            }, function(succ, data){
                /*已绑定，是不是就该跳过了?*/
                if(data.is_bind === 2){
                  alert('图形验证码错误');
                  $('#imgcodeContent').trigger('click');
                }else if(data.is_bind === 1){
                  //fishGame.UIController.open('exchange', {money: self.money, isBind: 1, phone: phone, type: self.type, awardId: self.awardId, awardType: self.awardType});
                  self.doExchange(1);
                } else {
                  self.show('login2');
                }
            });
        });

        $('#imgcodeContent').click(function(){
            /*刷新图片验证码*/

            if(self.fetching)return;
            self.fetching = true;

            fishGame.API.getImgCode(function(succ, url){
                self.fetching = false;

                $('#imgcodeContent').attr("src", url);
            })

        });

        $('#next2').click(function(){
            var code = $('#code').val(),
                password = $('#password').val();

            if(!password || password == ''){
                alert('请输入密码');
                return;
            }

            if(!code || code == ''){
                alert('请输入短信验证码');
                return;
            }

            self.code = code;
            self.password = password;

            fishGame.UIController.showLoading();

            /*发出注册请求*/
            fishGame.API.register({
                captcha: code,
                phone: self.phone,
                password: self.password,
                money: self.money
            }, function(succ, data){
                fishGame.UIController.hideLoading();
                if (succ) {
                  self.doExchange(0);
                }
            });
        });

        /*获取验证码*/
        $('#fetchcode').click(function(){
            if(self.fetching)return;

            self.fetching = true;

            fishGame.API.getImgCode(function(succ, url){
                self.fetching = false;

                $('#imgcodeContent').attr("src", url);
            })
        });

        cb();
    },

    attach: function(scene){
        //this.show('login1');
    },
    deattach: function(){
        $('.page.active').removeClass('active');
    },
    doExchange: function(isBind){
        var type = this.type;

        var self = this;

        if(self.money){
            fishGame.API.setReward(type, self.money, self.phone, null, function(succ){
                if(succ){
                    fishGame.UIController.open('exchange', {
                        money: self.money,
                        isBind: isBind,
                        phone: self.phone,
                        type: self.type
                    })
                }
            });
            return;
        }

        fishGame.API.setReward(type, 0, self.phone, self.awardId, function(succ, resp){
            if(succ){
                fishGame.UIController.open('exchange', {
                    money: self.money,
                    isBind: isBind,
                    phone: self.phone,
                    type: self.type,
                    awardId: self.awardId,
                    awardType: self.awardType,
                    code: resp.code
                })
            }
        });
    },
    show: function(page){
        $('.page.active').removeClass('active');

        $('#'+page).addClass('active');
    },

    __onOpen: function(params, cb){
        this.money = params.money;
        this.type = params.type;
        this.awardId = params.awardId || null;
        this.awardType = params.awardType || null;

        var self = this;
        //fishGame.UIController.open('exchange', {money: this.money, isBind: 1, phone: '13691010867', type: this.type, awardId: this.awardId, awardType: this.awardType});
        fishGame.API.getImgCode(function(succ, url){
            $('#imgcodeContent').attr('src', url);
            self.show('login1');

            cb();
        });
    },
})
