//import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Row, Col, Container, Card} from 'react-bootstrap';
import MealCard from '../app_modules/mealCard.jsx'

class HomePage extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <>
                <Container>
                    <Row>
                        <Col style={{maxWidth: '18rem'}}>
                            <MealCard />
                        </Col>
                    </Row>
                </Container>
            </>
            
        );
    }
}

export default HomePage;