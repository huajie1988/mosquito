/**
 * Created by Huajie on 2016/8/2.
 */

var Option = React.createClass({
		handleOptionClick:function(i){
			alert(i)
		},
        render: function () {
        	var op=[];
        	for (var i = 0; i < this.props.data.option.length; i++) {
        		op.push(<a key={"op"+i} href="javascript:void(0);" className="list-group-item" onClick={this.handleOptionClick.bind(this, this.props.data['option'][i]['value'])}>{this.props.data['option'][i]['text']}</a>)
        	}

            return(
		        <div className="row col-md-4 col-md-offset-4 option-list">
		            <div className="panel panel-info">
		                <div className="panel-heading">{this.props.data.title}</div>
		                <div className="list-group">
		                    {op}
		                </div>
		            </div>
		        </div>                
            );
        }
    }
)