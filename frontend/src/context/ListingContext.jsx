import { createContext, useState, useContext, useEffect } from "react"
import { authDataContext } from './AuthContext';
import { useNavigate } from "react-router-dom";
export const ListingDataContext = createContext();
const ListingContext = ({ children }) => {
    let navigate = useNavigate();
    const { serverUrl } = useContext(authDataContext);
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [frontEndImage1, setFrontEndImage1] = useState(null);
    let [frontEndImage2, setFrontEndImage2] = useState(null);
    let [frontEndImage3, setFrontEndImage3] = useState(null);
    let [backEndImage1, setBackEndImage1] = useState(null);
    let [backEndImage2, setBackEndImage2] = useState(null);
    let [backEndImage3, setBackEndImage3] = useState(null);
    let [rent, setRent] = useState("");
    let [city, setCity] = useState("");
    let [landmark, setLandmark] = useState("");
    let [category, setCategory] = useState("");
    let [adding, setAdding] = useState(false);
    let [updating, setUpdating] = useState(false);
    let [deleting, setDeleting] = useState(false);
    let [listingData, setListingData] = useState([]);
    let [filteredData, setFilteredData] = useState([]);
    let [cardDetails, setCardDetails] = useState(null);

    const handleAddListing = async () => {
        console.log("clicked")
        setAdding(true)
        try {
            let formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image1", backEndImage1);
            formData.append("image2", backEndImage2);
            formData.append("image3", backEndImage3);
            formData.append("rent", rent);
            formData.append("city", city);
            formData.append("landmark", landmark);
            formData.append("category", category);
            const result = await fetch(`${serverUrl}/api/listing/add`, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": localStorage.getItem("token")
                },
                credentials: "include"
            })
            console.log(result.status);
            console.log(result.ok);
            const data = await result.json();
            console.log(data);
            navigate("/");
            setBackEndImage1(null);
            setBackEndImage2(null);
            setBackEndImage3(null);
            setTitle("");
            setDescription("");
            setRent("");
            setCity("");
            setLandmark("");
            setCategory("");

        } catch (error) {
            console.log(error);
        }
        setAdding(false);
    }

    const handleViewCard = async (id) => {
        try {
            let result = await fetch(`${serverUrl}/api/listing/findlistingbyid/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": localStorage.getItem("token")
                },
                credentials: "include"
            })
            let data = await result.json();
            console.log(data);
            setCardDetails(data.listing);
            navigate("/viewcard");
        } catch (error) {
            console.log(error);
        }
    }
    const getListing = async () => {
        try {
            let result = await fetch(`${serverUrl}/api/listing/get`, {
                method: "GET",
                headers: {
                    "Authorization": localStorage.getItem("token")
                },
                credentials: "include"
            })
            let data = await result.json();
            console.log(data);
            setListingData(data.listing);
            setFilteredData(data.listing);
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdateListing = async () => {
        console.log("clicked")
        setUpdating(true);
        try {

            let formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image1", backEndImage1);
            formData.append("image2", backEndImage2);
            formData.append("image3", backEndImage3);
            formData.append("rent", rent);
            formData.append("city", city);
            formData.append("landmark", landmark);
            // formData.append("category", category);
            const result = await fetch(`${serverUrl}/api/listing/update/${cardDetails._id}`, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": localStorage.getItem("token")
                },
                credentials: "include"
            })
            console.log(result.status);
            console.log(result.ok);
            const data = await result.json();
            console.log(data);
            navigate("/");
            setBackEndImage1(null);
            setBackEndImage2(null);
            setBackEndImage3(null);
            setTitle("");
            setDescription("");
            setRent("");
            setCity("");
            setLandmark("");
            // setCategory("");

        } catch (error) {
            console.log(error);
        }
        setUpdating(false);
    }
    const handleDeleteListing = async () => {
        console.log("clicked")
        setDeleting(true);
        try {

            const result = await fetch(`${serverUrl}/api/listing/delete/${cardDetails._id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": localStorage.getItem("token")
                },
                credentials: "include"
            })
            console.log(result.status);
            console.log(result.ok);
            const data = await result.json();
            console.log(data);
            navigate("/");
            setBackEndImage1(null);
            setBackEndImage2(null);
            setBackEndImage3(null);
            setTitle("");
            setDescription("");
            setRent("");
            setCity("");
            setLandmark("");
            setCategory("");

        } catch (error) {
            console.log(error);
        }
        setDeleting(false);
    }
    useEffect(() => {
        getListing();
    }, [adding, updating, deleting]);
    let value = {
        title,
        setTitle,
        description,
        setDescription,
        frontEndImage1,
        setFrontEndImage1,
        frontEndImage2,
        setFrontEndImage2,
        frontEndImage3,
        setFrontEndImage3,
        backEndImage1,
        setBackEndImage1,
        backEndImage2,
        setBackEndImage2,
        backEndImage3,
        setBackEndImage3,
        rent,
        setRent,
        city,
        setCity,
        landmark,
        setLandmark,
        category,
        setCategory,
        handleAddListing,
        adding,
        setAdding,
        setListingData,
        listingData,
        getListing,
        filteredData,
        setFilteredData,
        handleViewCard,
        cardDetails,
        setCardDetails,
        updating,
        setUpdating,
        handleUpdateListing,
        deleting,
        setDeleting,
        handleDeleteListing

    }
    return (
        <div>
            <ListingDataContext.Provider value={value}>
                {children}
            </ListingDataContext.Provider>
        </div>
    )
}

export default ListingContext