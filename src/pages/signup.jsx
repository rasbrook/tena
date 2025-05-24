import React, { useState } from 'react';
import { supabase } from '../../supabase';
import { Link } from 'react-router-dom';


function SignUp() {
    const [email, setEmail] = useState('');
    const [createprofile, setcreateprofile] = useState(false)
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');


    const handleSignUp = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });
        console.log(user)
        console.log(error)

        if (error) {
            setMessage(error.message);
        } else {
            setcreateprofile(true)
            setMessage('Check your email for the confirmation link!');
        }

        setLoading(false);
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f0f0f0',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            marginBottom: '20px',
        },
        message: {
            color: 'red',
            marginBottom: '20px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            padding: '30px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
        button: {
            alignSelf: 'center',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            textAlign: 'center',
        },
        buttonDisabled: {
            backgroundColor: '#a0a0a0',
            cursor: 'not-allowed',
        },
    };
    if (createprofile) {
        return <div>
                
        </div>

    }

    return (<div style={styles.container}>
        <h2 style={styles.title}>Sign Up</h2>
        {message && <p style={styles.message}>{message}</p>}
        <form onSubmit={handleSignUp} style={styles.form}>
            <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    style={styles.input}
                />
            </div>
            <div style={styles.formGroup}>
                <label htmlFor="password" style={styles.label}>Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    style={styles.input}
                />
            </div>
            <button type="submit" disabled={loading} style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}>
                {loading ? 'Loading...' : 'Register To Tenapedia'}
            </button>
        </form>
        <div style={{ display: "flex", flexWrap: "wrap", alignSelf: 'center', alignContent: 'center', alignItems: 'center', gap: 15 }}>
            <p>Have An Account</p>
            <Link to={'/login'} style={{ color: 'blue' }}> Log in</Link>
        </div>

    </div>
    );
}

export default SignUp;