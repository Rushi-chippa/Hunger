import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../Redux/Slice/UsersSlice';

function Volunteer() {
    const dispatch = useDispatch();
    const { allUser } = useSelector(state => state?.user);

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>🙋 Volunteer List</h2>
            <div style={cardGridStyle}>
                {allUser && allUser.length > 0 ? (
                    allUser
                        .filter(user => user.user_role === "volunteer")
                        .map((user, index) => (
                            <div key={index} style={cardStyle}>
                                <h3 style={nameStyle}>👤 {user?.firstName}</h3>
                                <p style={infoStyle}>📍 Location: {user?.location}</p>
                                <p style={infoStyle}>📞 Phone: {user?.number}</p>
                                <p style={emailStyle}>
                                    ✉️ Email: {typeof user?.email === 'string' ? user.email.toLowerCase() : ''}
                                </p>
                            </div>
                        ))
                ) : (
                    <p style={{ textAlign: "center", width: "100%" }}>No food donors found.</p>
                )}
            </div>
        </div>
    );
}

export default Volunteer;

// Styles
const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: 'auto'
};

const titleStyle = {
    textAlign: 'center',
    marginBottom: '30px'
};

const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
};

const cardStyle = {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9'
};

const nameStyle = {
    marginBottom: '10px',
    color: '#333',
    textTransform: 'capitalize'
};

const infoStyle = {
    margin: '4px 0',
    color: '#555'
};

// Ensures email is on one line, and truncates if too long
const emailStyle = {
    margin: '4px 0',
    color: '#555',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
};
