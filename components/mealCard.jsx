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
//
//name: the name of the card (as string). Updates in real time
//
//isCardBlank: boolean representing whether the card is "blank" (when all properties are blank)
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
            caloriesValueField: "",
            isCardBlank: true
        };
    }

    nameUpdate(event)
    {
        let newName = event.target.value === undefined ? "" : event.target.value;
        this.setState({name: newName, isCardBlank: this.updateIsCardBlank({name: event.target.value})});
    }

    priceUpdate(event)
    {
        let priceRegex = /\d+[\.\,]?\d*/;
        let priceArray = priceRegex.exec(this.state.priceValueField);
        let newPrice = (priceArray == null) ? this.state.price : parseFloat(priceArray[0]);
        let newpriceValueField = (newPrice == 0) ? "" : "$" + newPrice.toFixed(2);
        this.setState({price: newPrice, priceValueField: newpriceValueField, isCardBlank: this.updateIsCardBlank({price: newPrice})});
        this.updateIsCardBlank();
    }

    updateIsCardBlank({name = this.state.name, price = this.state.price, calories = this.state.calories} = {})
    {
        return (name == "" && price == 0 && calories == 0);
    }

    priceChangeHandler(event)
    {
        this.setState({priceValueField: event.target.value, isCardBlank: (event.target.value == "")})
    }

    caloriesUpdate(event)
    {
        let caloriesRegex = /\d+/;
        let caloriesArray = caloriesRegex.exec(this.state.caloriesValueField);
        let newCalories = (caloriesArray == null) ? this.state.calories : parseInt(caloriesArray[0]);
        let newCaloriesValueField = (newCalories == 0) ? "" : newCalories + "cal";
        this.setState({calories: newCalories, caloriesValueField: newCaloriesValueField, isCardBlank: this.updateIsCardBlank({calories: newCalories})});
    }

    caloriesChangeHandler(event)
    {
        this.setState({caloriesValueField: event.target.value, isCardBlank: (event.target.value == "")})
    }

    fieldStyling = "bg-transparent border-none outline-none text-white placeholder:text-transparent hover:placeholder:text-white focus:placeholder:text-white hover:bg-white/25 focus:bg-white/50 basis-1/3";
    cardStyling = "rounded-lg border-4 border-black m-0.5 p-0.5";

    blankStyling = " bg-slate-500";
    filledStyling = " bg-amber-400";


    blurOnEnterHandler(event)
    {
        if(event.key == "Enter" || event.key == "Escape")
            event.target.blur();   
    }

    render()
    {

        var divClass = this.cardStyling;
        if(this.state.isCardBlank)
            divClass += this.blankStyling;
        else
            divClass += this.filledStyling;

        return (
        <div className={divClass}>
                <h1>
                    <input className={this.fieldStyling + " text-3xl font-bold"} onChange={this.nameUpdate} onKeyUp={this.blurOnEnterHandler} placeholder="meal name"  />
                </h1>
                <p>
                    <input className={this.fieldStyling} placeholder="calories" onBlur={this.caloriesUpdate} onChange={this.caloriesChangeHandler} onKeyUp={this.blurOnEnterHandler} value={this.state.caloriesValueField} />
                    <br />
                    <input className={this.fieldStyling} placeholder="price" onBlur={this.priceUpdate} onChange={this.priceChangeHandler} onKeyUp={this.blurOnEnterHandler} value={this.state.priceValueField}/>
                </p>
        </div>
        );

    }
}
