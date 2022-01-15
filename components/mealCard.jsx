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
        this.priceBlurHandler = this.priceBlurHandler.bind(this)
        this.priceChangeHandler = this.priceChangeHandler.bind(this);
        this.caloriesBlurHandler = this.caloriesBlurHandler.bind(this)
        this.caloriesChangeHandler = this.caloriesChangeHandler.bind(this);

        this.priceFocusHandler = this.priceFocusHandler.bind(this);
        this.caloriesFocusHandler = this.caloriesFocusHandler.bind(this);

        this.state =
        {
            name: "",
            price: 0,
            priceValueField: "",
            calories: 0,
            caloriesValueField: "",
            isCardBlank: true,
        };
    }

    nameUpdate(event)
    {
        let newName = event.target.value === undefined ? "" : event.target.value;
        this.setState({name: newName, isCardBlank: this.isCardBlankEval({name: event.target.value})});
    }

    priceBlurHandler(event)
    {
        let priceRegex = /\d+[\.\,]?\d*/;
        let priceArray = priceRegex.exec(this.state.priceValueField);
        let newPrice = (priceArray == null) ? 0 : parseFloat(priceArray[0]);
        let newpriceValueField = (newPrice == 0) ? "" : "$" + newPrice.toFixed(2);
        this.setState({price: newPrice, priceValueField: newpriceValueField, isCardBlank: this.isCardBlankEval({price: newPrice})},
        () => {this.props.parent.updateProperty("price", this)});
        // () => {this.props.parent.NEWupdateProperty("price")});
    }

    //evaluate isCardBlank, given new value/s for name, state and/or price
    isCardBlankEval({name = this.state.name, price = this.state.price, calories = this.state.calories} = {})
    {
        return (name == "" && price == 0 && calories == 0);
    }

    priceChangeHandler(event)
    {
        this.setState({priceValueField: event.target.value, isCardBlank: (event.target.value == "")})
    }

    caloriesBlurHandler(event)
    {
        let caloriesRegex = /\d+/;
        let caloriesArray = caloriesRegex.exec(this.state.caloriesValueField);
        let newCalories = (caloriesArray == null) ? 0 : parseInt(caloriesArray[0]);
        let newCaloriesValueField = (newCalories == 0) ? "" : newCalories + "cal";
        this.setState({calories: newCalories, caloriesValueField: newCaloriesValueField, isCardBlank: this.isCardBlankEval({calories: newCalories})},
        () => {this.props.parent.updateProperty("calories", this)});
        // () => {this.props.parent.NEWupdateProperty("calories")});
    }

    caloriesChangeHandler(event)
    {
        this.setState({caloriesValueField: event.target.value, isCardBlank: (event.target.value == "")})
    }

   


    //when a field is focused and the user presses enter or escape, this will blur the field
    fieldKeyUpHandler(event)
    {
        if(event.key == "Enter" || event.key == "Escape")
            event.target.blur();   
    }

    priceFocusHandler()
    {
        this.setState((state) => ({priceValueField: (state.price == 0 ? "" : state.price)}));
    }

    caloriesFocusHandler()
    {
        this.setState((state) => ({caloriesValueField: (state.calories == 0 ? "" : state.calories)}));
    }

    fieldStyling = "bg-transparent border-none outline-none text-white placeholder:text-transparent hover:placeholder:text-white focus:placeholder:text-white hover:bg-white/25 focus:bg-white/50 basis-1/3";
    cardStyling = "rounded-lg border-4 border-black m-0.5 p-0.5";

    blankStyling = " bg-slate-500";
    filledStyling = " bg-amber-400";


    getPrice()
    {
        return this.state.price;
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
                    <input className={this.fieldStyling + " text-3xl font-bold"} onChange={this.nameUpdate} onKeyUp={this.fieldKeyUpHandler} placeholder="meal name"  />
                </h1>
                <p>
                    <input className={this.fieldStyling} placeholder="calories" onFocus={this.caloriesFocusHandler} onBlur={this.caloriesBlurHandler} onChange={this.caloriesChangeHandler} onKeyUp={this.fieldKeyUpHandler} value={this.state.caloriesValueField} />
                    <br />
                    <input className={this.fieldStyling} placeholder="price" onFocus={this.priceFocusHandler} onBlur={this.priceBlurHandler} onChange={this.priceChangeHandler} onKeyUp={this.fieldKeyUpHandler} value={this.state.priceValueField}/>
                </p>
        </div>
        );

    }
}
