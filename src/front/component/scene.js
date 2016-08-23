var StartComponent = React.createClass({
	startOptionClick:function(v){
		this.props.startOptionClick(v)
	},
    render:function () {
    	return (
    		<Start startOptionClick={this.startOptionClick} />	    		
    	);
    }
});
var MainComponent = React.createClass({
	handleTextboxClick:function(){
		this.props.getDataClick()
	},
    render:function () {
    	return (
        <div>
            <ToolBar />
            <Person data={this.props.data.img} />
            <Dialog data={this.props.data.textbox} textboxClick={this.handleTextboxClick} />
            {this.props.data.type=='option'?<Option data={this.props.data.option} />:''}
        </div>			    		
    	);
    }
});

var DescriptionComponent = React.createClass({
	handleDescriptionClick:function(){
		this.props.getDataClick()
	},
    render:function () {
    	return (
	        <div>
	            <ToolBar />
	            <Description data={this.props.data.textbox} descriptionClick={this.handleDescriptionClick}  />
	        </div>			    		
    	);
    }
});

var LoadComponent = React.createClass({
    render:function () {
    	return (
			 <p>load</p>		
    	);
    }
});

var point=0;
var lastComponent=[]

var Scene = React.createClass({
	getInitialState: function() {
		point=this.props.start;
    	return {data: this.props.data[point]};
  	},
  	componentWillReceiveProps:function(nextProps){
  		this.setState({data:nextProps.data[0]})
  	},
	getData:function(){
		console.log(this.props.data)
		point+=1
		this.setState({data:this.props.data[point]})
	},
	startOptionClick:function(v){
		this.props.startOptionClick(v)
	},
    render:function () {

    	var data=this.state.data;
    	var component=[];
    	if (!data) {
    		return(
			 <div>
			 	{lastComponent}
			 </div>    			
    		);
    	}
    	if (data['type']=='description'){
    		component.push(<DescriptionComponent key="desc" data={data} getDataClick={this.getData} />)
    	}else if(data['type']=='load'){
			component.push(<LoadComponent key="load" />)
    	}else if(data['type']=='start'){
			component.push(<StartComponent key="start" startOptionClick={this.startOptionClick} />)
    	}else{
			component.push(<MainComponent key="main" data={data} getDataClick={this.getData} />)
    	}
    	lastComponent=component
    	return (
			 <div>
			 	{component}
			 </div>
    	);
    }
});