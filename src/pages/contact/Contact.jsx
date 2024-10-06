import React from 'react'

const Contact = () => {
  return (
    <div className="px-4 pb-10 font-montserrat text-text flex justify-center items-center ">
      <div className=' w-full md:w-[40%]'>
      <h1 className=' uppercase text-2xl font-medium'>Get in touch</h1>
      <p className=' text-[10px] mb-8'>We're always here to help. Whether you have a question, a suggestion, or just want to say hello, we'd love to hear from you. Our team is dedicated to providing the best possible experience for our users, and your feedback is invaluable in helping us achieve that goal.</p>
      <form className='bg-card p-4'>
        <h3 className='text-md mb-2'>Contact Form</h3>
        <div className=' grid grid-cols-1 md:grid-cols-2 gap-5 mb-4'>
        <div className='flex flex-col'>
          <label className=' text-xs'>Name <span>*</span></label>
          <input type="text" className=' bg-input p-1 focus:outline-none' />
        </div>
        <div className='flex flex-col '>
          <label className=' text-xs'>Email Address <span>*</span></label>
          <input type="email" className=' bg-input p-1 focus:outline-none' />
        </div>
        </div>
        <div className='flex flex-col gap-1'>
        <label className=' text-xs'>Message <span>*</span></label>
          <textarea rows={4} className=' bg-input p-1 focus:outline-none' ></textarea>
        </div>
        <div className="flex justify-end mt-4">
              <button
                className="bg-button p-2 md:px-3 md:py-[3px] rounded-sm font-medium text-xs"
              >
                Send
              </button>
            </div>
      </form>
    </div>
    </div>
  )
}

export default Contact