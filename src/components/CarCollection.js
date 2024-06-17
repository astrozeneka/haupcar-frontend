import React, {useEffect, useState} from 'react';
import { setToken, getToken, removeToken } from "../utils/auth";
import { Navigate } from 'react-router-dom';
import axios from "axios";

const CarCollection = () => {
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
                <button className="btn btn-primary">
                    Add a new car
                </button>
            </div>

            <div className="container">
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
                                    <a href={`/edit/${entity.id}`}>Edit</a> | <a href={`/delete/${entity.id}`}>Delete</a>
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

export default CarCollection;