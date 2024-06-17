
import React, {useState} from 'react';
import CarViewComponent from "./CarViewComponent";
import {getToken} from "../utils/auth";
import axios from "axios";
import {setFeedback} from "../utils/feedback";

const CarInsertComponent = () => {
    let [car, setCar] = useState({
        brand: '',
        model: '',
        registrationNumber: '',
        notes: ''
    })
    let [displayedErrors, setDisplayedErrors] = useState({
        brand: '',
        model: '',
        registrationNumber: '',
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
            if (error.response.status === 422) {
                setDisplayedErrors(error.response.data)
            }
        })

        e.preventDefault()
    }
    return (
        <CarViewComponent car={car} onCarChange={onCarChange} onSubmit={onFormSubmit} displayedErrors={displayedErrors}/>
    )
}

export default CarInsertComponent;