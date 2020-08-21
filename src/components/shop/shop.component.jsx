import React, { useState, useEffect, Component } from 'react';
import { waitForElementToBeRemoved } from '@testing-library/react';


const Shop = () => {
    const [initialData, setInitialData] = useState([{}])

    useEffect(()=> {
        fetch('/get_stores_all').then(
            response => response.json())
            .then
            // (data=> console.log(data))
                (data => setInitialData(data))
    }, []);



return (
    <div>
        {initialData.map((element, index) => 

                <div className='storeContainer'>
                    <h2>{element.shopName}</h2>
                    <p>{element.website}</p>
                    <div className='imgContainer'>
                        <img src={`https://shopsmall-bucket.s3-us-west-1.amazonaws.com/${element.store_id}.png`}/>

                    </div>

                </div>
        )}
    </div>   
    )
}

export default Shop;