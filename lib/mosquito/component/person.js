/**
 * Created by Huajie on 2016/8/2.
 */

var Person = React.createClass({
        displayName: 'Person',

        render: function () {
                var person = [];

                var img_l = '';
                var img_c = '';
                var img_r = '';
                if (this.props.data && this.props.data['person_l']) {
                        img_l = this.props.data['person_l'];
                }

                person.push(React.createElement(
                        'div',
                        { key: 'img_l', className: 'col-md-4 person-position person-position-left' },
                        React.createElement('img', { src: img_l })
                ));

                if (this.props.data && this.props.data['person_c']) {
                        img_c = this.props.data['person_c'];
                }

                person.push(React.createElement(
                        'div',
                        { key: 'img_c', className: 'col-md-4 person-position person-position-center' },
                        React.createElement('img', { src: img_c })
                ));

                if (this.props.data && this.props.data['person_r']) {
                        img_r = this.props.data['person_r'];
                }

                person.push(React.createElement(
                        'div',
                        { key: 'img_r', className: 'col-md-4 person-position person-position-right' },
                        React.createElement('img', { src: img_r })
                ));

                return React.createElement(
                        'div',
                        { className: 'row col-md-12 person ' },
                        person
                );
        }
});