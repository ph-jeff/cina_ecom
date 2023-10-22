import React, { useEffect, useState } from 'react';
import api from '../../services/apiRequest';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../../components/ActionButton';
import { toast } from 'react-hot-toast';
import ChangePassword from './components/ChangePassword';
import Loading from '../../components/Loading';

const SettingPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [userdetails, setUserDetails] = useState({});
    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setLoading] = useState(false);

    function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        api
            .put('/api/user/account', {
                firstname,
                middlename,
                lastname,
                contact,
                address,
            })
            .then(({ data }) => {
                console.log(data);
                setLoading(false);
                toast.success('Updated successfully');
            })
            .catch(({ response }) => {
                console.log(response);
                setLoading(false);
                toast.error(response.data.error);
            });
    }

    function fetchUser() {
        setLoading(true);
        api.get('/api/user/account')
            .then((response) => {
                setUserDetails(response.data.userdetails);
                setUser(response.data.userdetails.user_id);
                setFirstname(response.data.userdetails.firstname);
                setMiddlename(response.data.userdetails.middlename);
                setLastname(response.data.userdetails.lastname);
                setContact(response.data.userdetails.contact);
                setAddress(response.data.userdetails.address);
                console.log(response)
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                navigate('/login');
            });
    }

    useEffect(() => {
        fetchUser();
    }, [setUser]);

    return (
        <>
            {isLoading && <Loading />}
            <div className="container mx-auto p-4">
                <h1 className="font-medium text-2xl mb-4">My Profile</h1>
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 md:pr-4 mb-4">
                        <div className="bg-white shadow-md p-4 rounded-md">
                            <div className="mb-4">
                                <p className="text-xl">Personal Information</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="mt-2 mb-2">
                                        <label htmlFor="firstname" className="block mb-2">
                                            Firstname
                                        </label>
                                        <input
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                            id="firstname"
                                            type="text"
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="middlename" className="block mb-2">
                                            Middlename
                                        </label>
                                        <input
                                            value={middlename}
                                            onChange={(e) => setMiddlename(e.target.value)}
                                            id="middlename"
                                            type="text"
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="lastname" className="block mb-2">
                                            Lastname
                                        </label>
                                        <input
                                            value={lastname}
                                            onChange={(e) => setLastname(e.target.value)}
                                            id="lastname"
                                            type="text"
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                    <ActionButton actionName={'Save'} />
                                </form>
                            </div>
                        </div>
                    </div>
                    <ChangePassword />
                </div>
            </div>
        </>
    );
};

export default SettingPage;
