import { useState } from 'react';
import { Link } from 'react-scroll';
import pageLogo from '../../diamond.png';

const STATE = {
    isNavOpen:true,
    isMobile:true,
    active:'home'
};

function Navigation(props) {
    const [state, setState] = useState({...STATE});

    const toggleNavbar = () => {
        
      setState({
        ...state,
        isNavOpen:!state.isNavOpen
      });
  
    };

    const classes = props.updateNav ? "navbar backdrop" : "navbar";

    return (
        <div className={classes}>
        <div className="navbar-brand">
            <a className="logo">
                <img src={pageLogo} />
            </a>
            { state.isMobile &&
            <button className="btn navbar-toggler" onClick={toggleNavbar}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            } 
        </div>
        

          { state.isNavOpen &&
          <ul className="navbar-nav">
              <li className={ state.active === "home" ? "nav-item active" : "nav-item" }>
                <Link 
                    className="nav-link"
                    activeClass="active"
                    to="home"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                >Home</Link>
              </li>
              <li className={ state.active === "about" ? "nav-item active" : "nav-item" }>
                
                <Link 
                    className="nav-link"
                    activeClass="active"
                    to="about"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                >About</Link>
              </li>
              <li className={ state.active === "projects" ? "nav-item active" : "nav-item" }>
               
                <Link 
                    className="nav-link"
                    activeClass="active"
                    to="projects"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                >Projects</Link>
              </li>
          </ul>
          }
      </div>
    )
}

export default Navigation;