var Description = React.createClass({
	displayName: "Description",

	handleClick: function () {
		this.props.descriptionClick();
	},
	render: function () {
		return React.createElement(
			"div",
			null,
			React.createElement("div", { className: "col-md-12 description" }),
			React.createElement(
				"div",
				{ className: "col-md-10 col-md-offset-1 description-text", onClick: this.handleClick },
				this.props.data.text
			)
		);
	}
});