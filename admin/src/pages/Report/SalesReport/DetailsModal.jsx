import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import api from "../../../services/apiRequest";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const DetailsModal = ({ open, setOpen, salesId }) => {
    const [customer_information, setCustomerInformation] = useState({})
    const [order_information, setSalesInformation] = useState({})

    useEffect(() => {
        api.get(`/api/admin/report/sales/information/${salesId}`)
        .then(response => {
            console.log(response)
            setCustomerInformation(response.data.customer_information)
            setSalesInformation(response.data.information)
        })
        .catch(error => {
            console.log(error)
        })
        console.log(salesId)
    }, [salesId]);

    return (
        <Modal
            open={open}
            onClose={setOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div>
                    <h1>Customer Details:</h1>
                    <div className="container">
                        <div>
                            <label htmlFor="">Name: </label>
                            <span>{customer_information.firstname} {customer_information.middlename} {customer_information.lastname}</span>
                        </div>
                        <div>
                            <label htmlFor="">Customer since: </label>
                            <span>{customer_information.createdAt}</span>
                        </div>
                    </div>
                </div>
                <div className="border">
                    <h1>Order Details:</h1>
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Purchase Item</th>
                                    <th>Unit Size</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {order_information.items.map((item) => (
                                    <tr key={item._id}>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default DetailsModal;
