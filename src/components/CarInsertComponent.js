
import React, {useState} from 'react';
import CarViewComponent from "./CarViewComponent";
import {getToken} from "../utils/auth";
import axios from "axios";
import {setFeedback} from "../utils/feedback";

const CarInsertComponent = () => {
    let [car, setCar] = useState({
        brand: 'Volkswagen',
        model: ''
    })
    const onCarChange = (updatedCar) => {
        console.log(updatedCar)
        setCar(updatedCar)
    }
    let onFormSubmit = (e) => {
        console.log('Form submitted')
        axios.post('http://localhost:8000/api/cars', car, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }).then((response) => {
            if (response.status === 200){
                setFeedback('Car inserted successfully', 'success')
                window.location.href = '/'
            }
        }).catch((error) => {
            console.error(error)
        })

        e.preventDefault()
    }
    return (
        <CarViewComponent car={car} onCarChange={onCarChange} onSubmit={onFormSubmit}/>
    )
}

export default CarInsertComponent;