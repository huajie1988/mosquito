/**
 * Created by Huajie on 2016/8/2.
 */

var Dialog = React.createClass({
	displayName: "Dialog",

	handleClick: function () {
		this.props.textboxClick();
	},
	render: function () {
		return React.createElement(
			"div",
			{ className: "row col-md-12 dialog" },
			React.createElement(
				"div",
				{ className: "col-md-10 col-md-offset-2 dialog" },
				React.createElement(
					"div",
					{ className: "col-md-12 dialog-name" },
					React.createElement(
						"span",
						{ className: "col-md-1 text-center dialog-name-text" },
						this.props.data['name']
					)
				),
				React.createElement(
					"div",
					{ className: "col-md-12 dialog-textbox", onClick: this.handleClick },
					React.createElement(
						"span",
						{ className: "dialog-textbox-text col-md-8" },
						this.props.data['text']
					)
				)
			)
		);
	}
});