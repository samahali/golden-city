import React, { useEffect, useRef } from 'react'
import './Gift.css'
import building from "../../images/building.jpg"

const Gift = () => {
    const giftRef = useRef(null);
    
    useEffect(() => {
        // Add sparkle elements
        const gift = giftRef.current;
        if (gift) {
            for (let i = 0; i < 3; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                gift.appendChild(sparkle);
            }
        }
    }, []);
    
    return (
        <div className="gift-container">
            <div className="gift" ref={giftRef}>
                <div className="gift-content">
                    <div className="text">
                        <div className="discord-badge">
                            <i className="fab fa-discord"></i>
                            <span>JOIN OUR COMMUNITY</span>
                        </div>
                        <h3>Lots of gifts to be won!</h3>
                        <p>
                            Please join our group where we can talk about the various current and future properties. 
                            In addition, there will be prizes to be won.
                        </p>
                        <a href="https://discord.gg" className="gift-button-wrapper">
                            <button className="gift-button">
                                Join the discord
                            </button>
                        </a>
                    </div>
                    <div className="gift-visual">
                        <div className="gift-icon">
                            <i className="fas fa-gift"></i>
                        </div>
                        <img className="building" src={building} alt="Premium real estate property" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gift;