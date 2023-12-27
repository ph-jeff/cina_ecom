import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#fff", // Set background color
    boxShadow: 24,
    p: 4, // Padding
    borderRadius: 8, // Rounded corners
};

const Track = ({open, setOpen, transaction}) => {
    const [modalLoading, setModalLoading] = useState(false);

    const stage = [
        {
            id: 1,
            stage: 1,
            progres: 'pending'
        },
        {
            id: 2,
            stage: 2,
            progres: 'prepairing'
        },
        {
            id: 3,
            stage: 3,
            progres: 'to ship'
        },
        {
            id: 4,
            stage: 4,
            progres: 'delivered'
        },
    ]
    useEffect(() => {
        console.log(transaction)
    }, [transaction])

  return (
    <Modal
            open={open}
            onClose={setOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <div className="">
                {stage.map((stage, index) => (
                    <div className="flex" key={stage.id}>
                        <div className="flex items-center bg-gray-800 w-[10px] h-[100px]">
                            {index % 2 == 0 ? (
                                <li className="list-none p-1 bg-gray-800 rounded">
                                    <p className="relative w-[20px] h-[20px]">{stage.progres}</p>
                                </li>
                            ) : (
                                <li className="list-none p-1 bg-gray-800 rounded">
                                    <p className="relative w-[20px] h-[20px]">{stage.progres}</p>
                                </li>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* <div className="border mb-2">
                <h1 className="text-xl font-semibold text-gray-800">Customer Details:</h1>
                <div className="container">
                    <div>
                        <label className="text-gray-600" htmlFor="">Name: </label>
                        <span className="font-medium text-gray-800">
                            test
                        </span>
                    </div>
                    <div>
                        <label className="text-gray-600" htmlFor="">Customer since: </label>
                        <span className="font-medium text-gray-800"></span>
                    </div>
                </div>
            </div> */}

            <div className="border">
                <h1 className="text-xl font-semibold text-gray-800">Order Details:</h1>
                <div className="container">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left">Purchase Item</th>
                                <th className="text-left">Unit Size</th>
                                <th className="text-left">Quantity</th>
                                <th className="text-left">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modalLoading ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">
                                        <ModalLoading />
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    <tr>
                                        <td className="text-left"></td>
                                        <td className="text-left"></td>
                                        <td className="text-left"></td>
                                        <td className="text-left"></td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Box>
    </Modal>
  )
}

const ModalLoading = () => {
    return (
        <div className="flex items-center justify-center space-x-2 h-full">
            <div className="w-4 h-4 bg-violet-600 dark:bg-violet-400 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-violet-600 dark:bg-violet-400 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-violet-600 dark:bg-violet-400 rounded-full animate-pulse"></div>
        </div>
    );
};

export default Track