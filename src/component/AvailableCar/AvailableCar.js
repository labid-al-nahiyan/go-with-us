import React, { useContext } from 'react';
import tPeople from '../../images/people.png'
import './AvailableCar.css';
import motorCycle from '../../images/motorcycle.png';
import privateCar from '../../images/privateCar.png';
import bus from '../../images/bus.png';
import metroRail from '../../images/metroRail.png';
import { UserContext } from '../../App';

const AvailableCar = ({ price, people }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {vehicle,vehicleName}=loggedInUser;
    console.log(vehicle)
    const img=vehicle
    return (
        <div className="availableCarCart">
            <div>
                <img src={`${vehicle}`} height="20px" alt="" /> 
                <span>{vehicleName}</span>
                <img src={tPeople} height="20px" alt="" />
                <span>{people}</span>
            </div>
            <div>{price}</div>
        </div>
    );
};

export default AvailableCar;