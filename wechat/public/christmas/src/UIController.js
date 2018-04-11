/**
 * Created by brain_000 on 2015/12/17.
 */
(function(){
    fishGame.UIController = cc.Class.extend({
        ctor: function(uifile){
            this.uifile = uifile;

            this.actions = null;

            this.node = null;

            this.needRelayout = true;
        },
        attach: function(scene){
            scene.addChild(this.getNode());
        },
        deattach: function(scene){
            this.getNode().removeFromParent(false);
        },
        onInit: function(cb){
            if(!this.node){
                this.__loadUI();
            }

            this.__onInit(cb||function(){});
        },
        onOpen: function(params, cb){
            this.__onOpen(params, cb||function(){});
        },
        onDestroy: function(cb){
            this.__onDestroy(cb||function(){});
        },
        onClose: function(cb){
            this.__onClose(cb||function(){});
        },

        __onInit: function(cb){
            cb();
        },
        __onOpen: function(params, cb){
            cb();
        },
        __onDestroy: function(cb){
            cb();
        },
        __onClose: function(cb){
            cb();
        },

        __loadUI: function(){
            //var ui = ccs.load(this.uifile);
            //
            //if(!ui){
            //    return;
            //}
            //
            //this.actions = ui.actions;
            //this.node = ui.node;
            //
            //this.needRelayout = true;
        },

        getNode: function(){
            if(!this.node)return null;

            if(this.needRelayout){
                var winSize = cc.director.getWinSize();

                this.node.setContentSize(winSize);

                ccui.helper.doLayout(this.node);

                this.needRelayout = false;
            }

            return this.node;
        },
        getByName: function(name){
            return this.__getByName(this.node, name);
        },
        __getByName: function(root, name){
            if(!root)return null;

            var node = root.getChildByName(name);

            if(node)return node;

            var children = root.getChildren();

            for(var i = 0, length = children.length; i < length; ++i){
                node = this.__getByName(children[i], name);

                if(node){
                    return node;
                }
            }

            //return null;
        }
    });

    var caches = {};

    var stacks = [];

    var mainScene = null;

    fishGame.UIController.open = function(name, params, cb){
        var prev = stacks.length > 0 ? stacks[stacks.length-1] : null;

        var open = function(name, callback){
            getController(name, function(exists, controller){
                //mainScene.addChild(controller.getNode());
                controller.attach(mainScene);

                stacks.push(name);

                controller.onOpen(params, function(){
                    callback && callback();
                });
            })
        };

        if(prev){
            if(prev == name){
                callback && callback();
                return;
            }

            getController(prev, function(exists, controller){
                controller.onClose(function(){
                    //controller.getNode().removeFromParent(false);

                    controller.deattach(mainScene);

                    open(name, cb);
                });
            });
            return;
        }

        open(name, cb);
    };

    fishGame.UIController.close = function(){
        if(stacks.length <= 1)return;

        var willClose = stacks.pop();
        var willShow = stacks[stacks.length-1];

        getController(willShow, function(exists, controller){
            controller.onOpen({}, function(){
                getController(willClose, function(e, c){
                    c.onClose(function(){
                        //c.getNode().removeFromParent(false);
                        c.deattach(mainScene);

                       // mainScene.addChild(controller.getNode());
                        controller.attach(mainScene);
                    });
                });
            });
        });
    };

    var getController = fishGame.UIController.getController = function(name, cb){
        var controllerName = name+'Controller';

        if(caches[controllerName]){
            cb && cb(true, caches[controllerName]);
            return;
        }

        if(fishGame[controllerName]){
            var controller = new fishGame[controllerName]();
            controller.onInit(function(){
                caches[controllerName] = controller;

                cb && cb(true, controller);
            });
            return;
        }

        return fishGame[controllerName];
    };

    fishGame.UIController.releaseController = function(name){
        var controllerName = name+'Controller';

        var controller = caches[controllerName];

        if(controller){
            controller.onDestroy();

            delete caches[controllerName];
        }
    };

    fishGame.UIController.init = function(options){
        mainScene = options.scene;
    };

    fishGame.UIController.showLoading = function(){
        getController('loading', function(exists, controller){
            controller.attach();
        });
    };

    fishGame.UIController.hideLoading = function(){
        getController('loading', function(exists, controller){
            controller.deattach();
        });
    };

    fishGame.UIController.alert = function(params){
        $('#alert .content').empty();

        $('#alert .btn-group a').removeClass('two');

        if(params.content){
            console.log($('#alert .content'));
            $('#alert .content').html(params.content);
        }

        if(params.ok && params.close){
            $('#alert .btn-group a').addClass('two');
        }

        if(params.ok){
            $('#alert .btn-group .right').text(params.ok);
        }

        if(params.close){
            $('#alert .btn-group .left').text(params.close);
        }

        $('#alert .btn-group .left').click(function(){
            $('#alert').removeClass('active');
        });

        $('#alert .btn-group .right').click(function(){
            if(params.okcb){
                params.okcb();
            }

            $('#alert').removeClass('active');
        });

        $('#alert').addClass('active');
    };
})();