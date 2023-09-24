import React from 'react'

const Table = ({users}) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">User ID</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Created At</th>
                        <th className="px-4 py-2 text-left">Updated At</th>
                        {/* <th className="px-4 py-2 text-left">Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {users.length != 0 ? (
                        <>
                            {users.map((user) => (
                                <tr className="hover:bg-gray-200" key={user._id}>
                                    {/* <td>
                                <div className="w-16 h-16 overflow-hidden rounded-full">
                                    <img src='' alt='test' className="w-full h-full object-cover"/>
                                </div>
                            </td> */}
                                    <td className="px-4 py-2">{user._id}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.createdAt}</td>
                                    <td className="px-4 py-2">{user.updatedAt}</td>
                                    {/* <td className="px-4 py-2">
                                <Link  className="text-blue-500 hover:underline mr-2">Edit</Link>
                                <button className="text-red-500 hover:underline">Delete</button>
                            </td> */}
                                </tr>
                            ))}
                        </>
                    ) : (
                        <>
                            <tr className="hover:bg-gray-200">
                                <td colSpan="5" className="text-center py-4">No data available</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table