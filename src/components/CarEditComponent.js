import React, {useEffect, useState} from 'react';
import CarViewComponent from "./CarViewComponent";
import {getToken} from "../utils/auth";
import axios from "axios";
import {setFeedback} from "../utils/feedback";

const CarEditComponent = () => {
    // Load the car from the server first
    // Get the route variable
    let url = window.location.pathname.split('/')
    let id = url[url.length - 1]
    const [ entity, setEntity ] = useState(null)
    let [displayedErrors, setDisplayedErrors] = useState({
        brand: '',
        model: '',
        registrationNumber: '',
    })
    useEffect(()=>{
        const fetchData = async ()=> {
            axios.get(`http://localhost:8000/api/cars/${id}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }).then((response) => {
                setEntity(response.data)
            }).catch((error) => {
                console.error(error)
                if (error.response.status === 422) {
                    setDisplayedErrors(error.response.data)
                }
            })
        }
        fetchData()
    }, [])

    const onFormSubmit = (e) => {
        axios.put(`http://localhost:8000/api/cars/${id}`, entity, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }).then((response) => {
            if (response.status === 200){
                setFeedback('Car updated successfully', 'success')
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
        (entity !== null) ? (
        <CarViewComponent car={entity} onCarChange={setEntity} onSubmit={onFormSubmit}
            displayedErrors={displayedErrors}
        />
        ) : null
    )
}

export default CarEditComponent;