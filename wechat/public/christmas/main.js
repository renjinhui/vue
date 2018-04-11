/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

(function(){
    $(function(){
        $('#audio-click')[0].play();
        $('#audio-click')[0].pause();

        $('#audio-bg')[0].play();
        $('#audio-bg')[0].pause();

        $('#audio-bingo')[0].play();
        $('#audio-bingo')[0].pause();

        $('#audio-bg1')[0].play();
        $('#audio-bg1')[0].pause();

        $('#audio-bg1')[0].play();

        function has3d() {
            if (!window.getComputedStyle) {
                return false;
            }

            var el = document.createElement('p'),
                has3d,
                transforms = {
                    'webkitTransform':'-webkit-transform',
                    'OTransform':'-o-transform',
                    'msTransform':'-ms-transform',
                    'MozTransform':'-moz-transform',
                    'transform':'transform'
                };

            // Add it to the body to get the computed style.
            document.body.insertBefore(el, null);

            for (var t in transforms) {
                if (el.style[t] !== undefined) {
                    el.style[t] = "translate3d(1px,1px,1px)";
                    has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                }
            }

            document.body.removeChild(el);

            return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
        }

        //var trans = '@-webkit-keyframes stuff-fall{from{-webkit-transform: TRANS_FROM;-moz-transform: TRANS_FROM;-ms-transform: TRANS_FROM;-o-transform: TRANS_FROM;transform: TRANS_FROM;}to{-webkit-transform: TRANS_TO;-moz-transform: TRANS_TO;-ms-transform: TRANS_TO;-o-transform: TRANS_TO;transform: TRANS_TO;}}@keyframes stuff-fall{from{-webkit-transform: TRANS_FROM;-moz-transform: TRANS_FROM;-ms-transform: TRANS_FROM;-o-transform: TRANS_FROM;transform: TRANS_FROM;}to{-webkit-transform: TRANS_TO;-moz-transform: TRANS_TO;-ms-transform: TRANS_TO;-o-transform: TRANS_TO;transform: TRANS_TO;}}';
        //
        //var height = $(window).height();
        //
        //var scale = $(window).width() / 582;
        //var sockHeight = height * scale;
        //
        //var y = ((height - sockHeight)*2)+'px';
        //
        //alert(y);
        //
        //var transFrom = 'translate3d(0,-100px,0)';
        //var transTo = 'translate3d(0,'+(y)+',0)';
        //
        //if(!false){
        //    alert('2d mode');
        //    transFrom = 'translateY(-100px)';
        //    transTo = 'translateY('+(y)+')';
        //}
        //
        //alert(height+','+scale+','+sockHeight);
        //
        //trans = trans.replace(/TRANS_FROM/g, transFrom);
        //trans = trans.replace(/TRANS_TO/g, transTo);
        //
        //var head = document.getElementsByTagName('head')[0],
        //    style = document.createElement('style');
        //
        //alert(trans);
        //
        //style.type = 'text/css';
        //
        //if(style.styleSheet){
        //
        //    style.styleSheet.cssText = trans;
        //
        //}else{
        //
        //    style.appendChild(document.createTextNode(trans));
        //
        //}
        //
        //head.appendChild(style);
        if(fishGame.HELP.is_help){
            fishGame.UIController.open('helpmain');
        }else{
            fishGame.UIController.open('main');
        }

    });
})();