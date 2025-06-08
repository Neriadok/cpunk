import { Route, Routes } from 'react-router-dom';
import Profile from './profile/profile';
import Home from './home/home';
import NewCharacter from './new-character/new-character';
import CharacterSheet from './character-sheet/character-sheet';

function Router() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="new-character" element={<NewCharacter />} />
      <Route path="character/:uid" element={<CharacterSheet />} />
    </Routes>
  );
}

export default Router;
