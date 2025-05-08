import { useEffect } from 'react';
import "./Home.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from '../misc/Header';
import Gift from '../misc/Gift';
import Property from '../misc/Property';
import QnA from '../misc/QnA';
import vrmobile from "../../images/vrmobile.png";
import connect_wallet from "../../images/connect_wallet.png";
import home1 from "../../images/home.jpg";
import trading from "../../images/trading.jpg";
import sellhome from "../../images/sellhome.jpg";
import faq from "../../datas/faqs/faq";
import properties from "../../datas/properties";
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      
      <section className="invest-process">
        <div className="container-fluid">
          <h2 className="section-heading">How to invest and trade in real estate with GoldenCity?</h2>
          
          <div className="step-cards">
            <div className="step-card">
              <span className="step-number">01</span>
              <div className="step-image">
                <img src={connect_wallet} alt="Connect wallet" />
              </div>
              <h3 className="step-title">Connect Wallet</h3>
              <p className="step-description">Connect your wallet to GoldenCity</p>
            </div>
            
            <div className="step-card">
              <span className="step-number">02</span>
              <div className="step-image">
                <img src={home1} alt="Browse marketplace" />
              </div>
              <h3 className="step-title">Browse Market</h3>
              <p className="step-description">Go to the marketplaces to buy real estate</p>
            </div>
            
            <div className="step-card">
              <span className="step-number">03</span>
              <div className="step-image">
                <img src={trading} alt="Receive returns" />
              </div>
              <h3 className="step-title">Receive Returns</h3>
              <p className="step-description">You receive your rental return each month</p>
            </div>
            
            <div className="step-card">
              <span className="step-number">04</span>
              <div className="step-image">
                <img src={sellhome} alt="Sell property" />
              </div>
              <h3 className="step-title">Sell Anytime</h3>
              <p className="step-description">Sell your real estate whenever you want</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="advantages">
        <div className="container-fluid">
          <h2 className="section-heading">The advantages, without the disadvantages</h2>
          <p className="section-description">
            Our unique solution allows everyone to build up their own assets, from as little as $10.<br/>
            Investing your savings is finally simple and really rewarding.
          </p>
          
          <div className="advantages-grid">
            <div className="advantage-card">
              <div className="advantage-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Profitability</h3>
              <p>We will try to base this on an average of 7%.</p>
            </div>
            
            <div className="advantage-card">
              <div className="advantage-icon">
                <i className="fas fa-sync-alt"></i>
              </div>
              <h3>Liquidity</h3>
              <p>You buy and sell your NFTs whenever you want.</p>
            </div>
            
            <div className="advantage-card">
              <div className="advantage-icon">
                <i className="fas fa-hand-holding-usd"></i>
              </div>
              <h3>No hidden fee</h3>
              <p>No entry, exit or capital gains fees.</p>
            </div>
            
            <div className="advantage-card">
              <div className="advantage-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <h3>No management</h3>
              <p>Don't worry, GoldenCity takes care of everything.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="how-it-works">
        <div className="container-fluid">
          <h2 className="section-heading">How <span className="highlight">GoldenCity</span> works?</h2>
          
          <div className="how-it-works-content">
            <div className="how-it-works-steps">
              <div className="steps-column">
                <div className="step-item">
                  <span className="step-indicator">1</span>
                  <div className="step-text">
                    <h3>A building is selected</h3>
                    <p>We divide it by $10 to have a supply of NFTs on it.</p>
                  </div>
                </div>
                
                <div className="step-item">
                  <span className="step-indicator">2</span>
                  <div className="step-text">
                    <h3>NFTs are available</h3>
                    <p>You can now buy NFTs against the property in question.</p>
                  </div>
                </div>
              </div>
              
              <div className="steps-column">
                <div className="step-item">
                  <span className="step-indicator">3</span>
                  <div className="step-text">
                    <h3>Receive monthly returns</h3>
                    <p>Each month, you will receive the rents collected on your wallet.</p>
                  </div>
                </div>
                
                <div className="step-item">
                  <span className="step-indicator">4</span>
                  <div className="step-text">
                    <h3>Sell when ready</h3>
                    <p>When you decide, you can put your NFT up for sale, otherwise take advantage of the passive income.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="how-it-works-image">
              <img src={vrmobile} alt="GoldenCity mobile app" />
            </div>
          </div>
        </div>
      </section>
      
      <section className="properties-showcase" id="properties">
        <div className="container-fluid">
          <div className="section-header">
            <h2 className="section-heading">Among our properties already financed</h2>
            <Link to="/MarketPlace" className="view-all">View All</Link>
          </div>
          
          <div className="properties-grid">
            {properties.map((property, index) => (
              <Property key={index} property={property} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="faq-section">
        <div className="container-fluid">
          <h2 className="section-heading">Your most frequently asked questions</h2>
          <p className="section-description">
            Based on your feedback, we try to answer your questions and expectations.
          </p>
          
          <div className="faq-container">
            {faq.map((q, i) => (
              <QnA key={i} n={i+1} q={q} />
            ))}
          </div>
        </div>
      </section>
      
      <Gift />
    </>
  );
};

export default Home;