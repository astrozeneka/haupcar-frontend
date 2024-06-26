import React from "react";
import FileUploadComponent from "./FileUploadComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const CarViewComponent = ({ car, onCarChange, onSubmit, displayedErrors }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onCarChange({ ...car, [name]: value });
    }

    return (
        <div className="container">
            <div className="centerVertically">
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-center pt-3">HAUPCAR</h2>
                        <p className="text-center">Please Insert the car information</p>
                    </div>
                    <div className="card-body">
                        <a className="btn btn-secondary" href="/cars">
                            <FontAwesomeIcon icon={faArrowLeft} className="mx-1"/>
                            Back
                        </a>
                        <form action="#" onSubmit={onSubmit}>
                            <div className="form-group">
                                <label>Brand</label>
                                <input type="text" className="form-control" name="brand"
                                       value={car.brand} onChange={handleInputChange}/>
                                <span className="text-danger">{displayedErrors.brand}</span>
                            </div>
                            <div className="form-group">
                                <label>Model</label>
                                <input type="text" className="form-control" name="model"
                                    value={car.model} onChange={handleInputChange}/>
                                <span className="text-danger">{ displayedErrors.model }</span>
                            </div>
                            <div className="form-group">
                                <label>Registration number</label>
                                <input type="text" className="form-control" name="registrationNumber"
                                    value={car.registrationNumber} onChange={handleInputChange}/>
                                <span className="text-danger">{ displayedErrors.registrationNumber }</span>
                            </div>
                            <div className="form-group">
                                <label>Notes</label>
                                <textarea className="form-control" name="notes"
                                    value={car.notes} onChange={handleInputChange}/>
                            </div>

                            <div className="form-group">
                                <FileUploadComponent name="document"
                                                     label="Car documents"
                                    value={car.document} onChange={handleInputChange}/>
                            </div>

                            <div className="form-group">
                                <FileUploadComponent name="image"
                                                     label="Car image"
                                                     value={car.image} onChange={handleInputChange}
                                                     preview={true}
                                />
                            </div>

                            <div className="my-2">
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CarViewComponent;