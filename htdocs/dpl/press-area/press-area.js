define(function(require, exports, module){
    require('./press-area.css');
    var tpl = require('./press-area.tpl');
    var data = require('./press-area.json');
    var templatable = require('../../js/templatable');

    exports.init = function(){
        var html = templatable.compile(tpl, {
            list: data.list,
            option: data.option
        });
        $('#page-contain').html( html );
    };
});
