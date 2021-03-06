import React, { useState, useEffect } from 'react';

import './shop.styles.scss';

import SearchCheckBox from '../search-checkbox/search-checkbox.component';
import { categories, prices, cities } from '../search-checkbox/data';

import Dropdown from '../dropdown/dropdown.component';


const Shop = () => {
    const [initialData, setInitialData] = useState([{}])
    const [filtered, setFiltered] = useState([{}])
    const [filters, setFilters] = useState({
        categories: [],
        prices: [],
        cities: []
    })

    useEffect(() => {
        fetch('/api/get_stores_all').then(
            response => response.json())
            .then
            (data => setInitialData(data))
    }, []);


    useEffect(() => {
        if (Object.values(filters).every(a => a.length === 0)) {
            setFiltered(initialData)
        }
        else {
            const newData = initialData.filter(object => {
                const categoriesFilters = filters.categories.length ? filters.categories.some(key => object[key]) : true;

                const pricesFilters = filters.prices.length ? filters.prices.some(key => object[key]) : true;

                const citiesFilters = filters.cities.length ? filters.cities.includes(object.nearestLocation) : true;

                return categoriesFilters && pricesFilters && citiesFilters
            });
            setFiltered(newData)
        }
    }, [filters, initialData]);


    const handleFilters = (f, category) => {
        const newFilters = { ...filters }
        newFilters[category] = f
        setFilters(newFilters)
        console.log(newFilters)
    }


    return (
        <div className="shopPage">
            <div className="search">
                    <Dropdown title="categories">
                        <SearchCheckBox
                            list={categories}
                            checked ={filters.categories}
                            handleFilters={filters => handleFilters(filters, "categories")}
                        />
                    </Dropdown>
                    <Dropdown title="prices">
                    <SearchCheckBox
                        list={prices}
                        checked={filters.prices}
                        handleFilters={filters => handleFilters(filters, "prices")}
                    />
                    </Dropdown>
                    <Dropdown title="cities">
                    <SearchCheckBox
                        list={cities}
                        checked={filters.cities}
                        handleFilters={filters => handleFilters(filters, "cities")}
                    />
                    </Dropdown>
            </div>
        <div className='stores'>
            <div className='storeContainer'>
        
                {filtered.map((element, index) =>
                   
                    <div className='imgContainer' key={index}
                    onClick={ () => window.open(`https://${element.website}`, "_blank")}
                    >
                        <div className='image' 
                            style={{ backgroundImage: `url(https://shopsmall-bucket.s3-us-west-1.amazonaws.com/${element.store_id}.png)` }}> 
                        </div>
                            <br/>
                         <p className='storeName' onClick={ () => window.open(`https://${element.website}`, "_blank")}>{element.shopName}</p>
                    </div>
                )}
            </div>
        </div>
        </div>
    )
}

export default Shop;