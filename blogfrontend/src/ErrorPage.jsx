import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {


    return (
        <div className='flex flex-col justify-center items-center h-[90vh]'>
            <h1 className='text-4xl mb-4'>404 Page Not Found</h1>
            <Link
                to="/login"
                className="mt-4 bg-white border hover:bg-blue-700 hover:text-white text-black px-5 py-2 rounded-lg"
            >
                Go to Login
            </Link>
        </div>
    );
}

export default ErrorPage;
