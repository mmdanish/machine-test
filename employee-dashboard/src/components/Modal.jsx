import React from "react";

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      {children}
    </div>
  );
};

export default Modal;
