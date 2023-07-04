"use client";
import React from "react";
import "./style.css";

interface PropModal {
  title: string;
  body: React.ReactElement;

  closeButton?: React.ReactElement;
  modalId?: string;
}

const Modal: React.FC<PropModal> = ({ title, body, closeButton, modalId }) => {
  return (
    <dialog
      id={modalId}
      className="shadow-lg rounded-xl bg-[#1f2937] xl:w-[36rem] md:w-[36rem] sm:w-[36rem] xl:h-[30rem] md:h-[30rem] sm:h-[30rem] p-0 overflow-hidden"
    >
      <div className="w-full ">
        <div>
          <div className=" flex items-center justify-center pb-3 py-4 text-white">
            {closeButton}
            <div className="text-2xl font-semibold ">{title}</div>
          </div>
          <hr className="border-[1px] border-[#E4E7EB]"></hr>
        </div>
        <div className="py-6 px-6  flex  flex-col items-center justify-center w-full text-white">
          {body}
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
