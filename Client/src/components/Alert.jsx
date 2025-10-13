import React from 'react'

const Alert = ({content, onDelete, buttonContent}) => {
  return (
    <div className='p-5'>
        <p className='text-[14px]'>{content}</p>
        <div className='flex justify-end mt-6'>
            <button 
                type="button"
                className='btn-small'
                onClick={onDelete}
            >
                {buttonContent}
            </button>
        </div>
    </div>
  )
}

export default Alert