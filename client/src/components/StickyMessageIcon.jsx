import React, { useEffect, useState } from 'react'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import api from '../services/apiRequest';


const buttonStyles = {
    backgroundColor: 'black', // Change to your desired background color
    color: 'white', // Change to your desired text color
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
};

const conversations = [
    {
        user: "user1",
        message: "Hello this is jeff seome asdfmasdf  sadf asdf asdfasdf",
    },
    {
        user: "user2",
        message: "Hello",
    },
    {
        user: "user2",
        message: "Hello",
    },
    {
        user: "user2",
        message: "Hello",
    },
    {
        user: "user2",
        message: "Hello",
    },
    {
        user: "user2",
        message: "Hello",
    },
    {
        user: "user2",
        message: "Hello",
    },
    {
        user: "user2",
        message: "Hello",
    },
    {
        user: "user2",
        message: "Hello",
    },
    {
        user: "user2",
        message: "Hello",
    },
]

const StickyMessageIcon = () => {
    const [open, setOpen] = useState(false)
    const [conversations, setConversations] = useState([])
    const [message, setMessage] = useState("")
    const openMessage = () => {
        setOpen(!open)
    }

    const closeMessage = () => {
        setOpen(false)
    }

    function sendMessage(e){
        e.preventDefault()
        api.post('/api/user/message', {
            message
        })
        .then(response => {
            console.log(response)
            setMessage("")
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        function fetchConversation(){
            api.get('/api/user/message')
            .then(response => {
                console.log(response)
                setConversations(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
        fetchConversation()
    }, [])

    return (
        <div className="fixed bottom-4 right-4 text-white rounded-full shadow-md">
            <button onClick={openMessage} style={buttonStyles}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <CommentOutlinedIcon />
                </svg>
            </button>

            <div className={`fixed bottom-24 right-4 bg-white w-72 h-fit rounded-lg shadow-lg transform transition-transform ${open ? 'scale-100' : 'scale-0'}`}>
                <div className="flex justify-between bg-black p-2 px-4 rounded-t-lg">
                    <p className="text-white font-bold">Message</p>
                    <button className="text-white text-xl" onClick={closeMessage}>
                        &times;
                    </button>
                </div>
                {/* Chat content */}
                <section className='px-4 py-4 text-gray-800'>
                    {/* messages */}
                    <div className='rounded w-full h-[280px] mb-2 overflow-y-scroll'>
                        {conversations.map((conversation, index) => (
                            <div key={index}>
                                <p></p>
                                <p className={`bg-blue-600 my-1 p-1 w-fit rounded text-white ${conversations.length - 1 === index ? 'focus' : ''}`}>{conversation.message}</p>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={sendMessage}>
                        <div className='flex justify-center w-full'>
                            <input value={message} onChange={(e) => setMessage(e.target.value)} className='w-[90%] px-2 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500' type="text" />
                            <button className='ml-2 w-[10%]'>
                                <SendOutlinedIcon />
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default StickyMessageIcon
