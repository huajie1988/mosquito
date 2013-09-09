
 /*================================================================

 

        2013/05/07  Ver0.01

        1¡¢Ìí¼ÓÏÂÀ­¼ýÍ·¶¯»­¹¦ÄÜ

        2¡¢ÐÞÕýµ±ÓÃmybtn»òmystartÆäÖÐÒ»¸ö´ò¿ªÏÂÀ­²Ëµ¥£¬ÓÃÁíÒ»¸öÏë¹Ø±ÕÊ±

          ÐèÒª°´Á½´ÎµÄÎÊÌâ¡£

        3¡¢µ±´ò¿ª²Ëµ¥ºóÈç¹ûµ¥»÷ÆäËûµØ·½£¬ÏÂÀ­²Ëµ¥ÏûÊ§£¬µ«¼ýÍ··½ÏòÎ´±ä

 

 ================================================================

        

        2013/05/07 Ver0.02

        1¡¢ÐÞ¸ÄËã·¨Îªclick¡£

        2¡¢ÎÊÌâ3ÒÀ¾É´æÔÚ

 

 ==============================================================*/

    function clickArrow(){

            $('#mystart,#mybtn').click(function(){

            var hasCls=$('#mystart').hasClass("open");

                //alert(hasCls);        

                if(!hasCls)

                {

                    //alert(hasCls);

                    //$('#mystart').addClass("open");//²»ÐèÒªÌí¼Ó£¬clickÊÂ¼þ»á×Ô¶¯Ìí¼ÓopenÀà£¬Èç¹ûÊÖ¶¯Ìí¼Ó·´¶ø»á³ö´í

                   // $('#mybtn').removeClass("mybtn_up").addClass("mybtn_down");
					$('#mybtn').removeClass("icon-upload").addClass("icon-download");
                }

                else

                    //$('#mybtn').addClass("mybtn_up").removeClass("mybtn_down");

					$('#mybtn').addClass("icon-upload").removeClass("icon-download");

            //$('#mystart').addClass("open");

            });
			$('body').click(function(){
					var hasCls=$('#mystart').hasClass("open");
					if(hasCls)
						//$('#mybtn').addClass("mybtn_up").removeClass("mybtn_down");
						$('#mybtn').addClass("icon-upload").removeClass("icon-download");
			});

    }

    function changeAsideImg(){
        $('#myasideimg').toggle(function(){
            $(this).attr("src","./img/aside2.png");
            $('.navbar').addClass("navbar-inverse");
			$('i').addClass("icon-white");
			$('.myasidetitlebg').addClass("myasidetitlebg_rev");
        },function(){
            $(this).attr("src","./img/aside.png");
            $('.navbar').removeClass("navbar-inverse");
			$('i').removeClass("icon-white");
			$('.myasidetitlebg').removeClass("myasidetitlebg_rev");
        });
        $('#myasideimg').mousemove(function(){
            $(this).css("cursor","pointer");
        });
    }

    function aside_show(){
			$('.myasidetitlebg').click(function(){
			//	var sty=$(this).next().attr("style");
			//	alert(sty);
				var temp= $(this).next().is(":hidden");//ÊÇ·ñÒþ²Ø 
				//alert(temp);
				if(!temp){
					$(this).next().hide(600).end();
					}
				else{
            	$('.myasidecontainer,.myasideimg').hide(600).end;
				$(this).next().show(600).end();}
			//$(this).parent().siblings().children(".myasidecontainer,.myasideimg").hide(600);
        }/*,function(){
            //$('.myasidecontainer,#myasideimg').hide(600).end;
            $(this).next().hide(600).end();
        }*/);
    }

    function initMobAsideImg(){
        var myWidth;
        if($.browser.msie){
             myWidth=document.compatMode == "CSS1Compat"? document.documentElement.clientHeight:document.body.clientWidth;
            }else{
                myWidth= self.innerWidth;
                }
        //alert(myWidth);
        if(myWidth<400)
            $('#myasideimg').hide(600).end;
    }
	function getAction(){
		$(".noAction").click(function(){
				$(this).siblings().removeClass("active");
				$(this).addClass("active");
				//var tmp=$(".noAction a").attr("value");
				//alert(tmp);
				$.get(
					'search.php',
					{key:$(this).children().attr("value"),
					table:''
					},
					function(data)
					{
						$('#container').html(data);
					}
					);

		});
	}
	
	function getTagCloud(){
		$("#cloud").on("click","a",function(){
				//var tmp=$(this).attr("value");
				//alert(tmp);
				$.get(
					'search.php',
					{key:$(this).attr("value"),
					table:"cloudtest"
					},
					function(data)
					{
						$('#container').html(data);
					}
					);
		});
		
	}
