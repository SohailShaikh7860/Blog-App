import React, {useId} from 'react'

function Select({
     options,
    label,
    className,
    ...props
},ref) {
  const id = useId()
  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className=''>{label}</label>}
        <select id={id} className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} {...props} ref={ref}>

            {options?.map((option)=>(
                <option key={option} value={option}>{option}</option>
            ))}
            </select>
    </div>
  )
}

export default React.forwardRef(Select)
