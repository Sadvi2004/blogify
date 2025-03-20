import React, { useState } from 'react';
import { BASE_URI } from '../config';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function register(ev) {
        ev.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URI}/api/auth/register`, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                alert('Registration successful');
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            alert('An error occurred', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center h-[90vh]">
            <form onSubmit={register} className="w-96 p-6 rounded-lg border-2">
                <h1 className="text-2xl font-bold text-third text-center mb-4">Register</h1>

                <input
                    type="text"
                    className="w-full p-2 border-2 border-fourth rounded-md mb-3"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    className="w-full p-2 border-2 border-fourth rounded-md mb-4"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className='w-full py-2 border-2 rounded-md cursor-pointer flex justify-center items-center'
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                            <span className="text-black">Pls wait..</span>
                        </div>
                    ) : (
                        "Register"
                    )}
                </button>
            </form>
        </div>
    );
}
