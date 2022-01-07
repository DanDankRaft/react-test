import { Container, Row, Column, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';



//state properties
//
//price: the actual price (as a float), defaults to zero
//priceValueField: the formatted string of the price shown to viewer
//  while the user is inputting a value - equal to the value shown in the input box
//  after the user inputs - the new price formatted in dollars / blank if the price is 0 / old price formatted in dollars if no valid input
//
//calories: the actual calories (as an int), defaults to zero
//caloriesValueField: the formatted string of the calories shown to the viewer
//  while the user is inputting a value - equal to the value shown in the input box
//  after the user inputs - the new calorie count formatted as calories / blank if calories is 0 / old calories formatted

export default class MealCard extends React.Component
{
    constructor(props)
    {
        super(props);
        this.nameUpdate = this.nameUpdate.bind(this);
        this.priceUpdate = this.priceUpdate.bind(this)
        this.priceChangeHandler = this.priceChangeHandler.bind(this);
        this.caloriesUpdate = this.caloriesUpdate.bind(this)
        this.caloriesChangeHandler = this.caloriesChangeHandler.bind(this);
        this.state =
        {
            name: "",
            price: 0,
            priceValueField: "",
            calories: 0,
            caloriesValueField: ""
        };
    }

    nameUpdate(event)
    {
        this.setState({name: event.target.value});
    }

    priceUpdate(event)
    {
        let priceRegex = /\d+[\.\,]?\d*/;
        let priceArray = priceRegex.exec(this.state.priceValueField);
        let newPrice = (priceArray == null) ? this.state.price : parseFloat(priceArray[0]);
        let newpriceValueField = (newPrice == 0) ? "" : "$" + newPrice.toFixed(2);
        this.setState({price: newPrice, priceValueField: newpriceValueField});
    }

    priceChangeHandler(event)
    {
        this.setState({priceValueField: event.target.value})
    }

    caloriesUpdate(event)
    {
        let caloriesRegex = /\d+/;
        let caloriesArray = caloriesRegex.exec(this.state.caloriesValueField);
        let newCalories = (caloriesArray == null) ? this.state.calories : parseInt(caloriesArray[0]);
        let newCaloriesValueField = (newCalories == 0) ? "" : newCalories + "cal";
        this.setState({calories: newCalories, caloriesValueField: newCaloriesValueField});
    }

    caloriesChangeHandler(event)
    {
        this.setState({caloriesValueField: event.target.value})
    }


    render()
    {
        return (
        <Card className="border-dark border-2 my-1 bg-secondary text-light p-1">
            <div>
                <Card.Title><input className="meal-card-field" onChange={this.nameUpdate} placeholder="meal name" /></Card.Title>
                <Card.Text>
                <input className="meal-card-field" placeholder="calories" onBlur={this.caloriesUpdate} onChange={this.caloriesChangeHandler} value={this.state.caloriesValueField} />
                <br />
                <input className="meal-card-field" placeholder="price" onBlur={this.priceUpdate} onChange={this.priceChangeHandler} value={this.state.priceValueField}/>
                </Card.Text>
            </div>
        </Card>
        );

    }
}