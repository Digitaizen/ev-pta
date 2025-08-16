import React from 'react';

const Store = () => {
  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>PTA Store</h1>
          <p className="page-description">
            Shop for East View PTA merchandise and support our programs
          </p>
        </div>

        <div className="store-grid">
          <div className="product-card">
            <div className="product-image">
              <img 
                src="/images/store/pta-tshirt.jpg" 
                alt="East View PTA T-Shirt" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="product-info">
              <h3>East View PTA T-Shirt</h3>
              <p>Official East View High School PTA t-shirt in navy blue with gold logo.</p>
              <div className="product-price">$15.00</div>
              <button className="btn btn-primary">Add to Cart</button>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img 
                src="/images/store/spirit-mug.jpg" 
                alt="School Spirit Mug" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="product-info">
              <h3>School Spirit Mug</h3>
              <p>Show your East View pride with this ceramic mug featuring the school colors.</p>
              <div className="product-price">$12.00</div>
              <button className="btn btn-primary">Add to Cart</button>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img 
                src="/images/store/car-decal.jpg" 
                alt="Car Decal" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="product-info">
              <h3>East View Car Decal</h3>
              <p>Weather-resistant vinyl decal perfect for showing school spirit on your vehicle.</p>
              <div className="product-price">$5.00</div>
              <button className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>

        <div className="store-info">
          <div className="row">
            <div className="col-6">
              <h2>How to Order</h2>
              <ol>
                <li>Browse our selection of PTA merchandise</li>
                <li>Add items to your cart</li>
                <li>Proceed to secure checkout</li>
                <li>Choose pickup or delivery options</li>
              </ol>
            </div>
            <div className="col-6">
              <h2>Support Our Programs</h2>
              <p>
                All proceeds from store purchases go directly to supporting 
                East View High School programs and activities. Thank you for 
                your support!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
