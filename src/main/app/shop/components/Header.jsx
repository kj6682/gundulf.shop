import React from 'react';
const isProduction = process.env.NODE_ENV==='production'
var config = require('./config.json')

var shop;
if(!process.env.DEV_SERVER)
    shop = window.api.shop;
else
    shop = 'paris';


export default class Header extends React.Component {

    render() {
        let title = config.title + " " + shop + " shop";
        return (
            <div>
                <div><img src="img/hop.png" className="logoimg" /></div>
                <h1>{title}</h1>
                <p>{config.caption}</p>
                <p>{config.description}</p>
            </div>
        )
    }
} 