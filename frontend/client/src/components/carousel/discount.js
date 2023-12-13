import React from 'react'

const discount = () => {
  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <div className="carousel-caption d-none d-md-block">
          <h5>First Slide</h5>
          <p>This is the first slide content.</p>
        </div>
      </div>
      <div className="carousel-item">
        <div className="carousel-caption d-none d-md-block">
          <h5>Second Slide</h5>
          <p>This is the second slide content.</p>
        </div>
      </div>
      <div className="carousel-item">
        <div className="carousel-caption d-none d-md-block">
          <h5>Third Slide</h5>
          <p>This is the third slide content.</p>
        </div>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  )
}

export default discount
