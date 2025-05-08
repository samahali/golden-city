import './Header.css'

const Header = () => {
    return (
        <>
            <header className="bg-image">
                <div className="bg-container">
                    <h1 style={{ color: 'white', fontSize: '60px' }}>
                      Invest and Trade in Real Estate with Cryptocurrency
                    </h1>                
                    {/* <p style={{ color: 'gold', fontSize: '30px' }}>
                        NFTs & Web3 for transparency, authenticity and sustainability
                    </p> */}
                    <a href="#properties" className="action">
                      See Our Properties
                    </a>
                </div>
            </header>
        </>
    )
}

export default Header;