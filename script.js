'use strict';
// andom number of customers for a given range
function randomCustomers(minCookiesPerCustomer, maxCookiesPerCustomer) {
    return Math.floor(Math.random() * (maxCookiesPerCustomer - minCookiesPerCustomer +1) + minCookiesPerCustomer);
  }
  
  //  number of cookies sold per hour for a given store location
  function cookiesPerHour(storeLocation) {
    let cookiesPerHourArray = [];
    // There is a 14 hour work day
    for (let i = 6; i < 20; i++) {
      // generate a random number of customers for this hour
      let numCustomers = randomCustomers(storeLocation.minCookiesPerCustomer, storeLocation.maxCookiesPerCustomer);
  
      // number of cookies sold per customer for this location
      let cookiesPerCustomer = storeLocation.averageCookiesPerCustomer;
      // total number of cookies sold for this hour
      let cookiesPerHour = Math.round(numCustomers * cookiesPerCustomer);
      // The AM PM format
      let hour = i % 12 || 12;
      let timeOfDay = i < 12 ? "AM" : "PM";
      // add the number of cookies sold to the array for this location
      cookiesPerHourArray.push(`${hour}${timeOfDay}: ${cookiesPerHour} cookies`);
    }
    // return the array of cookies sold per hour for this location
    return cookiesPerHourArray;
  }
  
  
  // create an object for the Seattle store location
  const seattle = {
    minCookiesPerCustomer: "23",
    maxCookiesPerCustomer: "65",
    averageCookiesPerCustomer: "6.3",
    cookiesPerHour: [], 
  };
  
  // cookiesPerHour function for the Seattle store location and store the result in the cookiesPerHour property
  seattle.cookiesPerHour = cookiesPerHour(seattle);
  
  // print the Seattle object to the console
  console.log(seattle);
  
  const tokyo = {
    minCookiesPerCustomer: "3",
    maxCookiesPerCustomer: "24",
    averageCookiesPerCustomer: "1.2",
    cookiesPerHour: [], 
  };
  
  tokyo.cookiesPerHour = cookiesPerHour(tokyo);
  console.log(tokyo);
  
  const dubai = {
    minCookiesPerCustomer: "11",
    maxCookiesPerCustomer: "38",
    averageCookiesPerCustomer: "3.7",
    cookiesPerHour: [], 
  };
  
  dubai.cookiesPerHour = cookiesPerHour(dubai);
  console.log(dubai);
  
  const paris = {
    minCookiesPerCustomer: "20",
    maxCookiesPerCustomer: "38",
    averageCookiesPerCustomer: "2.3",
    cookiesPerHour: [], 
  };
  
  paris.cookiesPerHour = cookiesPerHour(paris);
  console.log(paris);
  
  const lima = {
    minCookiesPerCustomer: "2",
    maxCookiesPerCustomer: "16",
    averageCookiesPerCustomer: "4.6",
    cookiesPerHour: [],
  };
  lima.cookiesPerHour = cookiesPerHour(lima);
  console.log(lima);
  
let seattleElement = document.getElementById('seattle');
seattleElement.innerHTML = "<h2>Seattle</h2>" + "<ul>" + seattle.cookiesPerHour.map(hour => "<li>" + hour + "</li>").join("") + "</ul>";

let tokyoElement = document.getElementById('tokyo');
tokyoElement.innerHTML = "<h2>Tokyo</h2>" + "<ul>" + tokyo.cookiesPerHour.map(hour => "<li>" + hour + "</li>").join("") + "</ul>";

let dubaiElement = document.getElementById('dubai');
dubaiElement.innerHTML = "<h2>Dubai</h2>" + "<ul>" + dubai.cookiesPerHour.map(hour => "<li>" + hour + "</li>").join("") + "</ul>";

let parisElement = document.getElementById('paris');
parisElement.innerHTML = "<h2>Element</h2>" + "<ul>" + paris.cookiesPerHour.map(hour => "<li>" + hour + "</li>").join("") + "</ul>";

let limaElement = document.getElementById('lima');
limaElement.innerHTML = "<h2>Lima</h2>" + "<ul>" + lima.cookiesPerHour.map(hour => "<li>" + hour + "</li>").join("") + "</ul>";

  

 