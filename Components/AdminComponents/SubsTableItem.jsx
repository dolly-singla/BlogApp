import React from 'react'

const SubsTableItem = ({ email, mongoId, deleteEmail, date }) => {
  const emailDate = new Date(date);

  return (
    <tr className='border-b border-gray-700 hover:bg-[#2a2e43] transition'>
      <th scope='row' className='px-6 py-4 font-medium text-white whitespace-nowrap text-left'>
        {email || "No Email"}
      </th>
      <td className='px-6 py-4 hidden sm:block text-white'>
        {emailDate.toDateString()}
      </td>
      <td
        className='px-6 py-4 text-red-400 hover:text-red-500 font-bold cursor-pointer'
        onClick={() => deleteEmail(mongoId)}
        title='Delete Email'
      >
        ×
      </td>
    </tr>
  )
}

export default SubsTableItem;
