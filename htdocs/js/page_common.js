define(function(require, exports, module){
    exports.init = function(){
        $('.page-area').live('mouseenter', function(){
            $(this).addClass('hover');
        });

        $('.page-area').live('mouseleave', function(){
            $(this).removeClass('hover');
        });

        //上移
        function up(){
            var pageArea = $(this).closest('.page-area');
            if (pageArea.index() != 0) {
                pageArea.prev().before(pageArea);
            }
        }
        $('.up').live('click', up);

        //下移
        function down(){
            var pageArea = $(this).closest('.page-area');
            var len = pageArea.length;
            pageArea.next().after(pageArea);
        }
        $('.down').live('click', down);

        //添加
        function add(e,offset){
            var target = $(e.target);
            var pageArea = target.closest('.page-area');
            var fixArea = pageArea.find('.fix-area');
            var html = '';
            if(fixArea.length > 0){
                var fixArea = pageArea.find('.fix-area:first');
                var top = fixArea.position().top + offset;
                var left = fixArea.position().left + offset;
                html = '<div class="ui-widget-content fix-area" style="top:'+ top +'px;left:'+ left +'px"></div>';
            }else{
                html = '<div class="ui-widget-content fix-area"></div>';
            }
            pageArea.find('.page-area-contant').append( html );

            $( ".fix-area" ).each(function(){
                $(this).resizable({
                    helper: "ui-resizable-helper"
                });
            });

            $( ".fix-area" ).each(function(){
                $(this).draggable({
                    zIndex: 9999
                });
            });
        }

        var offset = 0;
        $('.add').live('click', function(e){
            offset += 10;
            add(e,offset);
        });

        //复制
        function copy(){
            var pageArea = $(this).closest('.page-area');
            var copyHtml = pageArea.clone();
            pageArea.after( copyHtml );
        }
        $('.copy').live('click', copy);

        //删除
        function del(){
            var pageArea = $(this).closest('.page-area');
            if (pageArea.index() != 0) {
                pageArea.remove();
            }
        }
        $('.del').live('click', del);

        $( ".fix-area" ).live('dblclick', function(){
            var zIndex = parseInt($(this).css('z-index'),10);
            var clonefix = $(this).clone();
            clonefix.css({
                'z-index': zIndex+1
            });
            clonefix.find('.ui-resizable-handle').css({
                'z-index': zIndex+1
            });
            $(this).after( clonefix );
        });

        $( ".fix-area" ).each(function(){
            $(this).resizable({
                helper: "ui-resizable-helper"
            });
        });

        $( ".fix-area" ).each(function(){
            $(this).draggable({
                zIndex: 9999
            });
        });

        $( ".fix-area" ).live('click', function(){
            $('.dialog').show();
        });
    }
});