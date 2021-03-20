import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FaPlus } from 'react-icons/fa';

function Project(props) {
    const [ state, setState ] = useState({
        projects:props.projects,
        isListComplete:false,
        activeProjects:props.projects.slice(0, 3),
        currentIndex:3,
        paginateBy:3,
        activeCategory:"All"
    });

     // load more data
    const loadMore = () => {
        const { paginateBy, projects, currentIndex, category} = state;
        let index = currentIndex + paginateBy;
        let activeProjects;

        if(category !== "All") {
            activeProjects = projects.filter(project => project.category == category).slice(currentIndex, index);
        } else{
            // load more projects by paginate
            activeProjects = projects.slice(currentIndex, index);
        }

        // update projects 
        setState({
            ...state,
            currentIndex:index,
            activeProjects:[...state.activeProjects, ...activeProjects]
        });
        
    };

    // filter by category
    const filterProjects = (category) => {
        // filter the projects
        const { projects, paginateBy } = state;

        console.log(category);
        if(category === "All") {
            setState({
                ...state,
                activeProjects:projects.slice(0, paginateBy),
                currentIndex:3,
                activeCategory:category
            });

            return;
        }

        // filter
        let activeProjects = projects.filter(project => project.category === category);

        // update 
        setState({
            ...state,
            activeCategory:category,
            currentIndex:3,
            activeProjects:activeProjects.slice(0, paginateBy)
        });
    }

    // return active classes
    const getClasses = (category) => {
        let { activeCategory } = state;
        return activeCategory === category ? "category active" : "category";
    }

    const { activeProjects } = state;
    return(
        <div className="section text-left" id="projects">
          <h3 className="title">PROJECTS</h3>
          <div className="d-flex project-filter">
              <div className={ getClasses('All') } onClick={() => filterProjects('All')}>All</div>
              <div className={ getClasses('Mapbox')} onClick={() => filterProjects('Mapbox')}>Mapbox</div>
              <div className={ getClasses('Leaflet')} onClick={() => filterProjects('Leaflet')}>Leaflet</div>
              <div className={ getClasses('Google Maps')} onClick={() => filterProjects('Google Maps')}>Google Maps</div>
              <div className={ getClasses('D3js')} onClick={() => filterProjects('D3js')}>D3js</div>
              <div className={ getClasses('React')} onClick={() => filterProjects('React')}>React</div>
          </div>

          <div className="cards">
            {/* list of projects */}
            {activeProjects.map(project => (
              <div className="card" key={project.id}>
                  <img src={project.images[0]} alt={project.title} />
                  
                  <div className="project-title">{project.title}</div>
                  <div className="card-backdrop">
                    <button className="btn">
                      <FaPlus />
                    </button>
                  </div>
              </div>
            ))}
          </div>
          
          <div className="d-flex more-section">
            <button  className="btn btn-outline-primary" onClick={loadMore}>View More</button>
          </div>
          
        </div>
    )
}

Project.propTypes = {
    projects:PropTypes.array,
};


export default Project;