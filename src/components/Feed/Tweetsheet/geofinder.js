import React, { Component } from "react";
import axios from "axios";

class Geofinder extends Component {


    state = {
        city: '',
        region: ""
    }


    componentDidMount() {

        axios.get('https://ipapi.co/json/').then((response) => {
            this.setState({
                city: response.data.city,
                region: response.data.region
            })
        }).catch((error) => {
            console.log(error);
        });

    }

    render() {
        return (
            <div >
                {this.state.city}{","}{this.state.region}
            </div>
        );
    }
}


export default Geofinder;
