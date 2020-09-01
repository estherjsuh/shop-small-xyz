import React, { useState, useEffect } from 'react';

import './shop.styles.scss';

import SearchCheckBox from '../search-checkbox/search-checkbox.component';
import { categories, prices, cities } from '../search-checkbox/data';


const Navbar = (props) => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                {props.children}
            </ul>
        </nav>
    );
}

const Shop = () => {
    const [initialData, setInitialData] = useState([{}])
    const [filtered, setFiltered] = useState([{}])
    const [filters, setFilters] = useState({
        categories: [],
        prices: [],
        cities: []

    })

    useEffect(() => {
        fetch('/get_stores_all').then(
            response => response.json())
            .then
            (data => setInitialData(data))
    }, []);
console.log('inittt==>>>', initialData)
console.log('filllll==>>>', filters)

    useEffect(() => {

        if (Object.values(filters).every(a => a.length === 0)) {
            setFiltered(initialData)
        }
        else {
            const newData = initialData.filter(object => {
                const categoriesFilters = filters.categories.length ? filters.categories.some(key => object[key]) : true;

                const pricesFilters = filters.prices.length ? filters.prices.some(key => object[key]) : true;

                const citiesFilters = filters.cities.length ? filters.cities.includes(object.nearestLocation) : true;

                // console.log('yoo==>>>', categoriesFilters, 'ppp===>>',pricesFilters, 'ccc==>>', citiesFilters )

                return categoriesFilters && pricesFilters && citiesFilters
            });
            setFiltered(newData)
        }


    }, [filters, initialData]);



    const handleFilters = (f, category) => {
        const newFilters = { ...filters }
        newFilters[category] = f
        setFilters(newFilters)
        console.log(filters)
    }


    return (
        <div className="shopPage">
            <div className="searchBoxes">
                <Navbar>
                    <SearchCheckBox
                        list={categories}
                        handleFilters={filters => handleFilters(filters, "categories")}
                        title="categories"
                    />
                    <SearchCheckBox
                        list={prices}
                        handleFilters={filters => handleFilters(filters, "prices")}
                        title="prices"
                    />
                    <SearchCheckBox
                        list={cities}
                        handleFilters={filters => handleFilters(filters, "cities")}
                        title="cities"
                    />
                </Navbar>
            </div>

            <div className='storeContainer'>
                {filtered.map((element, index) =>
                    <div className='imgContainer'>
                        <div className='image'
                            style={{ backgroundImage: `url(https://shopsmall-bucket.s3-us-west-1.amazonaws.com/${element.store_id}.png)` }}> </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Shop;