import React, {useEffect, useState} from 'react';
import { setToken, getToken, removeToken } from "../utils/auth";
import { Navigate } from 'react-router-dom';
import axios from "axios";
import {getFeedback, removeFeedback} from "../utils/feedback";

const CarCollectionComponent = () => {
    const [entityList, setEntityList] = useState([])

    // Load the data from the API
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/cars/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.status === 403) {
                    console.error('Invalid JWT token')
                }
                setEntityList(response.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData()
    }, []) // No dependency

    let token = getToken();
    if (!token) {
        return <Navigate to="/login" />
    }

    let feedback = getFeedback()
    if (feedback.message) {
        setTimeout(() => {
            removeFeedback()
        }, 1500)
    }



    const handleLogoutClick = () => {
        removeToken();
        window.location.reload();
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">Haupcar Information System</a>
                    <nav>
                        <button className="btn btn-outline-primary" onClick={handleLogoutClick}>
                            Logout
                        </button>
                    </nav>
                </div>
            </nav>

            <div className="my-3 container">
                <a className="btn btn-primary" href="/cars/new">
                    Add a new car
                </a>
            </div>

            <div className="container">
                { feedback.message ? (<div className="alert alert-success">
                    { feedback.message }
                </div>) : '' }
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Model</th>
                        <th scope="col">Registration Number</th>
                        <th scope="col">Notes</th>
                        <th scope="col">Documents</th>
                        <th scope="col">Pictures</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {entityList.map((entity) => {
                        return (
                            <tr key={entity.id}>
                                <td>{entity.id}</td>
                                <td>{entity.brand}</td>
                                <td>{entity.model}</td>
                                <td>{entity.registrationNumber}</td>
                                <td>{entity.notes}</td>
                                <td>Download file</td>
                                <td>Download image</td>
                                <td>
                                    <a href={`/cars/edit/${entity.id}`}>Edit</a> | <a href={`/cars/delete/${entity.id}`}>Delete</a>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
)
}

export default CarCollectionComponent;