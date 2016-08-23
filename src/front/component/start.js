
var compontent_data=[
	{
		name:"Start",
		value:"start"
	},
	{
		name:"Load",
		value:"load"
	},
	{
		name:"Contact",
		value:"contact"
	},
	{
		name:"Close",
		value:"close"
	},			
];

var Start = React.createClass({
	handleStartOptionClick:function(v){
		this.props.startOptionClick(v)
	},
    render:function () {
    	var li=[]
    	for (var i = 0; i < compontent_data.length; i++) {
    		li.push(<li key={compontent_data[i]['value']}  onClick={this.handleStartOptionClick.bind(this,compontent_data[i]['value'])}>{compontent_data[i]['name']}</li>)
    	}
    	return (
    		<div className="col-md-12">
    			<div className="col-md-8 text-center col-md-offset-2 start-title">
    				The AVG Game 
    			</div>
    			<div className="col-md-8 text-center col-md-offset-2 start-choice">
	    			<ul className="list-group">
	    				{li}
					</ul>
				</div>
    		</div>		    		
    	);
    }
});