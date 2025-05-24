import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase"; // Import your Supabase client

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const session = localStorage.getItem('session');
                if (session) {
                    const sessionData = JSON.parse(session);
                    supabase.auth.setSession(sessionData.token);
                    setUser(sessionData.user);
                }
            } catch (err) {
                setError("Failed to fetch user data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                setError("Error logging out: " + error.message);
            } else {
                localStorage.removeItem('session');
                window.location.href = "/"; // Redirect to home after logout
            }
        } catch (err) {
            setError("Failed to log out.");
            console.error(err);
        }
    };

    if (loading) {
        return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ border: '4px solid rgba(0, 0, 0, 0.1)', borderLeftColor: '#09f', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ marginLeft: '10px' }}>Loading...</p>
        </div>
        );
    }

    if (error) {
        return (
            <div style={{ color: 'red', textAlign: 'center', marginTop: '100px' }}>
                <p>{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div style={{ maxWidth: '600px', margin: '100px auto', padding: '20px', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <p>No user is logged in.</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '600px', margin: '100px auto', padding: '20px', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h1>Profile</h1>
            <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '10px 0', fontSize: '16px' }}><strong>Email:</strong> {user.email}</p>

                {user.user_metadata && (
                    <>
                        <p style={{ margin: '10px 0', fontSize: '16px' }}><strong>Name:</strong> {user.user_metadata.full_name}</p>
                    </>
                )}
            </div>
            <button style={{ padding: '10px 20px', backgroundColor: '#ff4b4b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }} onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
