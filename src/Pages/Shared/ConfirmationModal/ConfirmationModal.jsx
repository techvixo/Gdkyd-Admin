import React from 'react';
import { MdOutlineWarningAmber } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';

const ConfirmationModal = ({ title, message, closeModal, successAction, successButton, modalData }) => {
    return (
        <div className=''>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal text-center ">
                <div className="modal-box bg-[#fffffff8]">
                    <div className="flex justify-center items-center text-yellow-200 font-bold text-6xl"><MdOutlineWarningAmber/></div>
                    <h3 className="font-bold text-xl text-[#44A0D8]">{title}</h3>
                    <p className="py-2">{message}</p>
                    <div className='flex justify-end items-center py-4 gap-4 w-full'>
                        <button onClick={closeModal} className="btn btn-xs btn-outline btn-success flex items-center gap-1"><AiOutlineClose/>Cancel</button>
                        <label htmlFor="confirmation-modal" onClick={() => successAction(modalData)} className="btn btn-xs btn-outline btn-error   flex items-center gap-1"><RiDeleteBin6Line/>{successButton}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;