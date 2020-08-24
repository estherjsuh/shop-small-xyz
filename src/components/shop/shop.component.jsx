import React, { useState, useEffect, Component } from 'react';

import './shop.styles.scss';

import SearchCheckBox from '../search-checkbox/search-checkbox.component';
import {categories, prices} from '../search-checkbox/data';

const Shop = () => {
    const [initialData, setInitialData] = useState([{}])
    const [filtered, setFiltered] = useState([{}])
    const [filters, setFilters] = useState({
        categories: [],
        prices: []
    })


    useEffect(()=> {
        fetch('/get_stores_all').then(
            response => response.json())
            .then
                (data => setInitialData(data))
    }, []);

    useEffect(() => {
        if (filters.categories.length === 0){
            setFiltered(initialData)}
        else {
        const filterResults = initialData.filter(object => filters['categories'].some(key => object[key]));
        setFiltered(filterResults)}
    
    }, [filters, initialData]);



    // const showFilteredResults = (filters) => {
    //     if (filters.categories.length === 0){
    //          initialData
        // } else{

    //  const filterResults = initialData.filter(object => filters['categories'].some(key => object[key]));
    //    setFiltered(filterResults)

        
    // }


    const handleFilters = (filters, category) => {
        const newFilters = {...filters}
        newFilters[category] = filters

        // showFilteredResults(newFilters)
        setFilters(newFilters)
        console.log(newFilters)
    }


return (

    <div>
        <SearchCheckBox
            list = {categories}
            handleFilters={filters=> handleFilters(filters, "categories")}
        />

    <SearchCheckBox
            list = {prices}
            handleFilters={filters=> handleFilters(filters, "prices")}
        />

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