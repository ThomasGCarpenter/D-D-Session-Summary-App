function Header(){
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="#">Dnd App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Sign In</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Sing Up</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )
}

export default Header;