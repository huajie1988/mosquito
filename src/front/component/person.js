/**
 * Created by Huajie on 2016/8/2.
 */

var Person = React.createClass({
    render:function () {
        var person=[];

        var img_l='';
        var img_c='';
        var img_r='';
        if(this.props.data && this.props.data['person_l']){
            img_l=this.props.data['person_l'];
        }

        person.push(<div key="img_l" className="col-md-4 person-position person-position-left"><img src={img_l} /></div>);

        if(this.props.data && this.props.data['person_c']){
           img_c=this.props.data['person_c'];
        }

        person.push(<div  key="img_c" className="col-md-4 person-position person-position-center"><img src={img_c} /></div>);

        if(this.props.data && this.props.data['person_r']){
            img_r=this.props.data['person_r'];
        }

        person.push(<div  key="img_r" className="col-md-4 person-position person-position-right"><img src={img_r} /></div>);

        return(
            <div className="row col-md-12 person ">
                {person}
            </div>
        );
    }
})