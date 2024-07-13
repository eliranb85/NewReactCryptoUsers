// Component2.js
import React, { useState, useEffect } from 'react';

export default function Component2() {
    const [cryptoData, setCryptoData] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem('cryptoData');
        if (storedData) {
            setCryptoData(JSON.parse(storedData));
        }
    }, []);

    if (cryptoData.length === 0) {
        return <div>Loading...</div>;
    }

    // Calculate total market cap
    const totalMarketCap = cryptoData.reduce((sum, crypto) => sum + crypto.market_cap, 0);

    // Find highest price crypto
    const highestPriceCrypto = cryptoData.reduce((max, crypto) => 
        crypto.current_price > max.current_price ? crypto : max
    );

    // Calculate average price
    const averagePrice = cryptoData.reduce((sum, crypto) => sum + crypto.current_price, 0) / cryptoData.length;

    return (
        <div>
            <h2>Crypto Market Analysis</h2>
            <p>Total Market Cap: ${totalMarketCap.toLocaleString()}</p>
            <p>Highest Price Crypto: {highestPriceCrypto.name} (${highestPriceCrypto.current_price.toLocaleString()})</p>
            <p>Average Price: ${averagePrice.toFixed(2)}</p>
        </div>
    );
}