import React, { useState } from 'react';
import PropTypes from 'prop-types';

// 3rd party Components
import { FaChevronLeft, FaPlus, FaChevronRight, FaTimes } from 'react-icons/fa';
import { CarouselProvider, Slider, Slide, Image, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

function Project(props) {
    const [ state, setState ] = useState({
        projects:props.projects,
        isListComplete:false,
        activeProjects:props.projects.slice(0, 3),
        currentIndex:3,
        paginateBy:3,
        activeCategory:"All",
        activeItem:{},
        isCarouselOpen:false
    });

     // load more data
    const loadMore = () => {
        const { paginateBy, projects, currentIndex, activeCategory } = state;
        let index = currentIndex + paginateBy;
        let activeProjects;

        // check if index is larger than length;
        index = index > projects.length ? projects.length : index;

        if(activeCategory !== "All") {
            activeProjects = projects.filter(project => project.category === activeCategory).slice(currentIndex, index);
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

    // display carousel
    const toggleCarousel = (id) => {
        // get the active 
        let activeItem = state.projects.find(project => project.id === id);

        setState({
            ...state,
            activeItem,
            isCarouselOpen:true
        })
    }

    const closeCarousel = (evt) => {
        setState({
            ...state,
            isCarouselOpen:false
        })
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
                {
                    project.images[0].includes("https") && 
                    <img src={project.images[0]} alt={project.title} />
                }

                {
                    !project.images[0].includes("https") && 
                    <img src={process.env.PUBLIC_URL + project.images[0]} alt={project.title} />
                }
                  
                  
                  <div className="project-title">{project.title}</div>
                  <div className="card-backdrop">
                    <button className="btn" onClick={() => toggleCarousel(project.id)}>
                      <FaPlus />
                    </button>
                  </div>
              </div>
            ))}
          </div>
          
          <div className="d-flex more-section">
            <button  className="btn btn-outline-primary" onClick={loadMore}>View More</button>
          </div>
          {
              state.isCarouselOpen &&
              <CarouselContainer 
                item={state.activeItem}
                toggleCarousel={closeCarousel}
              />
          }
          
        </div>
    )
}

Project.propTypes = {
    projects:PropTypes.array,
};


const CarouselContainer = (props) => {
    return (
        <div className="carousel-container">
            <button 
                className="btn btn-close"
                onClick={props.toggleCarousel}
                >
                <FaTimes />
            </button>

            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={125}
                totalSlides={3}
                isPlaying={true}
            >
                <Slider>
                    {props.item.images.map((image, index) => (
                        <Slide index={index} key={index}>
                            <Image src={image} />

                            {
                                image.includes("https") && 
                                <Image src={image} />
                            }

                            {
                                !image.includes("https") && 
                                <img src={process.env.PUBLIC_URL + image} alt={props.item.title} />
                            }
                            {props.item.title}
                        </Slide>
                    ))}
                </Slider>

                <ButtonBack className="btn btn-back">
                    <FaChevronLeft />
                </ButtonBack>
                <ButtonNext className="btn btn-next">
                    <FaChevronRight />
                </ButtonNext>
            </CarouselProvider>
        </div>
    )
}

export default Project;