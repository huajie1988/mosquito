var Description = React.createClass({
	handleClick:function(){
		this.props.descriptionClick()
	},
    render:function () {
    	return (
    		<div>
				<div className="col-md-12 description">
				</div>
				<div className="col-md-10 col-md-offset-1 description-text" onClick={this.handleClick}>
					{this.props.data.text}
				</div>   		
    		</div>    		
    	);
    }
});