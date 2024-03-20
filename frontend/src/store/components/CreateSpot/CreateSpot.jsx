import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './CreateSpot.css';

const CreateSpot = ({ spot, buttonName }) => {
    const [country, setCountry] = useState(spot?.country || '');
    const [address, setAddress] = useState(spot?.address || '');
    const [city, setCity] = useState(spot?.city || '');
    const [state, setState] = useState(spot?.state || '');
    const [lat, setLat] = useState(spot?.lat || '');
    const [lng, setLng] = useState(spot?.lng || '');
    const [description, setDescription] = useState(spot?.description || '');
    const [name, setName] = useState(spot?.name || '');
    const [price, setPrice] = useState(spot?.price || '');
    const [previewImage, setPreviewImage] = useState(spot?.previewImage || '');
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');

    const [errors, setErrors] = useState({});
    const nav = useNavigate();
    const { spotId } = useParams();

    useEffect(() => {
        if (spot?.SpotImages) {
            const urls = spot.SpotImages.map(image => image.url);
            setImg1(urls[0] || '');
            setImg2(urls[1] || '');
            setImg3(urls[2] || '');
            setImg4(urls[3] || '');
        }
    }, [spot]);

    const validateInputs = () => {
        const errors = {};

        if (!country.trim()) {
            errors.country = 'Country is required';
        }

        if (!address.trim()) {
            errors.address = 'Address is required';
        }

        if (!city.trim()) {
            errors.city = 'City is required';
        }

        if (!state.trim()) {
            errors.state = 'State is required';
        }

        if (lat < -90 || lat > 90) {
            errors.lat = 'Latitude must be within -90 and 90';
        }

        if (lng < -180 || lng > 180) {
            errors.lng = 'Longitude must be within -180 and 180';
        }

        if (description.length < 30) {
            errors.description = 'Description needs a minimum of 30 characters';
        }

        if (!name.trim()) {
            errors.name = 'Name is required';
        }

        if (!price.trim()) {
            errors.price = 'Price is required';
        } else if (parseFloat(price) < 0) {
            errors.price = 'Price must be positive';
        }

        if (!previewImage.trim()) {
            errors.previewImage = 'Preview image is required';
        } else if (!(previewImage.endsWith('.png') || previewImage.endsWith('.jpg') || previewImage.endsWith('.jpeg'))) {
            errors.previewImage = 'Preview image must end in .png, .jpg, or .jpeg';
        }

        [img1, img2, img3, img4].forEach((img, index) => {
            if (img && !(img.endsWith('.png') || img.endsWith('.jpg') || img.endsWith('.jpeg'))) {
                errors[`img${index + 1}`] = 'Image URL must end in .png, .jpg, or .jpeg';
            }
        });

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;
    };

    return (
        <form className='spot-form' onSubmit={onSubmit}>
            <label>
                Country
                <input
                    type='text'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                {errors.country && <span className='val'>{errors.country}</span>}
            </label>

            <label>
                Street Address
                <input
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && <span className='val'>{errors.address}</span>}
            </label>

            <div>
                <label>
                    City
                    <input
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    {errors.city && <span className='val'>{errors.city}</span>}
                </label>
                <label>
                    State
                    <input
                        type='text'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    {errors.state && <span className='val'>{errors.state}</span>}
                </label>
            </div>
            <button type='submit'>{buttonName}</button>
        </form>
    );
};

export default CreateSpot;
