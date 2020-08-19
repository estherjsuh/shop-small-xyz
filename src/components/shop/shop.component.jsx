import React, { useState, useEffect } from 'react';


const Shop = () => {
    const [initialData, setInitialData] = useState([{}])

    useEffect(()=> {
        fetch('/get_stores_all').then(
            response => response.json())
            .then
            // (data=> console.log(data))
                (data => setInitialData(data))
    }, []);
    
return(
    <div className= 'stores'>
        <h2>{initialData[0].shopName}</h2>
        <div className='screenshotContainer'>
            <a href={initialData[0].website} target="_blank">{initialData[0].website}</a>
        </div>
    </div>
    );
}


export default Shop;