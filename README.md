# React-Redux training exercise
Contains a simple react-redux page, runs localy, no need for server.
Open index.html locally to start.

## Original Requirements

### Build a react application (using Redux)
1. The application will have a single input text box that will take in an alpha value between 1
and 10 characters long.
2. There will be a button which
+ will be disabled for invalid input values and
+ when clicked will call the following service end-points in the following way:
#### call 
> http://fubar.com/person/$input$
> pass the input value in place of $input$
> The service will respond with the following structure

> {
> "val1" : "",
> "val2" : ""
> }


#### call
> http://fubar.com/facility/$val1$
> pass in val1 from call to person as $val1$
> returns

> {
> "val3" : "",
> "val4" : ""
> }

#### call
>http://fubar.com/exposure/$val2$
>pass in val2 from call to person as $val2$
>returns

>{
>"val5" : ""
>}

3. Upon completion of this chain show an overlay that contains the result of multiplying val3 by val4.
4. You will need to provide your own mock implementation of the service end-points.
5. Feel free to style the page as nicely as you like.
