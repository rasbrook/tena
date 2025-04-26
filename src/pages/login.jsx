import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [session, setSession] = useState(null);

    useEffect(() => {
        // Load session when component mounts
        const loadSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
        };
        loadSession();
    }, []);

    const handleSignIn = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            if (data.session) {
                // Store the session
                const sessionData = {
                    user: data.session.user,
                    token: data.session.access_token,
                    expires_at: data.session.expires_at,
                };
                localStorage.setItem('session', JSON.stringify(sessionData));
                setSession(sessionData);
                setMessage('Successfully signed in!');
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Add this to handle session changes
    const initAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            setSession({
                user: session.user,
                token: session.access_token,
                expires_at: session.expires_at,
            });
        }
    };

    // Check for session on app load
    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            const sessionData = JSON.parse(session);
            supabase.auth.setSession(sessionData.token);
            setSession(sessionData);
        }
    }, []);

    // Add auth state listener
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                const sessionData = {
                    user: session.user,
                    token: session.access_token,
                    expires_at: session.expires_at,
                };
                localStorage.setItem('session', JSON.stringify(sessionData));
                setSession(sessionData);
            } else {
                localStorage.removeItem('session');
                setSession(null);
            }
        });

        return () => subscription?.unsubscribe();
    }, []);

    // Add logout functionality
    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw error;
            }
            localStorage.removeItem('session');
            setSession(null);
            window.location.href = '/'; // Redirect to home page
        } catch (error) {
            console.error(error);
        }
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
            padding: '20px',
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
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        buttonDisabled: {
            backgroundColor: '#a0a0a0',
            cursor: 'not-allowed',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Login</h2>
            {message && <p style={styles.message}>{message}</p>}
            {!session ? (
                <form onSubmit={handleSignIn} style={styles.form}>
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
                    <button
                        type="submit"
                        disabled={loading}
                        style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <p>Welcome, {session.user.email}</p>
                    <button
                        onClick={handleLogout}
                        style={styles.button}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default Login;
