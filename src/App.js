import './App.css';
import Navigation from './components/Navigation';
import { useEffect, useState } from 'react';

// 3rd party
import { Link, animateScroll as scroll } from 'react-scroll';
import { FaCaretUp, FaLinkedin, FaGoogle, FaTwitter } from 'react-icons/fa';

// local code
import { projects } from './utils/mock';
import logo from './diamond.png';

// components
import Project from './components/Projects';

const APP_STATE = {
  updateNav:false, 
  projects:projects,
};

function App() {
  const [ state, setState ] = useState(Object.assign({}, APP_STATE));

  // 
  useEffect(function() {
    window.addEventListener("scroll", handleScroll);

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // scroll button
  const handleScroll = (e) => {
    let height = e.target.scrollingElement.scrollTop;

    // 
    if(height > 180) {
      setState({
        ...Object.assign({}, state),
        updateNav:true
      })
    } else {

      setState({
        ...state,
        updateNav:false
      })
    }

  }

  // scroll
  const scrollToTop = () => {
    scroll.scrollToTop();
  }


  return (
    <div className="App">
      <Navigation updateNav={state.updateNav} />
      <header className="App-header" id="home">
        <div className="description">
          <h3>Hello.<br></br> I'm David </h3>
          <p>
            I am Web and GIS Developer
          </p>

          <Link 
            className="btn btn-outline-primary" 
            to="projects"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
              EXPLORE PROJECTS
          </Link>
         
        </div>

        <div className="img-tab">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        
      </header>

      <main className="main">
        <div className="section text-left" id="about">
          <h3 className="title">ABOUT</h3>
          <div className="about-description text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec malesuada ex, eget vestibulum dolor. Mauris arcu lectus, facilisis eu ipsum id, iaculis posuere arcu. Sed luctus nunc ac ipsum cursus porttitor. 
            Donec felis magna, venenatis at felis eget, eleifend commodo sem. 
          </div>
        </div>

        <Project
          projects={state.projects}
        />
        {/* scrollToTop */}

        { state.updateNav && 
          <button className="btn btn-scroll-up" onClick={scrollToTop}>
            <FaCaretUp />
          </button>
        }
        

      </main>

      <footer className="footer">
        <p>David Njeri. &copy;2020.</p>
        <div className="social-links text-left">
           <div>
             <a href="https://twitter.com/DavidNg96191301">
              <FaTwitter />
             </a>
             
           </div>

           <div>
             <a href="https://www.linkedin.com/in/david-njeri-b54022199/">
              <FaLinkedin />
             </a>
             
           </div>

           <div>
              <a href=""> 
                <FaGoogle /> 
              </a>
           </div>

        </div>
      </footer>
    </div>
  );
}

export default App;
