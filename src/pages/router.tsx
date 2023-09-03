import { Route, Routes } from 'react-router-dom';
import Profile from './profile/profile';
import Home from './home/home';

function Router() {
    return (
        <Routes >
            <Route path="" element={<Home />} />
            <Route path="profile" element={<Profile />} />
        </Routes>
    );
}

export default Router;
