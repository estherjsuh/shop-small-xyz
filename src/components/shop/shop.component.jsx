import React, { useState, useEffect } from 'react';

import './shop.styles.scss';

import SearchCheckBox from '../search-checkbox/search-checkbox.component';
import {categories, prices, cities} from '../search-checkbox/data';
// import Example from '../dropdown/dropdown.component';


const Navbar = (props) =>{
    return(
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
    
    useEffect(()=> {
        fetch('/get_stores_all').then(
            response => response.json())
            .then
                (data => setInitialData(data))
    }, []);


    // useEffect(() => {

    //     if (Object.values(filters).every(a => a.length ===0)){
    //         setFiltered(initialData)
    //     }

    //     else if (filters.categories.length > 0 && filters.prices.length === 0) {
    //     const filterResults = initialData.filter(object => filters['categories'].some(key => object[key]));
    //     setFiltered(filterResults)
    //     } 
    //     else if (filters.prices.length > 0 && filters.categories.length === 0 ) {
    //         const filterResults = initialData.filter(object => filters['prices'].some(key => object[key]));
    //         setFiltered(filterResults)
    //     }
        
    //     else 
    //     if (filters.categories.length > 0 && filters.prices.length >0) 
    //     {
    
    //     const filterResults = initialData.filter(object => filters['categories'].some(key => object[key]) && filters['prices'].some(key => object[key]));
    //         setFiltered(filterResults)
    //     }

    //     else if (filters.cities.length>0){
    //         const filterResults = initialData.filter(object => {
    //             return filters.cities.includes(object.nearestLocation);
    //         }) 
    //         setFiltered(filterResults)
    //     }

    //     else 
    //     if (filters.categories.length > 0 && filters.prices.length >0 && filters.cities.length>0) 
    //     {
    
    //     const filterResults = initialData.filter(object => {return filters['categories'].some(key => object[key]) && filters['prices'].some(key => object[key]) && filters['cities'].includes(object.nearestLocation) 
    //         });
    //         setFiltered(filterResults)
    //     }
    
    // }, [filters, initialData]);


 useEffect(() => {

        if (Object.values(filters).every(a => a.length ===0)){
            setFiltered(initialData)
        }

        else {
        
        const step1 = initialData.filter((item) => filters.categories.every((key) => item[key]));
        const step2 = step1.filter((item) => filters.prices.every((key) => item[key]));
        const outcome = step2.filter((item) => filters.cities.every(value => (value) === (item.nearestLocation)));
        setFiltered(outcome)

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
        setFilters(newFilters)
        console.log(newFilters)
    }


return (

    <div className="shopPage">
        <div className="searchBoxes">
        <Navbar>
        <SearchCheckBox
            list = {categories}
            handleFilters={filters=> handleFilters(filters, "categories")}
            title = "categories"
        />
         <SearchCheckBox
            list = {prices}
            handleFilters={filters=> handleFilters(filters, "prices")}
            title = "prices"
        />
        <SearchCheckBox
            list = {cities}
            handleFilters={filters=> handleFilters(filters, "cities")}
            title = "cities"
        />
        </Navbar>
        </div>

        <div className='storeContainer'>

            {filtered.map((element, index) => 

                <div className='imgContainer'>
                    <div className='image'
                    style= {{ backgroundImage: `url(https://shopsmall-bucket.s3-us-west-1.amazonaws.com/${element.store_id}.png)`}}> 
                    </div>
                
             </div>
            )}
        </div>
    </div>   
    )
    }

export default Shop;