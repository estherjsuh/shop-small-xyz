import React from "react";

import Checkbox from "../checkbox/checkbox.component";

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


      createCheckbox = option => (
          <Checkbox 
            label={option}
            isSelected={this.state.categories[option]}
            onCheckboxChange = {this.handleSelect}
            key={option}
            />
      );

      createCheckboxes = () => CATEGORIES.map(this.createCheckbox);
    


    render(){
        return(
          <>
             <form onSubmit={this.handleSubmit}>
                 <h1>Join Us!</h1>
                 <label>
                    Owner Name
                <input
                    type="text"
                    value={this.state.ownerName}
                    onChange={this.handleChange}
                    name="ownerName"
                    required
                    />
                </label>

                <br></br>
                <label>
                    Email
                    <input
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        name="email"
                        required
                    />
                </label>
                <br></br>
                <label>
                    Shop Name
                <input
                    type="text"
                    value={this.state.shopName}
                    onChange={this.handleChange}
                    name= "shopName"
                    required
                   />
                </label>
                <br></br>

                <label>
                    Website
                   <input
                    type="text"
                    value={this.state.website}
                    onChange={this.handleChange}
                    name="website"
                    required
                   />
                </label>
                <br></br>

                <label>
                    Nearest Location
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
                </label>
                <br></br>
                <label>
                    [OPTIONAL] Message from owner 
                    <textarea
                    value={this.state.msgFromOwner}
                    name="msgFromOwner"
                    placeHolder="i.e. a mission statement or what your shop is all about"
                    maxLength="150"
                    onChange={this.handleChange}
                    />
                </label>
                <br></br>
                <label>
                    Product Categories
                {this.createCheckboxes()}
                </label>

                <input type="submit" value="Submit"/>
            
             </form>     
            </>
        );
    }
}


export default JoinUs;
