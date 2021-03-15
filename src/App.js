import './App.css';
import Navigation from './components/Navigation';
import { useEffect, useState } from 'react';

// 3rd party
import { Link, animateScroll as scroll } from 'react-scroll';
import { FaCaretUp } from 'react-icons/fa';

// local code
import { projects } from './utils/mock';
import logo from './diamond.png';

const APP_STATE = {
  updateNav:false
};

function App() {
  const [ state, setState ] = useState(APP_STATE);

  // 
  useEffect(function() {
    window.addEventListener("scroll", handleScroll);

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // 
  const handleScroll = (e) => {
    let height = e.target.scrollingElement.scrollTop;
    if(height > 180 && !state.updateNav) {
      setState({
        ...state,
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
       
        <div className="section text-left" id="projects">
          <h3 className="title">PROJECTS</h3>
          <div className="cards">
            {/* list of projects */}
            {projects.map(project => (
              <div className="card" key={project.id}>
                  <img src={project.images[0]} alt={project.title} />
                  <div>{project.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="section text-left" id="contact">
          <h3 className="title">CONTACTS</h3>
          <div className="text-left">
           <div>
             <i className="fa fa-twitter"></i>
           </div>

           <div>
             <i className="fa fa-fiverr"></i>
           </div>

           <div>
             <i className="fa fa-gmail"></i>
           </div>

           <div className="about-description text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec malesuada ex, eget vestibulum dolor. Mauris arcu lectus, facilisis eu ipsum id, iaculis posuere arcu. Sed luctus nunc ac ipsum cursus porttitor. 
            Donec felis magna, venenatis at felis eget, eleifend commodo sem. 
          </div>
          </div>
        </div>

        {/* scrollToTop */}

        { state.updateNav && 
          <button className="btn btn-scroll-up" onClick={scrollToTop}>
            <FaCaretUp />
          </button>
        }
        

      </main>

      <footer className="footer">
        David Njeri. &copy;2020.
      </footer>
    </div>
  );
}

export default App;
