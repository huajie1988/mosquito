var count=0;
var menuStatus=false;
var isSave=false;
var isOption=false;
var isFirst=true;
var isMusicChange=true;
var nowMusic="";
$.ajaxSetup({ 
    async : false 
}); 
function initMain(){
	$("#main").addClass("initMain");
  $("#menu,#savePage").hide();
  initSave();
	$.get("./data/Title.xml", function (xml) {//需服务器返回xml  
    var len= $(xml).find("field").length;
    var field;var fName; var dataType;var tName; var titleName;
    var select="<ul style='list-style-type:none'>";
    $(xml).find("field").each(function () {  
         field = $(this);  
         fName = field.attr("Name");//读取节点属性
         tName = field.attr("Title");  
         fieldname = field.find("fieldname").text();//读取子节点的值
         dataType = field.find("datatype").text();
         // alert(dataType);
         if(fieldname!="")
         select+="<li class='titleli' id='"+dataType+"'>"+fieldname+"</li>";
     	if(typeof(titleName) == "undefined")
         titleName = field.find("titlename").text();
        // alert(titleName);  
    });
    select+="</ul>";
    titleName="<div class='title'>"+titleName+"</div>"
    select=titleName+select; 
    $("#main").html(select); 
    // alert(select);  
});  
}
function gameClose(){
    if (confirm("您确定要关闭本页吗？")){
        window.opener=null;
        window.open('','_self');
        window.close();
    }
    else
        ;
}

function myMouseMove(){
    $(document).on('mouseenter', '.titleli', function() {
          $(this).addClass("titleli_rev");
          $(this).siblings().removeClass("titleli_rev");
        });
}

function contectUs(){
    var subject = "About The Game";
    var body_message = "Hello World!";
    var mailto_link = 'mailto:whuajie1988@gmail.com?subject=' + subject + '&body=' + body_message;
    window.open(mailto_link, 'emailWindow');
}

function chooseCaption(){
    $(document).on('click', '.titleli,#menu>li', function() {
          // alert($(this).attr("id"));
          switch($(this).attr("id"))
            {
            case "start":
              startGame();
              break;
            case "save":
              dataSave();
              break;
            case "load":
              isFirst=true;
              isSave=false;
              loadCheck();
              // isFirst=false;
              break;
            case "close":
              gameClose();
              break;
            case "toMain":
              toMain();
              break;
            case "contact":
              contectUs();
              break;
            default:
              alert("555");
            }
          // $(this).siblings().removeClass("titleli_rev");
        });
}
function chooseOption(){
    $(document).on('click', '.optionli', function() {
          isOption=false;
          count=$(this).attr("value");
          var fav=$(this).attr("data-favorite");
          updatefav(fav);
          readScript($(this).attr("value"));
          $("#options").remove();
          // $(this).siblings().removeClass("titleli_rev");
        });

}

function chooseSaveData(){
    $(document).on('click', '.saveList', function() {
          if($(this).attr("value") && !isSave){
            $("#options").remove();
            isOption=false;
            clearScenes(500,$(this).attr("data-img-src"));
            count=$(this).attr("value");
            loadScenes(500);
            menuStatus=true;
            $("#aduio").attr("src",MUSIC_PATH+$(this).attr("data-music"));
            var tmp_aduio=$(this).attr("data-music").split(".");
                if($.browser.msie) { 
                  $("#aduio").attr("src",MUSIC_PATH+tmp_aduio[0]+".mp3");
                  } 
            $("#bgsound").attr("src",MUSIC_PATH+$(this).attr("data-music"));
            nowMusic=$(this).attr("data-music");
            // isMusicChange=false;
          }

          // readScript($(this).attr("value"));
          // $("#options").remove();
          // $(this).siblings().removeClass("titleli_rev");
        });
}

function chooseSaveLocaltion(){
    $(document).on('click', '.saveList', function() {
          if(isSave){
            if($(this).attr("value")!="")
            {
              if (confirm("您确定要覆盖存档吗？")){
                // alert($(this).attr("data-Num"));
                 addSaveData($(this).attr("data-Num"),"update");
              }
              else
                  ;
            }
              
            else
            {
              if($(this).attr("data-Num")!=null)
                addSaveData($(this).attr("data-Num"),"add");
              else
                addSaveData(0,"add");
            }
             
          }
          
          
          
          // $(this).siblings().removeClass("titleli_rev");
        });
}

function clearScenes(time,bgNo,bgExtension){
  $(document).snowfall('clear');
    var bgExtension = arguments[2] ? arguments[2] : "jpg";
    $("#main").text("").animate({opacity:"0"},time,function(){
        (bgNo!="")?bgurl="url('"+BGPATH+bgNo+"."+bgExtension+"')":bgurl="url('')";  
        $("#main").css("background-image",bgurl);
        
    });
    // $("#main").fadeOut(time);
}

function loadScenes(time){
    $("#main").animate({opacity:"1"},time,function(){

      is_Option(count);
      // alert(isOption);
          if(isOption){
            readScript(count-1);
      }
      readScript(count);
      // nowMusic=localStorage.getItem('saveNum');
    });
    // $("#main").fadeIn(time);
    // $("#main").addClass("initMain").;
    
}

function toMain(){
      if (confirm("您确定要回到主页面吗？提示：未保存的数据将丢失！")){
        window.location.reload();
    }
    else
        ;
}

function dataSave(){
  isSave=true;
  dataLoad();
}

function dataLoad(){
  // alert(count);
  var savedata=new Array();
  var savePage="<div id='savePage'>";
  var saveNum=localStorage.getItem('saveNum');
for (var i = 1; i <= saveNum; i++) {
  var savedataName="savedata"+i;
  savedata[i]=localStorage.getItem(savedataName);
  savedata[i]=dealArgs(savedata[i]);
  var sImgs=savedata[i]["dataimg"].split("/");
  sImgs=sImgs[sImgs.length-1].split(".");
  savePage+="<div class='saveList'"+" data-music='"+savedata[i]["BGM"]+"' data-Num="+(parseInt(i)-1)+" data-img-src='"+sImgs[0]+"' value='"+savedata[i]["datavalue"]+"'>"+"<div class='saveImg'><img src='"+savedata[i]["dataimg"]+"' /></div><div class='savename'>"+savedata[i]["datasavename"]+"</div><div class='savetime'>"+savedata[i]["gametime"]+"</div></div>";
  // alert(savedata[i]["datavalue"]);

};
  for (var i = saveNum; i <= 19; i++) {
    savePage+="<div class='saveList' data-music='' data-Num="+i+" data-img-src='"+"' value='"+"'>"+"<div class='saveImg'><img src='"+"' /></div><div class='savename'>"+"无存档"+"</div><div class='savetime'>"+"</div></div>";
  };
  savePage+="</div>";
      // alert(savePage);
  $("#options").remove(); 
  $("#main").html(savePage);
    
}

function loadCheck(){
      if(('localStorage' in window) && window['localStorage'] !== null){  
            var saveNum=localStorage.getItem('saveNum');  
            if(saveNum==null || saveNum=="0"){  
                alert("你尚未保存数据！");
            }else{  
               dataLoad();

            }  
        }else{  
            alert('天啊，你还在用这么土的浏览器！');  
        }
}

function startGame(){
    clearScenes(1000,"CHIP00B4","jpg");
    loadScenes(1000);
    menuStatus=true;
    // $.ajax({
    //   url:"./data/Script.xml",
    //   dataType:"xml",
    //   type:"post",
    //   success:function(xml){
    //     var len= $(xml).find("textbox").length;
    //     var i=0;
    //     while(i<len){
    //         readScript(i);
    //         i++; 
    //     }
    //     // alert(len);
    //         // alert($(xml).find("src").eq(i).text());
    //         //i++;
    //   }
    // });

}

function readScript(i){
  // if(isFirst)
    // alert(isFirst);
    $.ajax({
      url:"./data/Script.xml",
      dataType:"xml",
      type:"get",
      success:function(xml){
        var scriptJduge=$(xml).find("name").eq(i).text();
        switch(scriptJduge)
            {
            case "description":
              // startGame();
              // alert(scriptJduge);
              var textbox="<div id='description'>"+htmlReplace($(xml).find("content").eq(i).text())+"</div>";
              break;
            case "bgImg":
              var bgArgs= dealArgs($(xml).find("args").eq(i).text());
              // alert($(xml).find("args").eq(1).text());
              clearScenes(bgArgs["time1"],bgArgs["bgImg"],bgArgs["bgExt"]);
              loadScenes(bgArgs["time2"]);
              count++;
              break;
            case "option":
            // alert(count);
              getOption(count);
              break;
            case "end":
              window.location.reload();
              // var textbox="";
              // toMain();
              break;
            default:
              piArgs= dealArgs($(xml).find("args").eq(i).text());
              // alert(count);
              if(typeof(piArgs['personimg'])!="undefined"){
                switch(piArgs['personimg']){
                case "right":
                var textbox="<div class='personImg_r'>"+"<img src='"+HEADICO_PATH+$(xml).find("src").eq(i).text()+"'/></div>"+"<div id='textBox'><div class='Name_pi'>"+$(xml).find("name").eq(i).text()+"</div><div class='Content_r'>"+htmlReplace($(xml).find("content").eq(i).text())+"</div></div>";
                break;
                case "center":
                var textbox="<div class='personImg_c'>"+"<img src='"+HEADICO_PATH+$(xml).find("src").eq(i).text()+"'/></div>"+"<div id='textBox'><div class='Name_pi'>"+$(xml).find("name").eq(i).text()+"</div><div class='Content_c'>"+htmlReplace($(xml).find("content").eq(i).text())+"</div></div>";
                break;
                default:
                var textbox="<div class='personImg'>"+"<img src='"+HEADICO_PATH+$(xml).find("src").eq(i).text()+"'/></div>"+"<div id='textBox'><div class='Name_pi'>"+$(xml).find("name").eq(i).text()+"</div><div class='Content_l'>"+htmlReplace($(xml).find("content").eq(i).text())+"</div></div>";
                }

              }
              else
                var textbox="<div id='textBox'><div class='Name'>"+$(xml).find("name").eq(i).text()+"</div><div class='headIco'>"+"<img src='"+HEADICO_PATH+$(xml).find("src").eq(i).text()+"'/>"+"</div><div class='Content'>"+htmlReplace($(xml).find("content").eq(i).text())+"</div></div>";
            }
          var functionjd=$(xml).find("function").eq(i).text();
          if(functionjd)
          {
            functionjd= dealArgs(functionjd);
            
            if(functionjd['audiochange'] && isMusicChange)
            {
                
                var tmp_aduio=functionjd['audiochange'].split(".");
                if($.browser.msie) { 
                  $("#aduio").attr("src",MUSIC_PATH+tmp_aduio[0]+".mp3");
                  }else
                  $("#aduio").attr("src",MUSIC_PATH+functionjd['audiochange']);
                $("#bgsound").attr("src",MUSIC_PATH+functionjd['audiochange']);
                nowMusic=functionjd['audiochange'];
                isMusicChange=false;
               // alert(i);
               // $("#aduio").removeAttr("autoplay");
            }

            if(functionjd['audioplay'])
            {
                isMusicChange=true;
               $("#aduio").attr("autoplay","autoplay");
            }
          }
        // var textbox="<div id='textBox'><div class='Name'>"+$(xml).find("name").eq(i).text()+"</div><div class='headIco'>"+$(xml).find("src").eq(i).text()+"</div><div class='Content'>"+$(xml).find("content").eq(i).text()+"</div></div>";
           $("#main").html(textbox);
            // alert(textbox);
            //i++;
      }
 });
}


function is_Option(i){
    $.ajax({
      url:"./data/Script.xml",
      dataType:"xml",
      type:"get",
      async: false,
      success:function(xml){
        var scriptJduge=$(xml).find("name").eq(i).text();
        if(scriptJduge=="option")
          // alert(scriptJduge);
          isOption=true;
        else
          // alert(scriptJduge);
          isOption=false;

      }
 });
}


function textBoxClick(){
    $(document).on('click', '#textBox,#description', function(){
      if(!isOption)
      {
         count++;
         readScript(count);
      }
      else
        ;
         
    });
}
function dealArgs(str){
  var str_arr=new Array();
  var key;var val;
  strs=str.split("|"); //字符分割 
  for (var i =0; i < strs.length; i++) {
         strs[i]=strs[i].split(":");
         key=strs[i][0];
         val=strs[i][1];
         // alert(val);
         str_arr[key]=val;

       };
       // alert(str_arr.length);     
  return str_arr;
}

function getOption(i){
  $.ajax({
      url:"./data/Script.xml",
      dataType:"xml",
      type:"get",
      success:function(xml){
        var len= $(xml).find("content>options[oid='"+i+"']").length;
        var option;var oContent; var oValue;var oName;
        var select="<ul id='options' style='list-style-type:none'>";
        $(xml).find("options[oid='"+i+"']>option").each(function () {  
         field = $(this);  
         oName = field.attr("Name");//读取节点属性 
         oContent = field.find("optioncontent").text();//读取子节点的值
         oValue = field.find("optionvalue").text();
         oFun = dealArgs(field.find("optionfunction").text());
         // alert(oFun['favorite']);
         if(typeof(oFun['favorite']) == "undefined")
          oFun['favorite']="0";
         // if(fieldname!="")
         select+="<li class='optionli' "+"data-favorite="+oFun['favorite']+" value='"+oValue+"'>"+oContent+"</li>";
         // alert(select);
          // if(typeof(titleName) == "undefined")
          //    titleName = field.find("titlename").text();
            // alert(titleName);  
          });
        select+="</ul>";
    // titleName="<div class='title'>"+titleName+"</div>"
    // select=titleName+select; 
    $("#main").after(select);
        // alert(select);
      }
      });
    isOption=true;
}

function Menu()
{
  var xx;var yy;
  $('#main').mousemove(function(e) { 
   xx = e.originalEvent.x || e.originalEvent.layerX || 0; 
   yy = e.originalEvent.y || e.originalEvent.layerY || 0;
   if((yy>0 && yy<100)&& menuStatus){
    $("#menu").fadeIn(500).end;
    $('#testDiv').text(xx + '---' + yy);
   }
  else
  {
     $("#menu").fadeOut(500).end;
     $('#testDiv').text(xx + '...' + yy); 
  }
    
  // $('#testDiv').text(xx + '---' + yy); 
  }); 
 }

function addSaveData(dataNum,type){
  var myDate = new Date();
  if(type=="add")
    var saveNum=parseInt(localStorage.getItem('saveNum'))+1;
  else
    var saveNum=parseInt(localStorage.getItem('saveNum'));
  host = window.location.href;
  var imgAddr=$("#main").css("background-image");
  imgAddr=imgAddr.slice(4,imgAddr.length-1);
  imgAddr=imgAddr.split(host);
  imgAddr="./"+imgAddr[imgAddr.length-1];
  imgAddrs=imgAddr.split("\"");
  imgAddr=imgAddrs[0];
  // alert(imgAddr);
  dataNum=parseInt(dataNum)+1;
  if(imgAddr!=null && dataNum !=null && count !=null){  
                localStorage.setItem('saveNum',saveNum);
                var savedataName="savedata"+dataNum;
                var savedataValue="datavalue:"+count+"|dataimg:"+imgAddr+"|datasavename:存档"+dataNum+"|gametime:"+myDate.getTime()+"|BGM:"+nowMusic;  
                localStorage.setItem(savedataName,savedataValue);
                // document.getElementById('name').innerHTML=name;  
     }
     isSave=false;
     is_Option(count);
     // alert(isOption);
     if(isOption)
     {
      $("#options").remove();
      readScript(count-1);
     }
     // else
     readScript(count);
 // alert(count);
}

function initSave(){  
    if(('localStorage' in window) && window['localStorage'] !== null){  
        var saveNum=localStorage.getItem('saveNum');  
        if(saveNum==null){  
            saveNum="0";
            localStorage.setItem('saveNum',saveNum);
        }
    }else{  
        alert('天啊，你还在用这么土的浏览器！');  
    }  
}

function notSave(){
  $("#main").click(function(){
    $("#savePage").remove();
      if(isFirst && !menuStatus)
      {
        
        initMain();
        isFirst=false;
      }
      else if(menuStatus)
      {
        is_Option(count);
     // alert(isOption);
         if(isOption)
         {
          $("#options").remove();
          readScript(count-1);
         }
        readScript(count);
        isFirst=false;
      }
      else
        isFirst=true;
    });
  
} 

function updatefav(str){
  if(str!="0")
  {
    strs=str.split(",");
    favkey=strs[0]+"fav";
    checkFav(favkey,strs)
  }
  else
    strs=str;
  // var str_arr=new Array();

  
}

function checkFav(favkey,strs){
    if(('localStorage' in window) && window['localStorage'] !== null){  
        var favKey=localStorage.getItem(favkey);  
        if(favKey==null || favKey=="0"){
            if(parseInt(strs[1])<0)  
               favKey="0";
            else
               favKey=parseInt(strs[1]);
            localStorage.setItem(favkey,favKey);
            }else{  
               favKey=parseInt(favKey)+parseInt(strs[1]);
               localStorage.setItem(favkey,favKey);
            }  
        }else{  
            alert('天啊，你还在用这么土的浏览器！');  
        }
}

function htmlReplace(str){
    str=str.replace(/\{\[/g,"<");
    str=str.replace(/\]\}/g,">");
    return str;
}