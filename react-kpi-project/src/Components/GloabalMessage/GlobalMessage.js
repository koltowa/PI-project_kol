import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/redux/actions";


const GlobalMessage = () => {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.app.message);

    return (
        <div className="modal fade show" style={{ display: 'inline' }} tabIndex="2">
            <div className="modal-dialog border border-info" >
                <div className="modal-content">
                    <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title">Повідомлення!</h5>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={() => { dispatch(actions.hideMessage()) }} className="btn btn-secondary" data-bs-dismiss="modal">Закрити</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default GlobalMessage;
