
import React, {useState} from 'react';
import CarViewComponent from "./CarViewComponent";
import {getToken} from "../utils/auth";
import axios from "axios";
import {setFeedback} from "../utils/feedback";
import {API_URL} from "../variables";

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
        e.preventDefault()
        console.log('Form submitted')
        axios.post(`${API_URL}/api/cars`, car, {
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

    }
    return (
        <CarViewComponent car={car} onCarChange={onCarChange} onSubmit={onFormSubmit} displayedErrors={displayedErrors}/>
    )
}

export default CarInsertComponent;