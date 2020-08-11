import React from "react";

import Checkbox from "../checkbox/checkbox.component";


import './form-joinus.styles.scss';

const CATEGORIES= ["women", "men", "unisex", "kids", "home", "self-care & wellness",
"beauty", "jewelry", "shoes", "masks", "accessories", "undergarments", "vintage", "fair-trade", "eco-friendly", "sustainable"];

const PRICERANGES = ["$ - $0-50", "$$ - $50-100", "$$$ - $100-150", "$$$$ - $150+"]

class JoinUs extends React.Component {
    constructor(props){
        super(props);

        this.state={
            ownerName:"",
            email:"",
            shopName:"",
            website:"",
            nearestLocation:"",
            msgFromOwner:"",
            categories: CATEGORIES.reduce(
                (categories, category) => ({...categories, [category]: false}),
                {}),

            prices: PRICERANGES.reduce(
                    (prices, price) => ({...prices, [price]: false}),
                    {})
            }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSelectPrices = this.handleSelectPrices.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state);
    }

    handleSelect(event) {
        const {name} = event.target;
        this.setState(prevState => ({
          categories:{
            ...prevState.categories,
            [name]: !prevState.categories[name]
          }
        }));
      }

      handleSelectPrices(event) {
        const {name} = event.target;
        this.setState(prevState => ({
          prices:{
            ...prevState.prices,
            [name]: !prevState.prices[name]
          }
        }));
      }


      createCheckbox = option => (
          <Checkbox 
            label={option}
            isSelected={this.state.categories[option]}
            onCheckboxChange = {this.handleSelect}
            key={option}
            />
      );

      createCheckboxPrices = option => (
        <Checkbox 
          label={option}
          isSelected={this.state.prices[option]}
          onCheckboxChange = {this.handleSelectPrices}
          key={option}
          />
    );

      createCheckboxes = () => CATEGORIES.map(this.createCheckbox);
    
      createCheckboxesPrices = () => PRICERANGES.map(this.createCheckboxPrices);

    render(){
        return(
          <div className='join-us'>
             <form onSubmit={this.handleSubmit}>
                 <h1>Have a shop? Join Us!</h1>
                 <label>
                    Owner Name
                </label>
                <input
                    type="text"
                    value={this.state.ownerName}
                    onChange={this.handleChange}
                    name="ownerName"
                    required
                    />
            
                <br></br>
                <label>
                    Email
                </label>
                    <input
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        name="email"
                        required
                    />
                <br></br>
                <label>
                    Shop Name
                </label>
                <input
                    type="text"
                    value={this.state.shopName}
                    onChange={this.handleChange}
                    name= "shopName"
                    required
                   />
                
                <br></br>

                <label>
                    Website
                </label>
                   <input
                    type="text"
                    value={this.state.website}
                    onChange={this.handleChange}
                    name="website"
                    required
                   />
                <br></br>

                <label>
                    Nearest Location
                    </label>
                <select value= {this.state.nearestLocation} onChange={this.handleChange} name="nearestLocation" required>
                    <option value="" disabled selected>Select nearest location</option>
                    <option value="austin">Austin, TX</option>
                    <option value="brooklyn">Brooklyn, NY</option>
                    <option value="los-angeles">Los Angeles, CA</option>
                    <option value="new-york">New York, NY</option>
                    <option value="portland">Portland, OR</option>
                    <option value="san-fran">San Francisco, CA</option>
                    <option value="seattle">Seattle, WA</option>
                    <option value="other">Other</option>
                </select>
                <br></br>
                <label>
                    [OPTIONAL] Message from owner 
                    </label>
                    <textarea
                    value={this.state.msgFromOwner}
                    name="msgFromOwner"
                    placeholder="i.e. a mission statement or what your shop is all about"
                    maxLength="150"
                    onChange={this.handleChange}
                    />
                <br></br>
                <label>
                    Product Categories  
                    </label>
                    <span> select all that applies </span>
                {this.createCheckboxes()}
                <br></br>
                <label>
                    Price Ranges  
                    </label>
                    <span> select all that applies </span>
                {this.createCheckboxesPrices()}
                <br></br>
                <input type="submit" value="Submit"/>
            
             </form>     

            </div>
        );
    }
}


export default JoinUs;
