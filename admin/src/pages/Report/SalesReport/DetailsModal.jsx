import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import api from "../../../services/apiRequest";
import Loading from "../../../components/Loading";

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

const ModalLoading = () => {
    return (
        <div className="flex items-center justify-center space-x-2 h-full">
            <div className="w-4 h-4 bg-violet-600 dark:bg-violet-400 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-violet-600 dark:bg-violet-400 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-violet-600 dark:bg-violet-400 rounded-full animate-pulse"></div>
        </div>
    );
};

const DetailsModal = ({ open, setOpen, salesId }) => {
    const [customer_information, setCustomerInformation] = useState({});
    const [order_information, setSalesInformation] = useState({});
    const [sold_items, setSoldItems] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setModalLoading(true);
        api.get(`/api/admin/report/sales/information/${salesId}`)
            .then(response => {
                console.log(response);
                setCustomerInformation(response.data.customer_information);
                setSalesInformation(response.data.information);
                setSoldItems(response.data.sold_items);
                setLoading(false);
                setModalLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
                setModalLoading(false);
            });
        console.log(salesId);
    }, [salesId]);

    return (
        <Modal
            open={open}
            onClose={setOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="border mb-2">
                    <h1 className="text-xl font-semibold text-gray-800">Customer Details:</h1>
                    <div className="container">
                        <div>
                            <label className="text-gray-600" htmlFor="">Name: </label>
                            <span className="font-medium text-gray-800">
                                {customer_information.firstname} {customer_information.middlename} {customer_information.lastname}
                            </span>
                        </div>
                        <div>
                            <label className="text-gray-600" htmlFor="">Customer since: </label>
                            <span className="font-medium text-gray-800">{customer_information.createdAt}</span>
                        </div>
                    </div>
                </div>
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
                                    sold_items.map((item) => (
                                        <tr key={item._id}>
                                            <td className="text-left">{item.product_id.name}</td>
                                            <td className="text-left">{item.size.unit_size}</td>
                                            <td className="text-left">{item.quantity}</td>
                                            <td className="text-left">{item.quantity * item.product_id.price}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default DetailsModal;
