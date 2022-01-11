import React from 'react';
import MealCard from '../components/mealCard.jsx'

class HomePage extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <MealCard />
                    <MealCard />
                    <MealCard />
                </div>
                <div className="flex flex-col">
                    <MealCard />
                    <MealCard />
                </div>   
            </div>
            
        );
    }
}

export default HomePage;