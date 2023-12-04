import React, { useEffect, useState } from 'react';
import api from '../../services/apiRequest';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../../components/ActionButton';
import { toast } from 'react-hot-toast';
import ChangePassword from './components/ChangePassword';
import Loading from '../../components/Loading';
import provincesData from '../../utils/provinceData.json';

const SettingPage = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const [user, setUser] = useState({});
    const [userdetails, setUserDetails] = useState({});

    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const [contact, setContact] = useState('');

    const [province, setProvince] = useState("");
    const [municipal, setMunicipal] = useState("");
    const [barangay, setBarangay] = useState("");

    // for address
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedMunicipality, setSelectedMunicipality] = useState('');
    const [selectedBarangay, setSelectedBarangay] = useState('');

    const [municipals, setMunicipals] = useState({});
    const [barangays, setBarangays] = useState({});

    const handleProvinceChange = (event) => {
        const selectedProvince = event.target.value;
        setProvince(selectedProvince)
        setSelectedProvince(selectedProvince);
        // reset city and barangay
        setSelectedMunicipality('');
        setSelectedBarangay('');

        const province = provincesData.provinces.find(province => province.name === selectedProvince);
        setMunicipals(province)
    };

    const handleMunicipalChange = (event) => {
        const selectedMunicipality = event.target.value;
        setMunicipal(selectedMunicipality)
        setSelectedMunicipality(selectedMunicipality);
        // reset barangay
        setSelectedBarangay('');

        const municipal = municipals.municipalities.find(municipal => municipal.name === selectedMunicipality);
        setBarangays(municipal)
    };

    const handleBarangayChange = (event) => {
        const selectedBarangay = event.target.value;
        setBarangay(selectedBarangay)
        setSelectedBarangay(selectedBarangay);
    };

    function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        api
            .put('/api/user/account', {
                firstname,
                middlename,
                lastname,
                contact,
                // address,
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
            // console.log(response)
            setUserDetails(response.data.userdetails);
            setUser(response.data.userdetails.user_id);
            setFirstname(response.data.userdetails.firstname);
            setMiddlename(response.data.userdetails.middlename);
            setLastname(response.data.userdetails.lastname);
            setContact(response.data.userdetails.contact);

            setProvince(response.data.userdetails.province || '')
            setMunicipal(response.data.userdetails.municipal || '')
            setBarangay(response.data.userdetails.barangay || '')

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

                                    <div className='mb-2'>
                                        <label htmlFor="province">Province</label>
                                        <select className='w-full p-2 border rounded-md' onChange={handleProvinceChange} value={selectedProvince}>
                                            <option value="">Select Province</option>
                                            {provincesData.provinces.map((province, index) => (
                                                <option key={index} value={province.name}>
                                                    {province.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className='mb-2'>
                                        <label htmlFor="province">Municipal</label>
                                        <select className='w-full p-2 border rounded-md' onChange={handleMunicipalChange} value={selectedMunicipality}>
                                            <option value="">Select Municipal</option>
                                            {selectedProvince && municipals.municipalities.map((city, index) => (
                                                <option key={index} value={city.name}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className='mb-2'>
                                        <label htmlFor="province">Barangay</label>
                                        <select className='w-full p-2 border rounded-md' onChange={handleBarangayChange} value={selectedBarangay}>
                                            <option value="">Select Barangay</option>
                                            {selectedMunicipality && barangays.barangays.map((barangay, index) => (
                                                <option key={index} value={barangay}>
                                                    {barangay}
                                                </option>
                                            ))}
                                        </select>
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
