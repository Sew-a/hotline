import React from 'react';
import ReactDOM from "react-dom";


const allValues = (tor) => {
    let str = '';
    for (let p in tor) {
        if (tor.hasOwnProperty(p)) {
            str += document.createElement("li").innerText = p + '-' + tor[p];
        }
    }
    return str;
}

const NewModal = ({open, children, onClose, useName}) => {
    if(!open) return null;

    return ReactDOM.createPortal(
        <>
        <div className='modal'>
            <div onClick={onClose} className="modal-close-button ">&#10006;</div>
            <ul className="user_info">{allValues(useName)}</ul>
            <div className="children">{children}</div>
        </div>
        </>,
        document.getElementById("portal")
    );
}

export default NewModal;