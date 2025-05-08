import React, { useEffect } from 'react';

import Property from '../misc/Property';
import Building3D from '../misc/Building3D';
import './MarketPlace.css';
import properties from '../../datas/properties';

const MarketPlace = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="marketplace-container">
            <div className="marketplace-header">
                <h1>GoldenCity Marketplace</h1>
                <p>Discover premium real estate investment opportunities with high returns and secure ownership</p>
            </div>

            <div className="properties-section">
                <h2 className="section-title">Properties for Investment</h2>
                <div className="properties-list">
                    {properties.map((property) => (
                        <Property key={property.id} property={property}/>
                    ))}
                </div>
            </div>

            <div className="section-divider"></div>

            {/* Add the enhanced 3D Building component */}
            <Building3D/>
        </div>
    );
}

export default MarketPlace;