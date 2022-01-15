import React from 'react';
import MealCard from '../components/mealCard.jsx';
import MealDay from '../components/mealDay.jsx';

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
                <MealDay />
                <MealDay />  
            </div>
            
        );
    }
}

export default HomePage;