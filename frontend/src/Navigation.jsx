import { Link, NavLink } from "react-router-dom";

function Navigation() {
  return (
    <>
      <div className="navbar-light bg-light nav-container">
        <nav className="container center navbar navbar-expand-lg">
          <Link className="navbar-brand" to="/">
            Photo Sharing App
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-link active" to="/">
                Nature <span className="sr-only">(current)</span>
              </NavLink>
              <NavLink className="nav-link" to="/architecture">
                Architecture
              </NavLink>
              <NavLink className="nav-link" to="/fashion">
                Fashion
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navigation;
