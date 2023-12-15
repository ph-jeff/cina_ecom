import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ActionButton from '../../../components/ActionButton';
import api from '../../../services/apiRequest';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Create = ({ open, setOpen, handleClose, setLoading }) => {
    const [categoryName, setCategoryName] = useState("");

    function addCategory(e) {
        e.preventDefault()
        setOpen(false)
        setLoading(true)
        api.post('/api/admin/category', {
            category_name: categoryName
        })
            .then(response => {
                console.log(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error.response.data.error)
                alert(error.response.data.error)
                setLoading(false)
            })
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Category
                </Typography>
                <form onSubmit={addCategory}>
                    <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500" type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                    <div className='mt-3 flex justify-center w-full'>
                        <ActionButton actionName={'Save'} />
                    </div>
                </form>
            </Box>
        </Modal>
    )
}

export default Create