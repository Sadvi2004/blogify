import React, { useState } from 'react';
import { BASE_URI } from '../config';
export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(ev) {
        ev.preventDefault();
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
    }

    return (
        <div className="flex justify-center items-center h-[90vh]">
            <form
                onSubmit={register}
                className="w-96 p-6 rounded-lg border-2"
            >
                <h1 className="text-2xl font-bold text-third text-center mb-4">Register</h1>

                <input
                    type="text"
                    className="w-full p-2 border-2 border-fourth rounded-md mb-3"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full p-2 border-2 border-fourth rounded-md mb-4"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className='w-full py-2 border-2 rounded-md cursor-pointer'>Register</button>
            </form>
        </div>
    );
}