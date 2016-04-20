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

        //���?
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
            copyHtml.find('.retc').remove();
            pageArea.after( copyHtml );
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

        $('.page-area').live('mousedown',function(e){
            if(flag) {
                try {
                    var target = $(e.target).closest('.page-area');
                    var scrollTop = $(document).scrollTop();
                    var scrollLeft = $(document).scrollLeft();
                    var x = target.offset().left;
                    var y = target.offset().top;
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
                    target.find('.page-area-contant').append(div);
                } catch (e) {
                    //alert(e);
                }
            }
        });

        $('.page-area').live("mousemove",function(e){
            if(flag){
                try{
                    var target = $(e.target).closest('.page-area');
                    var scrollTop = $(document).scrollTop();
                    var scrollLeft = $(document).scrollLeft();
                    var x = target.offset().left;
                    var y = target.offset().top;
                    endX = e.clientX + scrollLeft - x;
                    endY = e.clientY + scrollTop - y;
                    retcLeft = (startX - endX > 0 ? endX : startX) + "px";
                    retcTop = (startY - endY > 0 ? endY : startY) + "px";
                    retcHeight = Math.abs(endY - startY) + "px";
                    retcWidth = Math.abs(endX - startX) + "px";
                    target.find('#'+ wId + index).css({
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

        $('.page-area').live("mouseup",function(e){
            if(flag) {
                try {
                    var target = $(e.target).closest('.page-area');
                    var elm =  target.find('#' + wId + index);
                    elm.remove();
                    var div = $("<div></div>");
                    div.addClass('retc');
                    div.css({
                        'left': retcLeft,
                        'top': retcTop,
                        'width': retcWidth,
                        'height': retcHeight
                    });
                    target.find('.page-area-contant').append(div);

                    target.find(".retc").each(function () {
                        $(this).resizable({
                            helper: "ui-resizable-helper"
                        });
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
    }
});