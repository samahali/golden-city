import { useEffect, useState, useMemo } from "react";
import ImageCarousel from "../misc/ImageCarousel";
import "./SingleProperty.css";
import { useParams } from "react-router-dom";
import properties from "../../datas/properties.js";
import NotFound from "../pages/NotFound";

export default function SingleProperty() {
  const [property, setProperty] = useState({});
  const { id } = useParams();
  // Use useMemo to avoid recalculating propertyMap on every render
  const propertyMap = useMemo(() => {
    // Convert properties to a Map for faster lookup by id
    return new Map(properties.map((p) => [p.id, p]));
  }, [properties])

  useEffect(() => {
    // Retrieve the property directly from the map using id
    const foundProperty = propertyMap.get(Number(id)); // Use Number(id) to ensure type consistency
    if (foundProperty){
      setProperty(foundProperty);
    }
    window.scrollTo(0, 0);
  }, [id, propertyMap]);

  if (!property) return <NotFound />;

  return (
    <section  className="single-property-container">
      <div className="single-property-header">
        <h1>{property.name}</h1>
        <p>Premium real estate investment opportunity with high returns and secure ownership</p>
      </div>

      <div className="carousel-container">
        <ImageCarousel images={property.images} />
      </div>

      <div className="property-details-section">
        <div className="info-cards">
          <div className="info-card">
            <h3>Target Profitability</h3>
            <div className="info-value">{property.profit}%</div>
          </div>
          <div className="info-card">
            <h3>Objective of Returned Revenues</h3>
            <div className="info-value">{property.returns}%</div>
          </div>
          <div className="info-card">
            <h3>Valuation of the Property</h3>
            <div className="info-value">{property.price} ETH</div>
          </div>
        </div>
      </div>

      <div className="property-description">
        <h2>Property Description</h2>
        <p>
          This {property.name} is a premium investment opportunity carefully selected by our expert team. 
          Located in a prime area with high growth potential, this property offers an excellent balance 
          of security and returns.
        </p>
        <p>
          The property has been thoroughly vetted to ensure it meets our strict criteria for quality, 
          location, and potential appreciation. By investing in this opportunity, you're securing a 
          stake in real estate that's designed to generate consistent passive income.
        </p>
      </div>

      <div className="features-section">
        <h2>Property Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">🏢</span>
            <span className="feature-text">{property.sqft} Square Feet</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🛏️</span>
            <span className="feature-text">{property.beds} Bedrooms</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🚿</span>
            <span className="feature-text">{property.baths} Bathrooms</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📍</span>
            <span className="feature-text">Prime Location</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📈</span>
            <span className="feature-text">High ROI Potential</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔒</span>
            <span className="feature-text">Secure Investment</span>
          </div>
        </div>
      </div>

      <div className="buy-section">
        <h2>Ready to Invest?</h2>
        <p>
          Secure your stake in this premium property today and start earning passive income.
          Each NFT represents fractional ownership and entitles you to a share of the rental income.
        </p>
        <button className="buy-button">Buy Your NFT</button>
      </div>
    </section>
  );
}