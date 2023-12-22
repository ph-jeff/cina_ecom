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
    const stage = [
        {
            stage: 1,
            progres: 'pending'
        },
        {
            stage: 2,
            progres: 'prepairing'
        },
        {
            stage: 3,
            progres: 'to ship'
        },
        {
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
                    <>
                        <div className="flex justify-center " key={index}>
                            <div className="flex items-center bg-gray-800 w-[10px] h-[100px]">
                                {index % 2 == 0 ? (
                                    <li className="list-none p-1">
                                        <p className="relative w-[20px] h-[20px] bg-gray-800 rounded">a</p>
                                    </li>
                                ) : (
                                    <li className="list-none p-1">
                                        <p className="relative w-[20px] h-[20px] bg-gray-800 rounded">a</p>
                                    </li>
                                )}
                            </div>
                        </div>
                    </>
                    
                ))}
            </div>
        </Box>
    </Modal>
  )
}

export default Track