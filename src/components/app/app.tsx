import { authWithGoogle } from "../../lib/login";
import { Box, Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Router from '../../pages/router';
import { useState } from 'react';
import { userSubject } from '../../lib/session';
import { skip } from 'rxjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';

function App() {
    const navigate = useNavigate();
    const [user, setUser] = useState(userSubject.value);
    userSubject.pipe(skip(1)).subscribe((v) => setUser(v));

    return (
        <Box>
            <Fab size="small" color="primary" sx={{position:'sticky', m: 1}} variant="extended" id="home"  onClick={() => navigate("/")}><FontAwesomeIcon icon={faHome} /></Fab>
            {
                user ? <Fab size="small" color="primary" sx={{position:'sticky', m: 1, left: '100%'}} variant="extended"  id="profile" onClick={() => navigate("/profile")}>{user?.displayName || 'Anonymous'}<FontAwesomeIcon style={{marginLeft: '5px'}} icon={faUser} /></Fab>
                    : <Fab size="small" color="primary" sx={{position:'sticky', m: 1, left: '100%'}} variant="extended"  id="access" onClick={() => access()}><FontAwesomeIcon icon={faUser} /></Fab>
            }
            <Router></Router>
        </Box>
    );

    async function access() {
        await authWithGoogle();
    }
}

export default App;
