import React, { useEffect } from 'react';
import "./About.css";
import Gift from '../misc/Gift';
import about_img from "../../images/about-image.png";

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about-container">
            <div className="about-header">
                <h1>About GoldenCity</h1>
                <p>Learn how we're making real estate investment accessible to everyone through innovative blockchain technology</p>
            </div>

            <div className="about-top">
                <div className='about-top-1'> 
                    <h2 className="section-title">How does GoldenCity work?</h2>
                    <p>
                        Our team of experts selects and negotiates the acquisition of investment properties. These properties are made up of several lots, generally already rented. They allow us to carry out high value-added real estate transactions that are usually inaccessible to the majority of private individuals.
                    </p>
                    <p>
                        For each property to be financed, we divide the purchase price by 10$ to define the supply of the NFT collection associated with the properties.
                    </p>
                    <p>
                        When you collect, you can invest money in the property or properties of your choice by purchasing one or more NFTs.
                    </p>
                </div>

                <div className='about-top-2'>
                    <img src={about_img} className="about-image" alt="A building"/>
                </div>
            </div>

            <div className="mission-section">
                <h2>Our Mission</h2>
                <p>
                    At GoldenCity, our mission is to democratize real estate investment by leveraging blockchain technology. We believe everyone should have access to passive income through property ownership, regardless of their financial background or status.
                </p>
            </div>

            <div className='about-bottom'>
                <div className='about-bottom-1'>
                    <h2 className="section-title">Build your assets with NFT</h2>
                    <p>
                        Each NFT entitles you to royalties based on the rental income generated by the building.
                    </p>
                    <p>
                        Each month we pay you a fraction of the rent collected, in proportion to the number of NFTs you own. This payment is made each month to your wallet holding the NFT.
                    </p>
                    <p>
                        At any time, you can buy or sell more NFTs through the secondary market.
                    </p>
                </div>

                <div className='about-bottom-2'>
                    <h2 className="section-title">Real estate investment really is accessible to everyone</h2>
                    <p>
                        Our investment opportunities are accessible to everyone: beginners or experienced investors, regardless of income, and regardless of your professional situation.
                    </p>
                    <p>
                        With GoldenCity, you don't need to obtain a mortgage, and you can finally invest in real estate without any personal contribution.
                    </p>
                    <p>
                        Whether you are a student, a young worker, a self-employed person, a liberal profession, a company director, an employee or a retiree: Welcome to GoldenCity!
                    </p>
                </div>
            </div>

            <Gift/>
        </div>
    );
};

export default About;