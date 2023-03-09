import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

function LandingPage() {

    return (
        <>
        
            <Link as={Link} to='/login' id="MainLogin_Button" className="flex-centered btn mainhome-btn">
                Login
            </Link>
        </>


    );
}

export default LandingPage;
