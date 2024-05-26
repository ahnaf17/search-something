### Task 1

### Run the following commands to start the project
- `npm install`
- `npm start`

### Run the tests
- `npm test`

### Things I have added additionally
- Introduced pattern for everything to achieve clean/maintainable code and allow easy scalability. I haven't seen use of redux for the current requirements, so didn't setup it up.
- Support for different screen sizes.
- Added timeout on API calls in case the server takes too long to respond.
- Loading and error handling on API call.
- Minimum 3 characters search to reduce size of database query and allow faster search.

### Some suggestion for future improvements
- Some kinda cache can be introduced to optimize search and prevent excessive API calls.
- Add pagination on seach results. Data can be requested in chucks as user scroll down the search results.


### Task 2

The test cases as follows:

## App component

1. Renders title correctly.
- check if "Shop the Collection" is displayed on the screen

## Carousel component   

1. Fetches data successfully and carousel renders correctly. 
- mock the api call to return mock data
- check if the mock data is displayed on the screen correctly

2. Displays error message on API fetch failure.
- mock the api call to return a rejected response 
- check for error message based on how the error is handled during implementation

3. Displays loading indicator while fetching data.
- mock the api call to return a response with a delay
- check if the loading spinner is present on the screen.

4. Carousel navigation to the left works correctly.
- trigger a click on the left buttom
- check if the screen has new set of products displayed

4. Carousel navigation to the right works correctly.
- trigger a click on the right buttom 
- check if the screen has new set of products displayed

5. Carousel displays four products at a time.
- check if the products displayed on the Carousel is of lengh four.

6. Carousel does not navigate when the total product count is less or equal to four.
- mock data with 2 products
- left and right button of the Carousel shouldn't be displayed.

## Product component

1. Product displays correct data
- pass image, title, price info in the mock data
- check if the corresponding data are displayed on the screen in correct format.

2. Product can be marked as favourite
- Assuming the element representing the "heart" is a clickable image, check if that image is present on the screen.
- trigger a click and check if the image that represents liked product (for example, red heart) is displayed. If this action involves an api call during implementation, api needs to be mocked.

3. Display discount text for discounted products
- pass discount info in the mock data 
- check if "GET $10AUD OFF" is present on the screen

4. No discount text displayed for non-discounted products
- pass empty discount info in the mock data 
- discount text shouldn't be displayed on the screen

5. Favourited/Liked product is marked with red heart
- pass favourite info in the mock data 
- check if the image representing the "favourited heart" is present - assuming the element representing the "favourited heart" is an image. 

6. Displays available colors of a product
- pass two available colors in the mock data
- check if the elements representing available colors are displayed on the screen 
- check if the elements representing available colors is of length two.

7. Truncates when more than three colours are available for a product
- pass five available colors in the mock data
- check if the elements representing available colours is of length three
- check if "+2 more" is displayed on the screen

8. No colour info displayed when the product comes in single color.
- pass one available color in the mock data
- the elements representing the available colors shouldn't be displayed.

