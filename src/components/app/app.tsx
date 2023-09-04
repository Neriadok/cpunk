import { authWithGoogle } from "../../lib/login";
import { Avatar, Box, Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Router from '../../pages/router';
import { useState } from 'react';
import { userSubject } from '../../lib/session';
import { skip } from 'rxjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from "@firebase/auth";
import { loadCharacters } from "../../lib/db";

function App() {
    const navigate = useNavigate();
    const [user, setUser] = useState(userSubject.value);
    userSubject.pipe(skip(1)).subscribe((u) => loadUser(u));

    return (
        <Box>
            <Fab size="small" color="secondary" sx={{position:'sticky', top: 10, m: 1}} variant="extended" id="home"  onClick={() => navigate("/")}><FontAwesomeIcon icon={faHome} /></Fab>
            <Fab size="small" color="secondary" sx={{position:'sticky', top: 10, m: 1, left: '100%'}} variant="extended"  id="profile" onClick={() => clickProfile()}>
                {(user?.displayName)}
                {getIcon()}
            </Fab>
            <Router></Router>
        </Box>
    );

    async function access() {
        await authWithGoogle();
    }

    async function loadUser(u: User | null){
        await loadCharacters();
        setUser(u);
    }

    function getIcon(){
        return user?.photoURL ? <Avatar sx={{height: 34, width: 34, mr: -1, ml: 1}} alt={user?.displayName ||""} id="profile" src={user.photoURL}/>
        : <FontAwesomeIcon icon={faUser} />
    }

    function clickProfile(){
        if (user){
            navigate("/profile");
        } else {
            access();
        }
    }
}

export default App;
