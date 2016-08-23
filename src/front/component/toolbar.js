/**
 * Created by Huajie on 2016/8/2.
 */

var component_data=[
    "保存进度","读取进度","Skip","返回主菜单",
]

var ToolBar = React.createClass({
    getClickEvent:function(i){
        switch (i){
            case 0:
                this.save();
                break;
            case 1:
                this.load();
                break;
            case 2:
                this.skip();
                break;
            case 3:
                this.toMain();
                break;
        }
    },
    save:function(){
        alert('111')
    },
    load:function(){
        alert('222')
    },
    skip:function(){
        alert('333')
    },
    toMain:function(){
        alert('444')
    },
    render:function () {
        var li=[];
        for(var i=0;i<component_data.length;i++){
            li.push(<li key={"toolbar"+i} role="presentation"><a href="javascript:void(0);" onClick={this.getClickEvent.bind(this, i)}>{component_data[i]}</a></li>)
        }
        return (
            <ul className="nav nav-pills nav-justified toolbar">
                {li}
            </ul>
        );
    }
});
