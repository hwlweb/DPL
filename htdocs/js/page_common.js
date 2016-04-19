define(function(require, exports, module){

    exports.init = function(){
        //绘制热区
        var wId = "w";
        var index = 0;
        var startX = 0, startY = 0;
        var flag = false;
        var retcLeft = "0px", retcTop = "0px", retcHeight = "0px", retcWidth = "0px";

        $('.page-area').live('mouseenter', function(){
            $(this).addClass('hover');
        });

        $('.page-area').live('mouseleave', function(){
            $(this).removeClass('hover');
        });

        //����
        function up(){
            var pageArea = $(this).closest('.page-area');
            if (pageArea.index() != 0) {
                pageArea.prev().before(pageArea);
            }
        }
        $('.up').live('click', up);

        //����
        function down(){
            var pageArea = $(this).closest('.page-area');
            var len = pageArea.length;
            pageArea.next().after(pageArea);
        }
        $('.down').live('click', down);

        //���
        function add(e){
            flag = true;
        }

        var offset = 0;
        $('.add').live('click', function(e){
            offset += 10;
            add(e,offset);
        });

        //����
        function copy(){
            var pageArea = $(this).closest('.page-area');
            var copyHtml = pageArea.clone();
            pageArea.after( copyHtml );

            $('.page-area').each(function () {
                $(this).find(".retc").each(function () {
                    $(this).resizable({
                        helper: "ui-resizable-helper"
                    });
                });
            });

            $('.page-area').each(function(){
                $(this).find(".retc").each(function () {
                    $(this).draggable({
                        zIndex: 9999
                    });
                });
            });
        }
        $('.copy').live('click', copy);

        //ɾ��
        function del(){
            var pageArea = $(this).closest('.page-area');
            if (pageArea.index() != 0) {
                pageArea.remove();
            }
        }
        $('.del').live('click', del);

        $('.page-area').each(function(){
            var self = this;
            $(self).live('mousedown',function(e){
                if(flag) {
                    try {
                        var scrollTop = $(document).scrollTop();
                        var scrollLeft = $(document).scrollLeft();
                        var x = $(self).offset().left;
                        var y = $(self).offset().top;
                        startX = e.clientX + scrollLeft - x;
                        startY = e.clientY + scrollTop - y;
                        index++;
                        var div = $("<div></div>");
                        div.attr('id', wId + index);
                        div.addClass('div');
                        div.css({
                            'left': startX + "px",
                            'top': startY + "px"
                        });
                        $(self).find('.page-area-contant').append(div);
                    } catch (e) {
                        //alert(e);
                    }
                }
            });
        });

        $('.page-area').each(function(){
            var self = this;
            $(self).live("mousemove",function(e){
                if(flag){
                    try{
                        var scrollTop = $(document).scrollTop();
                        var scrollLeft = $(document).scrollLeft();
                        var x = $(self).offset().left;
                        var y = $(self).offset().top;
                        endX = e.clientX + scrollLeft - x;
                        endY = e.clientY + scrollTop - y;
                        retcLeft = (startX - endX > 0 ? endX : startX) + "px";
                        retcTop = (startY - endY > 0 ? endY : startY) + "px";
                        retcHeight = Math.abs(endY - startY) + "px";
                        retcWidth = Math.abs(endX - startX) + "px";
                        $(self).find('#'+ wId + index).css({
                            'left': retcLeft,
                            'top': retcTop,
                            'width': retcWidth,
                            'height': retcHeight
                        });
                    }catch(e){
                        //alert(e);
                    }
                }
            });
        });

        $('.page-area').each(function(){
            var self = this;
            $(self).live("mouseup",function(){
                if(flag) {
                    try {
                        var elm =  $(self).find('#' + wId + index);
                        elm.remove();
                        var div = $("<div></div>");
                        div.addClass('retc');
                        div.css({
                            'left': retcLeft,
                            'top': retcTop,
                            'width': retcWidth,
                            'height': retcHeight
                        });
                        $(self).find('.page-area-contant').append(div);

                        $(self).find(".retc").each(function () {
                            $(this).resizable({
                                helper: "ui-resizable-helper"
                            });
                        });

                        $(self).find(".retc").each(function () {
                            $(this).draggable({
                                zIndex: 9999
                            });
                        });

                    } catch (e) {
                        //alert(e);
                    }
                    flag = false;
                }
            });
        });

        $('.page-area').each(function () {
            $(this).find(".retc").each(function () {
                $(this).resizable({
                    helper: "ui-resizable-helper"
                });
            });
        });

        $('.page-area').each(function(){
           $(this).find(".retc").each(function () {
               $(this).draggable({
                   zIndex: 9999
               });
           });
        });
    }
});