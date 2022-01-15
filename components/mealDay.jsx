import React from 'react';
import MealCard from './mealCard.jsx';

export default class MealDay extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = 
        {
            totals: {
                price: 0,
                calories: 0
            }
        };

        this.meals = Array(2).fill({price: 0, calories: 0});

        this.NEWmeals = Array(2);
        for(var i = 0; i < this.NEWmeals.length; i++)
        {
            this.NEWmeals[i] = <MealCard index={i} key={i} parent={this} />;
        }

        this.NEWESTmeals;

        this.NEWupdateProperty = this.NEWupdateProperty.bind(this);
    }

    updateProperty(property, meal)
    {

        let index = meal.props.index;
        let newValue = meal.state[property];

        //changes the value for the price stored internally
        this.meals[index] = {...this.meals[index], [property]: newValue};

        //updates the total price displayed below
        var newSum = 0;
        this.meals.forEach((item, index) => {
            newSum += item[property]});

        this.setState((state) => ({totals: {...state.totals, [property]: newSum}}));
    }

    NEWupdateProperty(property)
    {
        //updates the total price displayed below
        var newSum = 0;
        // this.NEWESTmeals.forEach((item) => {
        //     console.log(item);
        //     newSum += item.state[property]});
        newSum = this.NEWESTmeals.state[property];

        this.setState((state) => ({totals: {...state.totals, [property]: newSum}}));
    }

    render()
    {
        return (
            <div className="flex flex-col">
                {this.NEWmeals}
                <div>
                    <p>total price: {"$" + this.state.totals.price.toFixed(2)}</p>
                    <p>total calories: {this.state.totals.calories.toFixed(0) + "cal"}</p>
                </div>
            </div>
        );
    }
}