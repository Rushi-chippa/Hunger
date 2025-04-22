import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../Redux/Slice/UsersSlice';

function FoodDonorPage() {
    const dispatch = useDispatch();
    const { allUser } = useSelector(state => state?.user);

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>🍽️ Food Donor Network</h1>
            <p style={descriptionStyle}>
                Below is a list of kind-hearted individuals helping to reduce food waste and support those in need.
            </p>
            <div style={cardGridStyle}>
                {allUser && allUser.length > 0 ? (
                    allUser
                        .filter(user => user.user_role === "foodDonor")
                        .map((user, index) => (
                            <div key={index} style={cardStyle}>
                                <h3 style={nameStyle}>👤 {user?.firstName}</h3>
                                <p style={infoStyle}>📍 Location: {user?.location}</p>
                                <p style={infoStyle}>📞 Phone: {user?.number}</p>
                                {/* <p style={infoStyle}>🎯 Role: {user?.user_role}</p> */}
                            </div>
                        ))
                ) : (
                    <p style={{ textAlign: "center", width: "100%" }}>No food donors found.</p>
                )}
            </div>
        </div>
    );
}
export default FoodDonorPage;

// Styles
const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: 'auto',
    textAlign: 'center'
};

const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px'
};

const descriptionStyle = {
    fontSize: '1rem',
    marginBottom: '30px',
    color: '#777'
};

const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
};

const cardStyle = {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    borderLeft: '5px solid #ff8c00'
};

const nameStyle = {
    marginBottom: '10px',
    color: '#333',
    textTransform: 'capitalize',
    fontSize: '1.5rem'
};

const infoStyle = {
    margin: '6px 0',
    color: '#555',
    fontSize: '1rem'
};