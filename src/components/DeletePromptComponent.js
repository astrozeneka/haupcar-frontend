import React from 'react';
import { useState } from "react";
import axios from 'axios';
import {getToken} from "../utils/auth";
import {setFeedback} from "../utils/feedback";

const DeletePromptComponent = () => {
    let url = window.location.pathname.split('/')
    let id = url[url.length - 1]

    const goBack = () => {
        window.location.href = `/cars/`
    }

    const confirmDelete = () => {
        axios.delete(`http://localhost:8000/api/cars/${id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }).then((response) => {
            setFeedback('Deleted successfully', 'success')
            window.location.href = `/cars/`
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <div className="container">
            <div className="centerVertically">
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-center pt-3">Delete item</h2>
                    </div>
                    <div className="card-body">
                        <p>Are you sure to delete this item from the database</p>
                        <div className="prompt-footer">
                            <button className="btn btn-primary" onClick={goBack}>
                                Back
                            </button>
                            <button className="btn btn-danger" onClick={confirmDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DeletePromptComponent