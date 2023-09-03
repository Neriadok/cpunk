import { Route, Routes } from 'react-router-dom';
import Profile from './profile/profile';
import Home from './home/home';
import NewCharacter from './new-character/new-character';

function Router() {
    return (
        <Routes >
            <Route path="" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="new-character" element={<NewCharacter />} />
        </Routes>
    );
}

export default Router;
