# React-Redux training exercise
Contains a simple react-redux page, runs locally, no need for server.

####  Open *index.html* locally to start.

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
```
 {
   "val1" : "",
   "val2" : ""
 }
```

#### call
> http://fubar.com/facility/$val1$
> pass in val1 from call to person as $val1$
> returns
```
 {
  "val3" : "",
  "val4" : ""
 }
```
#### call
>http://fubar.com/exposure/$val2$
>pass in val2 from call to person as $val2$
>returns
```
 {
  "val5" : ""
 }
```
3. Upon completion of this chain show an overlay that contains the result of multiplying val3 by val4.
4. You will need to provide your own mock implementation of the service end-points.
5. Feel free to style the page as nicely as you like.

## Comments on Solution and lessons learned
Wrote the code using babel syntax and learned that babel takes issue with recompiling .js files with some browsers. Had to recompile *ReactTraining.js* into **ReactTraining2.js** by babel before uploading, which is used instead of both *babel.js* and *ReactTraining.js*.
The original *ReactTraining.js* is also included and commented out in the **index.html**. It's possible to switch back to using it,
but not all browsers suport running babel.js locally. Firefox does.

Had to mock up backend responses for this one, used https://getsandbox.com/
+ http://temppatientdata.getsandbox.com/person/{name}
+ http://temppatientdata.getsandbox.com/facility/{name}
+ http://temppatientdata.getsandbox.com/exposure/{name}

The code for backend side is simple, and should be downloadable from getsandbox git:
https://git.getsandbox.com/temppatientdata.git

I'll add the folder **getsandbox** to include this code, too.

As per requirements, the index.html loads up a simplistic page with one field and button:
![alt text](https://i.imgur.com/GmLbir7.png "button is disabled")
+ If the field contains between 1 and 10 alphabetical characters, the button is enabled.
![alt text](https://i.imgur.com/cqxcOB3.png "button is enabled")
+ Upon button press, the calls begin (the input field is cleared and the button is disabled again).
+ The final outcome of the calls is logged into console, and then the overlay appears, containing only multiplied result of val3 * val4 appears. In this mocked case, it's always 1110 * 0.7, ending up in 777.


