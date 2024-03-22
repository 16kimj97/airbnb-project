import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUpdateSpot } from "../../spots";
import { fetchSpotById } from "../../spots";

const UpdateSpotForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.spot);

    const [formData, setFormData] = useState({
      country: "",
      address: "",
      city: "",
      state: "",
      lat: "",
      lng: "",
      description: "",
      name: "",
      price: "",
      previewImage: "",
      image2: "",
      image3: "",
      image4: "",
      image5: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (spotId) {
            dispatch(fetchSpotById(spotId));
        }
    }, [dispatch, spotId]);


    useEffect(() => {
        if (spot) {
            setFormData({
                country: spot.country || '',
                address: spot.address || '',
                city: spot.city || '',
                state: spot.state || '',
                lat: spot.lat ? spot.lat.toString() : '',
                lng: spot.lng ? spot.lng.toString() : '',
                description: spot.description || '',
                name: spot.name || '',
                price: spot.price ? spot.price.toString() : '',
                previewImage: spot.SpotImages[0].url || '',
                image2: spot.SpotImages && spot.SpotImages.length > 1 ? spot.SpotImages[1].url : '',
                image3: spot.SpotImages && spot.SpotImages.length > 2 ? spot.SpotImages[2].url : '',
                image4: spot.SpotImages && spot.SpotImages.length > 3 ? spot.SpotImages[3].url : '',
                image5: spot.SpotImages && spot.SpotImages.length > 4 ? spot.SpotImages[4].url : '',
            });
        }
    }, [spot]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateInputs = () => {
        const errors = {};

        if (!formData.country) errors.country = "Country is required";
        if (!formData.address) errors.address = "Address is required";
        if (!formData.city) errors.city = "City is required";
        if (!formData.state) errors.state = "State is required";
        if (!formData.lat) errors.lat = "Latitude is required";
        else if (
          isNaN(formData.lat) ||
          parseFloat(formData.lat) < -90 ||
          parseFloat(formData.lat) > 90
        )
          errors.lat =
            "Latitude must be a valid number between -90 and 90";
        if (!formData.lng) errors.lng = "Longitude is required";
        else if (
          isNaN(formData.lng) ||
          parseFloat(formData.lng) < -180 ||
          parseFloat(formData.lng) > 180
        )
          errors.lng =
            "Longitude must be a valid number between -180 and 180";
        if (!formData.description) errors.description = "Description is required";
        if (!formData.name) errors.name = "Name is required";
        if (!formData.price) errors.price = "Price is required";
        if (!formData.previewImage)
          errors.previewImage = "Preview Image URL is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateInputs()) {
            try {
                await dispatch(fetchUpdateSpot({ ...formData, id: spotId }));
                navigate(`/spots/${spotId}`);
            } catch (error) {
                console.error("Error updating spot", error);
            }
        }
    };


    return (
        <div className="create-spot">
          <h2>Update a spot</h2>
          <form className="create-spot-form" onSubmit={handleSubmit}>
            <div className="section">
              <h3>Where&apos;s your place located?</h3>
              <p>Guests will only get your exact address once they booked a reservation.</p>
              <label htmlFor="country">Country:</label>
              <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} />
              {errors.country && <p className="error-message">{errors.country}</p>}
              <label htmlFor="address">Street Address:</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
              {errors.address && <p className="error-message">{errors.address}</p>}
              <label htmlFor="city">City:</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
              {errors.city && <p className="error-message">{errors.city}</p>}
              <label htmlFor="state">State:</label>
              <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} />
              {errors.state && <p className="error-message">{errors.state}</p>}
              <label htmlFor="lat">Latitude:</label>
              <input type="text" id="lat" name="lat" value={formData.lat} onChange={handleChange} />
              {errors.lat && <p className="error-message">{errors.lat}</p>}
              <label htmlFor="lng">Longitude:</label>
              <input type="text" id="lng" name="lng" value={formData.lng} onChange={handleChange} />
              {errors.lng && <p className="error-message">{errors.lng}</p>}
            </div>

            <div className="section">
              <h3>Describe your place to guests</h3>
              <p>Mention the best features of your space, any special amenities like fast WiFi or parking, and what you love about the neighborhood.</p>
              <div className="create-form">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Please write at least 30 characters"
                ></textarea>
                {errors.description && <p className="error-message">{errors.description}</p>}
              </div>
            </div>

            <div className="section">
              <h3>Create a title for your spot</h3>
              <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
              <div className="create-form">
                <label htmlFor="name">Spot Title:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name of your spot"
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>
            </div>

            <div className="section">
              <h3>Set a base price for your spot</h3>
              <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
              <div className="create-form">
                <label htmlFor="price">Price per night (USD):</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price per night (USD)"
                />
                {errors.price && <p className="error-message">{errors.price}</p>}
              </div>
            </div>

            <div className="section">
              <h3>Liven up your spot with photos</h3>
              <p>Submit a link to at least one photo to publish your spot.</p>
              <input
                type="text"
                id="previewImage"
                name="previewImage"
                value={formData.previewImage}
                onChange={handleChange}
                placeholder="Preview Image URL"
              />
              {errors.previewImage && <p className="error-message">{errors.previewImage}</p>}
              <input
                type="text"
                id="image2"
                name="image2"
                value={formData.image2}
                onChange={handleChange}
                placeholder="Image URL"
              />
              <input
                type="text"
                id="image3"
                name="image3"
                value={formData.image3}
                onChange={handleChange}
                placeholder="Image URL"
              />
              <input
                type="text"
                id="image4"
                name="image4"
                value={formData.image4}
                onChange={handleChange}
                placeholder="Image URL"
              />
              <input
                type="text"
                id="image5"
                name="image5"
                value={formData.image5}
                onChange={handleChange}
                placeholder="Image URL"
              />
            </div>

            <button type="submit">Update Spot</button>
          </form>
        </div>
      );
};

export default UpdateSpotForm;
