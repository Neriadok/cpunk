import logo from '../../logo.png';
import './home.css';
import { Container } from '@mui/material';

function Home() {
    return (
        <Container style={{textAlign: 'center'}}>
            <img src={logo} className="logo" alt="logo" />
        </Container>
    );
}

export default Home;
