/**
 * Created by Huajie on 2016/8/2.
 */

var Option = React.createClass({
  displayName: "Option",

  handleOptionClick: function (i) {
    alert(i);
  },
  render: function () {
    var op = [];
    for (var i = 0; i < this.props.data.option.length; i++) {
      op.push(React.createElement(
        "a",
        { key: "op" + i, href: "javascript:void(0);", className: "list-group-item", onClick: this.handleOptionClick.bind(this, this.props.data['option'][i]['value']) },
        this.props.data['option'][i]['text']
      ));
    }

    return React.createElement(
      "div",
      { className: "row col-md-4 col-md-offset-4 option-list" },
      React.createElement(
        "div",
        { className: "panel panel-info" },
        React.createElement(
          "div",
          { className: "panel-heading" },
          this.props.data.title
        ),
        React.createElement(
          "div",
          { className: "list-group" },
          op
        )
      )
    );
  }
});