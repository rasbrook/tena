import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase"; // Import your Supabase client

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log('hello')

    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            const sessionData = JSON.parse(session);
            supabase.auth.setSession(sessionData.token);
            setUser(sessionData.user.user_metadata);
        }
    }, []);
    console.log(user)


    const handleLogout = async () => {
        // Handle logout
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error logging out:", error.message);
        } else {
            window.location.href = "/"; // Redirect to home after logout
        }
    };

    // Loading state
    if (loading) {
        return <p>Loading profile...</p>;
    }

    // If no user is logged in

    console.log(user)
    // Display user info once logged in
    return <div>

        <button onClick={handleLogout}>Logout</button>
    </div>
        ;
};

export default Profile;
