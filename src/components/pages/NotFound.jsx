import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="error-code">
                    <span>4</span>
                    <div className="gold-circle">
                        <div className="gold-building">
                            <i className="fas fa-building"></i>
                        </div>
                    </div>
                    <span>4</span>
                </div>
                
                <h1>Page Not Found</h1>
                
                <p>The luxury property you're looking for doesn't seem to exist.</p>
                
                <div className="not-found-actions">
                    <Link to="/" className="home-button">
                        Return to Homepage
                    </Link>
                    
                    <Link to="/marketplace" className="marketplace-button">
                        Explore Properties
                    </Link>
                </div>

                <div className="decorative-elements">
                    <div className="gold-shape shape-1"></div>
                    <div className="gold-shape shape-2"></div>
                    <div className="gold-shape shape-3"></div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;