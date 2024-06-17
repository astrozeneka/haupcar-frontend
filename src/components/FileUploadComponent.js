

import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDownload, faFileDownload} from "@fortawesome/free-solid-svg-icons";

const FileUploadComponent = ({name, label, value, onChange, preview}) => {

    const handleFileInputChange = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onload = (e) => {
            let fileData = e.target.result
            onChange({
                target: {
                    name: name,
                    value: fileData
                }
            });
        }
        reader.readAsDataURL(file)
    }

    const downloadFile = (e) => {
        e.preventDefault()
        let link = document.createElement('a')
        link.href = value
        let filetype = value.split(';')[0].split(':')[1]
        let fileExtension = filetype.split('/')[1]
        link.download = label + "." + fileExtension
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    return (
        <div>
            <label>
                { label }
                {(value !== null && value !== undefined) ? (
                    <button className="btn btn-primary btn-sm mx-3" onClick={downloadFile}>
                        <FontAwesomeIcon icon={faDownload} className="mx-1"/>
                        Download
                    </button>
                ) : ''}
            </label>
            { preview ? (<div>
                <img src={value} className="img-thumbnail" alt="Preview" style={{maxWidth: "200px"}}/>
            </div>) : null }
            <input type="file" className="form-control my-2" onChange={handleFileInputChange}/>
        </div>
    )
}
export default FileUploadComponent;
