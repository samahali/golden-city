import { useEffect, useState } from 'react';
import "./FAQ.css";
import how from "../../datas/faqs/how.js";
import marketPlace from "../../datas/faqs/marketPlace.js";
import propertyManagement from "../../datas/faqs/propertyManagement.js";
import accounting from "../../datas/faqs/accounting.js";
import financial from "../../datas/faqs/financial.js";
import legal from "../../datas/faqs/legal.js";
import QnA from "../misc/QnA";

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState('general');
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = [
        { id: 'general', name: 'General Information' },
        { id: 'marketplace', name: 'Marketplace' },
        { id: 'property', name: 'Property Management' },
        { id: 'accounting', name: 'Accounting' },
        { id: 'financial', name: 'Financial' },
        { id: 'legal', name: 'Legal' }
    ];

    const renderFAQs = () => {
        switch(activeCategory) {
            case 'general':
                return how.map((how, i) => <QnA key={`general-${i}`} n={i+1} q={how} />);
            case 'marketplace':
                return marketPlace.map((m, i) => <QnA key={`marketplace-${i}`} n={i+1} q={m} />);
            case 'property':
                return propertyManagement.map((p, i) => <QnA key={`property-${i}`} n={i+1} q={p} />);
            case 'accounting':
                return accounting.map((a, i) => <QnA key={`accounting-${i}`} n={i+1} q={a} />);
            case 'financial':
                return financial.map((f, i) => <QnA key={`financial-${i}`} n={i+1} q={f} />);
            case 'legal':
                return legal.map((l, i) => <QnA key={`legal-${i}`} n={i+1} q={l} />);
            default:
                return how.map((how, i) => <QnA key={`general-${i}`} n={i+1} q={how} />);
        }
    };

    return (
        <div className="faq-container">
            <div className="faq-header">
                <h1>Frequently Asked Questions</h1>
                <p>Find answers to the most common questions about GoldenCity, our marketplace, and real estate investment opportunities</p>
            </div>

            <div className="faq-categories">
                {categories.map(category => (
                    <button 
                        key={category.id}
                        className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <div className="faq-list">
                {renderFAQs()}
            </div>

            <div className="contact-cta">
                <h2>Still have questions?</h2>
                <p>If you couldn't find the answer to your question, our support team is ready to help you.</p>
                <button className="contact-btn">Contact Us</button>
            </div>
        </div>
    );
};

export default FAQ;