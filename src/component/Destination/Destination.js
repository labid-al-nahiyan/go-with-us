import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import './Destination.css';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import fakeData from '../../fakeData.js'
import AvailableCar from '../AvailableCar/AvailableCar';

import { UserContext } from '../../App';


const Destination = () => {
    const [isSearch, setIsSearch] = useState(false)
    const [availableCar,setAvailableCar]=useState([])

    const [order, setOrder] = useState({
        to: 'Mirpur1',
        from: 'Motijheel'
    })
    const handleBlur = (event) => {
        let newOrder = { ...order }
        newOrder[event.target.name] = event.target.value
        setOrder(newOrder)
    }
    useEffect(()=>{
        const data=fakeData;
        setAvailableCar(data)
    },[])
    return (
        <div className="container-fluid">
            <div className="row">
                <hr/>
                <div className="col-12 col-lg-4">
                    <div className="destination-form">
                        {!isSearch &&
                            <form action="">
                                <p>Pick From</p>
                                <input className="destination-input-field" type="text" name="from" onBlur={handleBlur} />
                                <p>Pick to</p>
                                <input className="destination-input-field" type="text" name="to" onBlur={handleBlur} />
                                <button className="orange" onClick={() => { setIsSearch(true) }}>Search</button>
                            </form>
                        }
                        {isSearch &&
                            <div>
                                <div className="orange">
                                   < div><b>From</b> : {order.to}</div>
                                    <div><b>To</b> : {order.from}</div>
                                </div>
                                <div className="available-car"> 
                                    {
                                        availableCar.map((Car)=>{
                                            return <AvailableCar price={Car.price}  people={Car.people} key={Car.id}></AvailableCar>
                                        })
                                    }
                                </div>
                                
                                
                            </div>
                        }
                    </div>
            </div>
            <div className="col-12 col-lg-8">
                <div className="map">
                <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.70251832553!2d90.34510367537652!3d23.79456245308002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0e96fce29dd%3A0x6ccd9e51aba9e64d!2sMirpur-1%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1616224257347!5m2!1sen!2sbd" width="100%" height="550px"  loading="lazy"></iframe>
                </div>
            </div>
        </div>
        </div >
    );
};

export default Destination;