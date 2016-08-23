/**
 * Created by Huajie on 2016/8/2.
 */

var Dialog = React.createClass({
	handleClick:function(){
		this.props.textboxClick();
	},
    render: function () {
        return (
	        <div className="row col-md-12 dialog">
	            <div className="col-md-10 col-md-offset-2 dialog">
	                <div className="col-md-12 dialog-name">
	                    <span className="col-md-1 text-center dialog-name-text">
	                    	{this.props.data['name']}
	                    </span>
	                </div>
	                <div className="col-md-12 dialog-textbox" onClick={this.handleClick}>
		                <span className="dialog-textbox-text col-md-8">
		                        {this.props.data['text']}
		                </span>
	                </div>
	            </div>
	        </div>
        );
    }
}) 