
/*
    น่าจะไม่ต้องใช้
 */
import React, {useState} from 'react';

const FileUploadComponent = ({label, value, onChange}) => {

    const handleFileInputChange = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onload = (e) => {
            let fileData = e.target.result
            onChange({
                target: {
                    name: 'document',
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
                {(value !== null && value !== undefined) ? (<a href="#" onClick={downloadFile}>Download</a>) : ''}
            </label>

            <input type="file" className="form-control" onChange={handleFileInputChange}/>
        </div>
    )
}
export default FileUploadComponent;
