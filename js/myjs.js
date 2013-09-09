
 /*================================================================

 

        2013/05/07  Ver0.01

        1、添加下拉箭头动画功能

        2、修正当用mybtn或mystart其中一个打开下拉菜单，用另一个想关闭时

          需要按两次的问题。

        3、当打开菜单后如果单击其他地方，下拉菜单消失，但箭头方向未变

 

 ================================================================

        

        2013/05/07 Ver0.02

        1、修改算法为click。

        2、问题3依旧存在

 

 ==============================================================*/

    function clickArrow(){

            $('#mystart,#mybtn').click(function(){

            var hasCls=$('#mystart').hasClass("open");

                //alert(hasCls);        

                if(!hasCls)

                {

                    //alert(hasCls);

                    //$('#mystart').addClass("open");//不需要添加，click事件会自动添加open类，如果手动添加反而会出错

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
    	var myDate = new Date();
		// alert(myDate.getHours());
		if(myDate.getHours>=6&&myDate.getHours<=18)
			changeAsideImgDay();
		else
			changeAsideImgNight();
        
        $('#myasideimg').mousemove(function(){
            $(this).css("cursor","pointer");
        });
    }

    function aside_show(){
			$('.myasidetitlebg').click(function(){
			//	var sty=$(this).next().attr("style");
			//	alert(sty);
				var temp= $(this).next().is(":hidden");//是否隐藏 
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
					'./ajax/search.php',
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
					'./ajax/search.php',
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
	function initSkin(){
		var myDate = new Date();
		
		if(myDate.getHours()>=6 && myDate.getHours()<=18)
		{
			$("#sortable2").hide();
			// alert(myDate.getHours());
			changeAsideImgCommonRmove();
		}
			
		else
		{
			$("#sortable").hide();
			changeAsideImgCommonAdd();
		}
			
	}
	function changeAsideImgDay(){
		$('#myasideimg').toggle(function(){
			changeAsideImgCommonAdd();
			// $("#mycontainer").slideUp(500);
			$("#sortable").hide(500);/*.slideUp(500).fadeOut(500)*/
			// $("#mycontainer").slideDown(800);
			$("#sortable2").show(500).fadeIn(500);
        },function(){
			changeAsideImgCommonRmove();
			// $("#mycontainer").slideUp(500);
			$("#sortable2").hide(500);/*.slideUp(500).fadeOut(500)*/
			// $("#mycontainer").slideDown(800);
			$("#sortable").show(500).fadeIn(500);
        });
	}
	function changeAsideImgNight(){
		$('#myasideimg').toggle(function(){
               changeAsideImgCommonRmove();     	
			$("#mycontainer").slideUp(700);
			$("#sortable2").fadeOut(500);/*.slideUp(500).hide(500)*/
			$("#mycontainer").delay(100).slideDown(800);
			$("#sortable").show(600).fadeIn(500);
        },function(){
        	changeAsideImgCommonAdd();
			$("#mycontainer").slideUp(700);
			$("#sortable").fadeOut(500);/*.slideUp(500).hide(500)*/
			$("#mycontainer").delay(100).slideDown(800);
			$("#sortable2").show(600).fadeIn(500);

        });
	}
	function changeAsideImgCommonAdd(){
			$('#myasideimg').attr("src","./img/aside2.png");
            $('.navbar').addClass("navbar-inverse");
			$('i').addClass("icon-white");
			$('.myasidetitlebg').addClass("myasidetitlebg_rev");
	}
	function changeAsideImgCommonRmove(){
			$('#myasideimg').attr("src","./img/aside.png");
            $('.navbar').removeClass("navbar-inverse");
			$('i').removeClass("icon-white");
			$('.myasidetitlebg').removeClass("myasidetitlebg_rev");
	}

	function calendar(){
		var myDate = new Date();
		var Week=myDate.getDay();
		var Day=myDate.getDate();
		switch(Week)
		{
		case 0:
		  Week="Mon";
		  break;
		case 1:
		  Week="Tues";
		  break;
		case 2:
		  Week="Wed";
		  break;
		case 3:
		  Week="Thur";
		  break;
		case 4:
		  Week="Fri";
		  break;
		case 5:
		  Week="Sat";
		  break;
		case 6:
		  Week="Sun";
		  break;
		default:
		  Week=">_<";
		}
		$("#week").html(Week);
		$("#day,#day2").html(Day);
	}