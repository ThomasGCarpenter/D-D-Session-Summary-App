import { Link, useLocation } from "react-router-dom";
import './header.css';

function Header(){

  let userObj= JSON.parse(localStorage.getItem('user')|| '{}')


    return (
        <nav className="navbar navbar-expand-lg  d-flex">
          <div className="icon"></div>
          <div className="container">
            <Link className="navbar-brand" to="/">
              <h3>The Lore of Yore</h3>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="navbar-text">
              
                </li>
                 <li className="nav-item">
                  <Link className="nav-link" to="/campaigns">
                    <h4>Campaigns</h4>
                  </Link>
                </li>
                <li className="nav-item">
                  
                  <Link className="nav-link" to="/login"><h4>{userObj ? (<div>{userObj.username}</div>): <span>Login</span>}</h4></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">{userObj ? null: <span>Signin</span>}</Link>
                </li>
                {/* <div className= "col d flex align-items-center">
                <li className="navbar-brand h1">
                {location.pathname === "/campaigns" ? 
                <span>Evil Campaign</span> : null}
                </li>
                </div> */}
              </ul>
            </div>
          </div>
        </nav>
    )
}

export default Header;

// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';




// function ColorSchemesExample() {
//   const location = useLocation();
//   return (
//       <Navbar bg="dark" variant="dark">
//         <Container>
//           <Navbar.Brand>
//               <Link className="navbar-brand" to="/">
//                 The Lore of Yore
//                 <Navbar.Text className="campaign-page">
//                 {location.pathname === "/campaigns" ? <span> : Campaign Page</span> : null}
//                   </Navbar.Text>
//               </Link>
//           </Navbar.Brand>

//           {/* <Nav className="mx-auto">
//             <Navbar.Text>
//             {location.pathname === "/campaigns" ? 
//                 <span>Evil Campaign</span> : null}
//               </Navbar.Text>
//             </Nav> */}
            
//           <Nav className="ms-auto mb-2 mb-lg-0">
//             <Nav.Link>
//               <Link className="nav-link" to="/campaigns">Campaigns</Link>
//             </Nav.Link>
//             <Nav.Link>
//               <Link className="nav-link" to="/login">Log In</Link>
//             </Nav.Link>
//             <Nav.Link href="#pricing">
//             <Link className="nav-link" to="/signup">Sign Up</Link>
//               </Nav.Link>
//           </Nav>
          
//         </Container>
//       </Navbar>

   
//   );
// }

// export default ColorSchemesExample;