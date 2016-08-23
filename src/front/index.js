/**
 * Created by Huajie on 2016/8/2.
 */

var data=[{type:"start"}];

var Index = React.createClass({
    getInitialState: function() {
        return {data: data};
    },
    startOptionClick:function(v){
        if (v=='start') {
            this.startBtnClick()
        }else if(v=='load'){

        }else if(v=='contact'){

        }else{

        }
    },
    startBtnClick:function(){
        $.ajax({
          url: '/index.php?c=getText&current=0',
          dataType: 'json',
          cache: false,
          success: function(data) {
            if (data.err_code==0) {
                this.setState({data: data.data});           
            } else {
                console.error(data.err_code,data.msg);
            }
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },      
    render:function () {
        var start=0;
        var data=this.state.data
        console.log(data)
        return (
            <Scene start={start} data={data} startOptionClick={this.startOptionClick} />
        );
    }
})

ReactDOM.render(
    <Index />,
    document.getElementById('main')
);