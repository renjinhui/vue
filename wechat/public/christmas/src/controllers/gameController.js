/**
 * Created by brain_000 on 2015/12/17.
 */
fishGame.gameController = fishGame.UIController.extend({
    ctor: function(){
        this._super();

        /*预生成物品列表*/
        this.stuffs = [];

        /*下落物品列表*/
        this.fallings = [];

        this.frequence = 800;

        this.frequenceCounter = 0;

        this.offset = 30;

        this.timer = 0;

        this.timerId = null;

        this.max = 18000;

        this.musicOn = true;

        this.score = 0;

        this.pause = false;

        this.last = 0;

        this.template = '<img class="stuff" />';

        this.sprites = {
            1: ['https://static.souyidai.com/other/christmas/img/8006.png','https://static.souyidai.com/other/christmas/img/8007.png','https://static.souyidai.com/other/christmas/img/8008.png','https://static.souyidai.com/other/christmas/img/8009.png','https://static.souyidai.com/other/christmas/img/8010.png','https://static.souyidai.com/other/christmas/img/8011.png'],
            2: ['https://static.souyidai.com/other/christmas/img/8012.png'],
            3: {
                1: 'https://static.souyidai.com/other/christmas/img/12001.png',
                2: 'https://static.souyidai.com/other/christmas/img/12002.png',
                3: 'https://static.souyidai.com/other/christmas/img/12003.png'
            }
        };

        this.gifts = {
            1: 'https://static.souyidai.com/other/christmas/img/13003.png',
            2: 'https://static.souyidai.com/other/christmas/img/13002.png',
            3: 'https://static.souyidai.com/other/christmas/img/13001.png',
            4: 'https://static.souyidai.com/other/christmas/img/13005.png',
            5: 'https://static.souyidai.com/other/christmas/img/13006.png',
            6: 'https://static.souyidai.com/other/christmas/img/13004.png'
        };

        this.timerId = null;

        this.isRunning = false;
    },

    attach: function(mainScene){
        $('#game').addClass('active');
        $('body').on('touchmove', function(event){
            event.preventDefault();
        })
    },
    deattach: function(mainScene){
        $('#game').removeClass('active');
        $('body').off();
    },
    __loadUI: function(){

    },
    __onInit: function(cb){
        var self = this;

        this.timerItem = $('#game-timer');
        this.scoreItem = $('#game-score');
        this.musicItem = $('#game-music');
        this.sockItem = $('#game-bottom');

        this.stuffsItem = $('#stuffs');

        this.musicItem.click(function(){
            if(self.musicOn){
                self.musicOn = false;

                self.musicItem.attr('src', 'https://static.souyidai.com/other/christmas/img/8002.png');
            }else{
                self.musicOn = true;

                self.musicItem.attr('src', 'https://static.souyidai.com/other/christmas/img/8001.png');
            }
        });

        console.log($('#game-gift-close'));

        $('#game-gift-close').click(function(){
            $('#game-get-gift').hide();

            self._resume();
        });

        //this.stuffsItem.on('tap', function(event){
        //    var fallings = self.fallings;
        //
        //    for(var i = 0, length = fallings.length; i < length; ++i){
        //        var falling = fallings[i];
        //        var trans = falling.css('-webkit-transform').match(/\-?[0-9]+/g);
        //
        //        if(!trans)continue;
        //        var x = falling.offset().left,
        //            y = parseInt(trans[5]),
        //            width = falling.width(),
        //            height = falling.height();
        //
        //        var touch = event.originalEvent.detail.changedTouches[0];
        //        var px = touch.pageX, py = touch.pageY;
        //
        //        if(x < px && x+width > px && y < py && y+height > py){
        //            self.onHit(falling);
        //            break;
        //        }
        //    }
        //});

        this.pos = ['8%', '28%', '48%', '68%'];

        cb();
    },

    startTimer: function(){
        if(this.timerId)return;

        var self = this;

        this.last = Date.now();
        this.timerId = setInterval(function(){
            self.update();
        }, 200);
    },

    stopTimer: function(){
        if(this.timerId){
            clearInterval(this.timerId);

            this.timerId = null;
        }
    },

    __onOpen: function(params, cb){
        var self = this;

        if(fishGame.HELP.is_help){
            fishGame.API.getInviterInfo(fishGame.HELP.uid, function(succ, resp){
                if(!!succ){

                    self.userInfo = resp;

                    fishGame.API.getGift(function(succ, gift){
                        if(!!succ){
                            self.gift = gift;
                        }
                        self.__onOpen__(cb);
                    });
                }
            });

            return;
        }

        fishGame.API.getUserInfo(function(succ, resp){
            if(!!succ){
                self.userInfo = resp;
            }

            self.__onOpen__(cb);
        });
    },

    __onOpen__: function(cb){
        this.counter = 0;
        this.score = 0;
        this.frequenceCounter = 0;
        this.frequence = 350;

        this.timer = 0;
        this.timerItem.text("0:18");
        this.score = 0;
        this.scoreItem.text("0");
        this.stuffsItem.empty();
        this.scoreCounter = 0;

        this.awardId = null;

        this.height = $(window).height()-this.sockItem.height();

        this.pause = false;

        this.speed = 3000;

        var hasGift = this.random(0, 10000) < 3000;

        var prepare = 80;

        var stuffs = this.stuffs;
        var sprites = this.sprites;

        var goods = sprites[2];
        var bads = sprites[1];
        var goodLength = goods.length;
        var badLength = bads.length;

        stuffs.length = 0;

        var numGoods = 0;
        for(var i = 0; i < prepare; ++i){
            if(this.random(0, 10000) < 3000 && numGoods < 15){
                ++numGoods;
                stuffs.push([2, goods[this.random(0, goodLength)]]);
            }else{
                stuffs.push([1, bads[this.random(0, badLength)]]);
            }
        }

        /*如果是帮助模式，且获得了实物奖品，随机插入到某个位置*/
        if(fishGame.HELP.is_help && this.userInfo && this.gift && this.gift.type > 0){
            var index = this.random(0, 20);
            stuffs.splice(index, 0, [3, 'https://static.souyidai.com/other/christmas/img/8005.png']);

            $('#friend-name').text(this.userInfo.friend_username);
            $('#gift-name').text(this.gift.desc);
        }

        this.isRunning = true;

        //this.startTimer();

        var self = this;
        setTimeout(function(){
            self.__onStart();
        }, 1000)

        cb();
    },

    __onStart: function(){
        var self = this;
        $('#audio-bg')[0].play()

        $('#game-ready').transition({
            scale: 1
        }, 'fast', function(){
            setTimeout(function(){
                $('#game-ready').css({scale: 0});

                $('#game-go').transition({
                    scale: 1
                }, 'fast', function(){
                    setTimeout(function(){
                        $('#game-go').css({scale: 0});
                        self.startTimer();
                    }, 500);
                })
            }, 500)
        })
    },
    __onClose: function(cb) {
        this.stopTimer();

        cb();
    },
    update: function(){
        var now = Date.now();

        if(!this.isRunning || this.pause){
            this.last = now;
            return;
        }

        this.updateFrequence(Math.max(200, now - this.last));

        this.last = now;

        if(this.timer >= this.max){
            this.gameOver();
        }
    },

    updateFrequence: function(dt){
        this.timer += dt;

        this.frequenceCounter += dt;

        if(this.frequenceCounter >= this.frequence){
            this.generateStuff();

            this.frequenceCounter -= this.frequence;
        }

        if(this.timer < 2){

        }else if(this.timer <= 4000){
            this.frequence = 350;
            this.speed = 3000;
        }else if(this.timer <= 6000){
            this.frequence = 350;
            this.speed = 2800;
        }else if(this.timer <= 8000){
            this.frequence = 350;
            this.speed = 2600;
        }else if(this.timer <= 10000){
            this.frequence = 350;
            this.speed = 2400;
        }else if(this.timer <= 12000){
            this.frequence = 350;
            this.speed = 2200;
        }else if(this.timer <= 14000){
            this.frequence = 350;
            this.speed = 2000;
        }else if(this.timer <= 16000){
            this.frequence = 350;
            this.speed = 1800;
        }else{
            this.frequence = 350;
            this.speed = 1600;
        }

        console.log(this.frequence);

        this.timerItem.text("0:"+Math.max(0, Math.floor(Math.min(this.max - this.timer, this.max)/1000)));

    },
    gameOver: function(){
        this._pause();

        for(var i = this.fallings.length; i >= 0; --i){
            this.removeStuff(i);
        }

        //if(this.score > 0){
            fishGame.API.setRecord(fishGame.HELP.is_help, fishGame.HELP.uid || '', this.score, fishGame.HELP.is_help ? this.awardId : null, function(){});
        //}

        if(fishGame.HELP.is_help){
            fishGame.UIController.open('helpresult', {score: this.score, award: this.awardId ? this.gift : null});
        }else{
            fishGame.UIController.open('result', {money: this.score, type: 1, award: this.awardId ? this.gift : null});
        }

    },
    generateStuff: function(){
        var setting = this.stuffs.shift();

        var col = this.random(0, 4);

        var stuff = $(this.template);



        stuff.attr({
            'src': setting[1],
            'data-type': setting[0],
            'id': 'stuff-'+(++this.counter)
        });
        if(setting[0] == 3){
            console.log(setting);
            console.log(stuff.attr('src'));
        }
        stuff.css('left', this.pos[col]);

        this.stuffsItem.append(stuff);

        var self = this;
        stuff.on('touchstart', function(){
            self.onHit($(this));
        });

        this.fallings.push(stuff);

        var self = this;

        stuff.attr('data-start', Date.now());

        stuff.transition({
            y: $(window).height()-this.sockItem.height()
        }, this.speed, 'in', function(){
            self.onStuffDestory($(this));
        });
    },

    random: function(min, max){
        return Math.floor(Math.random()*(max-min)+min);
    },

    _pause: function(){
        this.pause = true;

        $('#stuffs .stuff').hide();

        var fallings = this.fallings;
        for(var i = fallings.length - 1; i >= 0; --i){
            this.removeStuff(i);
        }
    },
    _resume: function(){
        this.pause = false;

        this.last = Date.now() - 1000;

        $('#stuffs .stuff').show();
    },

    /*落入*/
    onStuffDestory: function(stuff){
        var index = this.indexOf(stuff);

        if(index === -1)return;

        if(!this.pause){
            var stuff = this.fallings[index];

            var type = stuff.attr('data-type');

            /*加分项*/
            if(type == 2){
                this.addScore(1);

                this.showScore(stuff, 1);
            }/*扣分项*/
            else if(type == 1){
                this.addScore(-1);

                this.showScore(stuff, -1);
            }/*黄金便便出现时，如果用户没点上，扣10分*/
            else if(type == 3){
                this.addScore(-10);

                this.showScore(stuff, -10);
            }
        }


        this.removeStuff(index);
    },

    showScore: function(stuff, score){
        var template = null;
        switch(score){
            case 1:
                template = '<img src="https://static.souyidai.com/other/christmas/img/9001.png" style="position: absolute; z-index: 3;"/>';
                break;
            case -1:
                template = '<img src="https://static.souyidai.com/other/christmas/img/9003.png" style="position: absolute; z-index: 3;"/>';
                break;
            case -10:
                template = '<img src="https://static.souyidai.com/other/christmas/img/9004.png" style="position: absolute; z-index: 3;"/>';
                break;
        }

        if(!template)return;

        template = $(template);

        template.css({
            'position': 'absolute',
            'left': stuff.offset().left,
            'top': $(window).height()-this.sockItem.height()-60,
            'id': 'score-'+(this.scoreCounter++),
            'transform': 'scale(0)',
            '-webkit-transform': 'scale(0)'
        });

        this.stuffsItem.append(template);

        var self = this;
        template.transition({
            scale: 1
        }, 'fast', function(){
            setTimeout(function(){
                template.remove();
            }, 500)
        });
    },

    addScore: function(score){
        this.score = Math.max(0, this.score+score);

        this.scoreItem.text(this.score);
    },

    /*点击*/
    onHit: function(stuff){
        var index = this.indexOf(stuff);

        if(index === -1)return;

        if(!this.pause){
            var type = stuff.attr('data-type');

            var template = $('<img src="https://static.souyidai.com/other/christmas/img/9007.png" style="position: absolute; z-index: 3;" />');

            template.css({
                'left': stuff.offset().left,
                'top': stuff.offset().top,
                'transform': 'scale(0)',
                '-webkit-transform': 'scale(0)'
            });



            template.transition({
                scale: 1
            }, 'fast', function(){
                setTimeout(function(){
                    template.remove();
                }, 500);
            });

            this.stuffsItem.append(template);

            /*加分项*/
            if(type == 2){
                //this.score += 10;

                //this.scoreItem.text(this.score);
            }
            else if(type == 1){
                //this.score = Math.min(0, this.score-10);

                //this.scoreItem.text(this.score);

                if(this.musicOn)
                    $('#audio-click')[0].play();
            }else if(type == 3){
                this._pause();

                var cloud = $('#game-cloud');
                var x = cloud.offset().left, y = cloud.offset().y,
                    width = cloud.width(), height = cloud.height();

                $('#game-gift-img').attr('src', this.gifts[this.gift.type]);

                this.awardId = this.gift.id;

                if(this.musicOn)
                    $('#audio-bingo')[0].play();

                $('#game-get-gift').show();
            }
        }

        this.removeStuff(index);
    },

    removeStuff: function(index){
        if(index < 0 || index >= this.fallings.length)return;

        var stuff = this.fallings[index];

        stuff.off();

        this.fallings.splice(index ,1);

        stuff.remove();
    },

    indexOf: function(stuff){
        var id = stuff.attr('id');
        var fallings = this.fallings;

        for(var i = 0, length = fallings.length; i < length; ++i){
            if(fallings[i].attr('id') === id){
                return i;
            }
        }

        return -1;
    }
})
