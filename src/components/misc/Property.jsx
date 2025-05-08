import { Link } from 'react-router-dom';
import './Property.css';

const Property = ({ property }) => {
  // Get the first image for the property card
  const mainImage = property.images[0];
  
  return (
    <div className="property-card">
      <div className="badge">Hot Deal</div>
      <div className="property-image">
        <img src={mainImage} alt={property.name} />
      </div>
      <div className="property-info">
        <h3 className="property-name">{property.name}</h3>
        <div className="property-price">${property.price}</div>
        
        <div className="property-details">
          <div className="detail-item">
            <div className="detail-value">{property.profit}%</div>
            <div className="detail-label">Profit</div>
          </div>
          <div className="detail-item">
            <div className="detail-value">{property.returns}%</div>
            <div className="detail-label">Returns</div>
          </div>
          <div className="detail-item">
            <div className="detail-value">{property.investors}</div>
            <div className="detail-label">Investors</div>
          </div>
        </div>
        
        <Link to={`/property/${property.id}`} className="property-button">
          Details
        </Link>
      </div>
    </div>
  );
};

export default Property;