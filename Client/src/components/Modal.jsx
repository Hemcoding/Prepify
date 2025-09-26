import React from 'react'

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm">
      {/* Modal content */}
      <div className="relative flex flex-col w-[90%] max-w-lg bg-white/95 shadow-2xl rounded-2xl overflow-hidden border border-emerald-100">
        
        {/* Modal header */}
        {!hideHeader && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              {title}
            </h3>
          </div>
        )}

        {/* Close button */}
        <button
          type="button"
          className="absolute top-3.5 right-3.5 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 transition-colors"
          onClick={onClose}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l12 12M13 1L1 13"
            />
          </svg>
        </button>

        {/* Modal body */}
        <div className="flex-1 flex items-center justify-center px-6 py-5">
          <div className="w-full flex justify-center items-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;