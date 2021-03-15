import { useState } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';

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

    const onNavLinkClick = (e) => {
        // console.log(e);

        // // update the active 
        // setState({
        //     ...state,
        //     active:e.target.hash.split("#")[1]
        // });

        // smooth scroll
    }

    const scrollToTop = () => {
        scroll.scrollToTop();
    }

    const classes = props.updateNav ? "navbar backdrop" : "navbar";

    return (
        <div className={classes}>
        { state.isMobile &&
          <button className="btn navbar-toggler" onClick={toggleNavbar}>
              <span></span>
              <span></span>
              <span></span>
          </button>
        } 

          { state.isNavOpen &&
          <ul className="navbar-nav">
              <li className={ state.active === "home" ? "nav-item active" : "nav-item" }>
                {/* <a className="nav-link" href="#home" data-href="#home" onClick={onNavLinkClick}>Home</a> */}
                <Link 
                    className="nav-link"
                    activeClass="active"
                    to="home"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={onNavLinkClick}
                >Home</Link>
              </li>
              <li className={ state.active === "about" ? "nav-item active" : "nav-item" }>
                {/* <a className="nav-link" href="#about" data-href="#about" onClick={onNavLinkClick}>About</a> */}
                <Link 
                    className="nav-link"
                    activeClass="active"
                    to="about"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={onNavLinkClick}
                >About</Link>
              </li>
              <li className={ state.active === "projects" ? "nav-item active" : "nav-item" }>
                {/* <a className="nav-link" href="#projects" data-href="#projects" onClick={onNavLinkClick}>Projects</a> */}
                <Link 
                    className="nav-link"
                    activeClass="active"
                    to="projects"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={onNavLinkClick}
                >Projects</Link>
              </li>
              <li className={ state.active === "contact" ? "nav-item active" : "nav-item" }>
                {/* <a className="nav-link" href="#contact" data-href="#contact" onClick={onNavLinkClick}>Contact</a> */}
                <Link 
                    className="nav-link"
                    activeClass="active"
                    to="contact "
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={onNavLinkClick}
                >Contact</Link>
              </li>
          </ul>
          }
      </div>
    )
}

export default Navigation;