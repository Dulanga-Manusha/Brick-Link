import React from 'react'
import './OurServices.css'

const OurServices = () => {
  return (
    <div className="homepage">
          <section className="services" id='services'>
            <h2>Our Services</h2>
            <div className="service-container">
              <div className="service-box">
                <h3>Residential Construction</h3>
                <p>
                  Transforming your dream home into reality with precision, quality, and timely execution. 
                  From custom builds to renovations, our team ensures your home is built to last.
                </p>
              </div>
              <div className="service-box">
                <h3>Commercial Construction</h3>
                <p>
                  Building spaces that support your business goals. We specialize in constructing office buildings, retail spaces, 
                  and industrial facilities with a focus on functionality and aesthetics.
                </p>
              </div>
              <div className="service-box">
                <h3>Project Management</h3>
                <p>
                  Efficiently managing your construction projects from start to finish. Our experienced project managers 
                  oversee every detail, ensuring projects are completed on time and within budget.
                </p>
              </div>
              <div className="service-box">
                <h3>Renovation and Remodeling</h3>
                <p>
                  Breathing new life into existing structures. Whether it's a kitchen remodel, an office update, 
                  or a complete home renovation, we provide expert craftsmanship and design solutions.
                </p>
              </div>
              <div className="service-box">
                <h3>Design and Build Services</h3>
                <p>
                  Offering comprehensive design and build solutions. Our integrated approach combines architecture, engineering, 
                  and construction, providing a seamless experience from concept to completion.
                </p>
              </div>
              <div className="service-box">
                <h3>Sustainable Construction</h3>
                <p>
                  Committed to building a greener future. We use sustainable practices and materials to reduce environmental impact 
                  and create energy-efficient buildings.
                </p>
              </div>
            </div>
          </section>
        </div>
  )
}

export default OurServices
