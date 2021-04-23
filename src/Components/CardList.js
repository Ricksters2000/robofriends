import React from 'react';
import Card from './Card';

const CardList = ({robots}) => {
    //used to return an error with the help of error boundries (useful for displaying user-friendly errors)
    // if(true) {
    //     throw new Error('has recieved an error');
    // }

    const cardComponent = robots.map((user, i) => <Card key={i} name={robots[i].name} id={robots[i].id} email={robots[i].email} />);
    
    return(
        <div>
            {cardComponent}
        </div>
    );
}

export default CardList;