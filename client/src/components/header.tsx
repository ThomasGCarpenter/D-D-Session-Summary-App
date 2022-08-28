import { Link, useLocation } from "react-router-dom";
import './header.css';

// function Header(){
//   const location = useLocation();
//     return (
//         <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex">
//           <div className="container">
//             <Link className="navbar-brand" to="/">The Lore of Yore</Link>
//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarNav">
//               <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//                  <li className="nav-item active">
//                   <Link className="nav-link" to="/campaigns">Campaigns</Link>
//                 </li>
//                 <li className="nav-item active">
//                   <Link className="nav-link" to="/signin">Sign In</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/signup">Sign Up</Link>
//                 </li>
//                 <div className= "col d flex align-items-center">
//                 <li className="navbar-brand h1">
//                 {location.pathname === "/campaigns" ? 
//                 <span>Evil Campaign</span> : null}
//                 </li>
//                 </div>
//               </ul>
//             </div>
//           </div>
//         </nav>
//     )
// }

// export default Header;

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {
  const location = useLocation();
  return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
              <Link className="navbar-brand" to="/">
                The Lore of Yore
                <Navbar.Text className="campaign-page">
                {location.pathname === "/campaigns" ? <span> : Campaign Page</span> : null}
                  </Navbar.Text>
              </Link>
          </Navbar.Brand>

          {/* <Nav className="mx-auto">
            <Navbar.Text>
            {location.pathname === "/campaigns" ? 
                <span>Evil Campaign</span> : null}
              </Navbar.Text>
            </Nav> */}
            
          <Nav className="ms-auto mb-2 mb-lg-0">
            <Nav.Link>
              <Link className="nav-link" to="/campaigns">Campaigns</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-link" to="/login">Log In</Link>
            </Nav.Link>
            <Nav.Link href="#pricing">
            <Link className="nav-link" to="/signup">Sign Up</Link>
              </Nav.Link>
          </Nav>
          
        </Container>
      </Navbar>

   
  );
}

export default ColorSchemesExample;