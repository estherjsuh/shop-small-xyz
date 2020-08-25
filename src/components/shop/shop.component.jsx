import React, { useState, useEffect } from 'react';

import './shop.styles.scss';

import SearchCheckBox from '../search-checkbox/search-checkbox.component';
import {categories, prices, cities} from '../search-checkbox/data';

const Shop = () => {
    const [initialData, setInitialData] = useState([{}])
    const [filtered, setFiltered] = useState([{}])
    const [filters, setFilters] = useState({
        categories: [],
        prices: [],
        cities: []

    })


    useEffect(()=> {
        fetch('/get_stores_all').then(
            response => response.json())
            .then
                (data => setInitialData(data))
    }, []);


    useEffect(() => {

        if (Object.values(filters).every(a => a.length ===0)){
            setFiltered(initialData)
        }

        else if (filters.categories.length > 0 && filters.prices.length === 0) {
        const filterResults = initialData.filter(object => filters['categories'].some(key => object[key]));
        setFiltered(filterResults)
        } 
        else if (filters.prices.length > 0 && filters.categories.length === 0 ) {
            const filterResults = initialData.filter(object => filters['prices'].some(key => object[key]));
            setFiltered(filterResults)
        }
        
        else 
        if (filters.categories.length > 0 && filters.prices.length >0) 
        {
    
        const filterResults = initialData.filter(object => filters['categories'].some(key => object[key]) && filters['prices'].some(key => object[key]));
            setFiltered(filterResults)
        }
    
    }, [filters, initialData]);



    // const showFilteredResults = (filters) => {
    //     if (filters.categories.length === 0){
    //          initialData
    //     } else{
    //  const filterResults = initialData.filter(object => filters['categories'].some(key => object[key]));
    //    setFiltered(filterResults)
    // }
    // }

    const handleFilters = (f, category) => {
        const newFilters = {...filters}
        newFilters[category] = f

        // if (category==="prices"){
        //     newFilters[category] = filters
        //     setFilters(newFilters)
        // }

        // showFilteredResults(newFilters)
        setFilters(newFilters)
        console.log(newFilters)
    }


return (

    <div className="shopPage">
        <div className="searchBoxes">
        <SearchCheckBox
            list = {categories}
            handleFilters={filters=> handleFilters(filters, "categories")}
        />

         <SearchCheckBox
            list = {prices}
            handleFilters={filters=> handleFilters(filters, "prices")}
        />

        <SearchCheckBox
            list = {cities}
            handleFilters={filters=> handleFilters(filters, "cities")}
        />

        </div>
        {filtered.map((element, index) => 

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