var StartComponent = React.createClass({
  displayName: 'StartComponent',

  startOptionClick: function (v) {
    this.props.startOptionClick(v);
  },
  render: function () {
    return React.createElement(Start, { startOptionClick: this.startOptionClick });
  }
});
var MainComponent = React.createClass({
  displayName: 'MainComponent',

  handleTextboxClick: function () {
    this.props.getDataClick();
  },
  render: function () {
    return React.createElement(
      'div',
      null,
      React.createElement(ToolBar, null),
      React.createElement(Person, { data: this.props.data.img }),
      React.createElement(Dialog, { data: this.props.data.textbox, textboxClick: this.handleTextboxClick }),
      this.props.data.type == 'option' ? React.createElement(Option, { data: this.props.data.option }) : ''
    );
  }
});

var DescriptionComponent = React.createClass({
  displayName: 'DescriptionComponent',

  handleDescriptionClick: function () {
    this.props.getDataClick();
  },
  render: function () {
    return React.createElement(
      'div',
      null,
      React.createElement(ToolBar, null),
      React.createElement(Description, { data: this.props.data.textbox, descriptionClick: this.handleDescriptionClick })
    );
  }
});

var LoadComponent = React.createClass({
  displayName: 'LoadComponent',

  render: function () {
    return React.createElement(
      'p',
      null,
      'load'
    );
  }
});

var point = 0;
var lastComponent = [];

var Scene = React.createClass({
  displayName: 'Scene',

  getInitialState: function () {
    point = this.props.start;
    return { data: this.props.data[point] };
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({ data: nextProps.data[0] });
  },
  getData: function () {
    console.log(this.props.data);
    point += 1;
    this.setState({ data: this.props.data[point] });
  },
  startOptionClick: function (v) {
    this.props.startOptionClick(v);
  },
  render: function () {

    var data = this.state.data;
    var component = [];
    if (!data) {
      return React.createElement(
        'div',
        null,
        lastComponent
      );
    }
    if (data['type'] == 'description') {
      component.push(React.createElement(DescriptionComponent, { key: 'desc', data: data, getDataClick: this.getData }));
    } else if (data['type'] == 'load') {
      component.push(React.createElement(LoadComponent, { key: 'load' }));
    } else if (data['type'] == 'start') {
      component.push(React.createElement(StartComponent, { key: 'start', startOptionClick: this.startOptionClick }));
    } else {
      component.push(React.createElement(MainComponent, { key: 'main', data: data, getDataClick: this.getData }));
    }
    lastComponent = component;
    return React.createElement(
      'div',
      null,
      component
    );
  }
});