import React, {useEffect, useState} from 'react';
import { setToken, getToken, removeToken } from "../utils/auth";
import {Navigate, useSearchParams} from 'react-router-dom';
import axios from "axios";
import {getFeedback, removeFeedback} from "../utils/feedback";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDownload} from "@fortawesome/free-solid-svg-icons";

const CarCollectionComponent = () => {
    const [entityList, setEntityList] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const [searchParams] = useSearchParams();

    // Load the data from the API
    useEffect(()=>{
        const fetchData = async () => {
            try {
                // get the parameter from the GET parameter
                const page = parseInt(searchParams.get('page')) || 1
                setActivePage(page)
                let offset = (page - 1) * 10

                const response = await axios.get('http://localhost:8000/api/cars/?offset=' + offset, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.status === 403) {
                    console.error('Invalid JWT token')
                }
                setEntityList(response.data.data);
                setPageCount(Math.ceil(response.data.count / 10))
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

    const handleDownloadDocument = (id) => {
        console.log("Click handler")
        axios.get('http://localhost:8000/api/cars/' + id, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then((response) => {
            if (response.status === 200){
                let entityDocument = response.data.document
                // Trigger download
                let link = document.createElement('a')
                link.href = entityDocument
                let filetype = entityDocument.split(';')[0].split(':')[1]
                let fileExtension = filetype.split('/')[1]
                link.download = `document-${id}.${fileExtension}`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }
        })
    }

    const handleDownloadImage = (id) => {
        console.log("Click handler")
        axios.get('http://localhost:8000/api/cars/' + id, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then((response) => {
            if (response.status === 200){
                let entityImage = response.data.image
                // Trigger download
                let link = document.createElement('a')
                link.href = entityImage
                let filetype = entityImage.split(';')[0].split(':')[1]
                let fileExtension = filetype.split('/')[1]
                link.download = `image-${id}.${fileExtension}`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }
        })
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
                                <td>
                                    { (entity.hasDocument) ? (
                                        <button className="btn btn-primary btn-sm"
                                                onClick={() => handleDownloadDocument(entity.id)}
                                        >
                                            <FontAwesomeIcon icon={faDownload} />
                                            Download
                                        </button>
                                    ) : ''}
                                </td>
                                <td>
                                    { (entity.hasImage) ? (
                                        <button className="btn btn-warning btn-sm"
                                                onClick={() => handleDownloadImage(entity.id)}
                                        >
                                            <FontAwesomeIcon icon={faDownload} />
                                            Download
                                        </button>
                                    ) : ''}
                                </td>
                                <td>
                                    <a href={`/cars/edit/${entity.id}`}>Edit</a> | <a href={`/cars/delete/${entity.id}`}>Delete</a>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                <div className="d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            { activePage > 1 ? (
                                <li className="page-item"><a className="page-link"
                                                             href={'/cars?page=' + (activePage - 1)}>Previous</a></li>
                            ) : (
                                <li className="page-item"><span className="page-link disabled">Previous</span></li>
                            )}

                            {Array.from({length: pageCount}, (_, i) => {
                                return (
                                    <li className="page-item" key={i}>
                                        {activePage === i+1 ? (
                                            <span className="page-link active">{i + 1}</span>
                                        ) : (
                                            <a className="page-link" href={`/cars?page=${i + 1}`}>{i + 1}</a>
                                        )}

                                    </li>
                                )
                            })}
                            { activePage < pageCount ? (
                                <li className="page-item"><a className="page-link" href={'/cars?page=' + (activePage + 1)}>Next</a></li>
                            ) : (
                                <li className="page-item"><span className="page-link disabled">Next</span></li>
                            )}

                        </ul>
                    </nav>
                </div>
            </div>
        </div>
)
}

export default CarCollectionComponent;