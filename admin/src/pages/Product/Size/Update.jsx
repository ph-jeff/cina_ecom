import React, { useEffect, useState } from 'react'

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

const Update = ({ size, open, setOpen, handleClose }) => {
    const [sizeOrigin, setSizeOrigin] = useState("")
    function updateSize(e){
        e.preventDefault()
        api.post('/api/admin/size/' + size._id, {
            size_origin: sizeOrigin,
        })
        .then(response => {
            console.log(response)
            setOpen(false)
        })
        .catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {
        setSizeOrigin(size.unit_size || "")
    }, [size])
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Update Size
                </Typography>
                <form onSubmit={updateSize}>
                    <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500" type="text" value={sizeOrigin} onChange={(e) => setSizeOrigin(e.target.value)} />
                    <div className='mt-3 flex justify-center w-full'>
                        <ActionButton actionName={'Save'} />
                    </div>
                </form>
            </Box>
        </Modal>
    )
}

export default Update