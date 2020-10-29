# shop small
An interactive small business catalog with responsive design - come check it out: https://www.shop-small.xyz

## I Made This To Learn
This website has been created to combine my knowledge of Flask and my knowledge of React into an in-depth, full-stack learning opportunity.

## Demo
![](https://media.giphy.com/media/WTFKI0i90mU8pTUsi9/giphy.gif)

![](https://media.giphy.com/media/2ZpQWgjvmCfeg1aV0r/giphy.gif)

## Website Mission
- Preserve & boost small businesses
- Support local communities
- Re-imagine the way we shop, question the way we consume
- Connect customers to the finest, curated shops

## Business Requirements
1. When a store owner submits the form, ability to save form data to database
2. Ability to notify admin via email when a form has been submitted
3. Ability to enter admin credentials for backend routes to approve or decline requests
4. When admin approves a store, ability to call screenshot machine api to capture the homepage of the store's website
5. Ability to save the screenshot image to AWS S3; ability to confirm that the image has been saved to S3, then remove the screenshot file from the static directory
6. Ability for shoppers/users to use search facets on the shop page to narrow down on selections

## Testing
- Flask - unittest
- React - Jest + Enzyme

## How It's Made
### Backend
Flask Framework with PostgreSQL database

- Flask-Cors: handles Cross Origin Resource Sharing between Flask and React
- Flask-SQLAlchemy: database models
- flask-serialize: json serialization to send approved store data to React
- Flask-Mail: allows email functionality
- Flask-BasicAuth: protects backend views with prompt for admin credentials
- urllib3: allows request to screenshot machine

### Frontend
React Framework

### Deployment
- App deployed on Heroku
