'use strict';

// Create an array of Store objects to represent each location
// Each Store object is created with a name and specified min, max, and avg cookies per customer
const stores = [
    new Store('Seattle', 23, 65, 6.3),
    new Store('Tokyo', 3, 24, 1.2),
    new Store('Dubai', 11, 38, 3.7),
    new Store('Paris', 20, 38, 2.3),
    new Store('Lima', 2, 16, 4.6)
];

// Create an array of strings to represent each hour of the day and the total for the day
const hours = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "Total"];

// Define a function to generate a random number of customers based on a minimum and maximum value
function randomCustomers(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Define a constructor function for creating Store objects
// Each Store object is created with a name and specified min, max, and avg cookies per customer
function Store(name, minCookiesPerCustomer, maxCookiesPerCustomer, averageCookiesPerCustomer) {
    // Set the properties of the Store object based on the provided parameters
    this.name = name;
    this.minCookiesPerCustomer = minCookiesPerCustomer;
    this.maxCookiesPerCustomer = maxCookiesPerCustomer;
    this.averageCookiesPerCustomer = averageCookiesPerCustomer;
    this.cookiesPerHour = []; // An empty array to store the number of cookies sold each hour
    this.totalCookies = 0; // A property to store the total number of cookies sold for the day
}

// Define a method on the Store prototype to generate the number of cookies sold per hour
// The method uses the randomCustomers function to generate a random number of customers
// The number of cookies sold is calculated as the number of customers multiplied by the average cookies per customer
// The method logs a message to the console for each hour, indicating the number of cookies sold
Store.prototype.generateCookiesPerHour = function () {
    for (let i = 0; i < hours.length; i++) {
        const numCustomers = randomCustomers(this.minCookiesPerCustomer, this.maxCookiesPerCustomer);
        const cookiesPerHour = Math.round(numCustomers * this.averageCookiesPerCustomer);
        this.cookiesPerHour.push(cookiesPerHour);
        console.log(`At ${hours[i]}, ${this.name} sold ${cookiesPerHour} cookies.`);
    }
};

// Define a method on the Store prototype to calculate the total number of cookies sold for the day
// The method calls the generateCookiesPerHour method to generate the number of cookies sold per hour
// The total number of cookies sold is calculated as the sum of the number of cookies sold per hour
// The method logs a message to the console indicating the total number of cookies sold for the day
Store.prototype.calculateTotalCookies = function () {
    this.generateCookiesPerHour();
    this.totalCookies = this.cookiesPerHour.reduce((total, hour) => total + hour, 0);
    console.log(`${this.name} sold a total of ${this.totalCookies} cookies.`);
};

// Call the calculateTotalCookies method on each Store object in the stores array
stores.forEach(store => store.calculateTotalCookies());

// Table element
const table = document.createElement('table');
const headerRow = document.createElement('tr');
const locationHeader = document.createElement('th');

locationHeader.textContent = 'location';
headerRow.appendChild(locationHeader);

for (let i = 0; i < hours.length; i++) {
    const hourHeader = document.createElement('th');
    hourHeader.textContent = hours[i];
    headerRow.appendChild(hourHeader);
}

table.appendChild(headerRow);

for (let i = 0; i < stores.length; i++) {
    const store = stores[i];
    const row = document.createElement('tr');
    const locationCell = document.createElement('td');
    locationCell.textContent = store.name;
    row.appendChild(locationCell);
   
    for (let h = 0; h < hours.length; h++) {
        const hourCell = document.createElement('td');
        hourCell.textContent = store.cookiesPerHour[h];
        row.appendChild(hourCell);
    }
    table.appendChild(row);
}

const footerRow = document.createElement('tr');
const totalCell = document.createElement('td');
totalCell.textContent = 'Totals';
footerRow.appendChild(totalCell);

const hourlyTotals = new Array(hours.length).fill(0);

for (let i = 0; i < stores.length; i++) {
    const store = stores[i];
    for (let h = 0; h < hours.length; h++) {
        hourlyTotals[h] += store.cookiesPerHour[h];
    }
}

for (let h = 0; h < hours.length; h++) {
    const hourCell = document.createElement('td');
    hourCell.textContent = hourlyTotals[h];
    footerRow.appendChild(hourCell);
}

table.appendChild(footerRow);

document.body.appendChild(table);

// End table element
// End table element
const dailyTable = document.getElementById('daily-table');

// Add the header row to the table
const dailyHeaderRow = document.createElement('tr');
const dailyLocationHeader = document.createElement('th');
dailyLocationHeader.textContent = 'Location';
dailyHeaderRow.appendChild(dailyLocationHeader);

const dailyCookiesHeader = document.createElement('th');
dailyCookiesHeader.textContent = 'Daily Cookies Sold';
dailyHeaderRow.appendChild(dailyCookiesHeader);

dailyTable.appendChild(dailyHeaderRow);

// Add a row for each store to the table body
const dailyTableBody = document.createElement('tbody');
dailyTable.appendChild(dailyTableBody);

for (let i = 0; i < stores.length; i++) {
    const store = stores[i];
    const row = document.createElement('tr');
    const locationCell = document.createElement('td');
    locationCell.textContent = store.name;
    row.appendChild(locationCell);

    const totalCookiesCell = document.createElement('td');
    totalCookiesCell.textContent = store.totalCookies;
    row.appendChild(totalCookiesCell);

    dailyTableBody.appendChild(row);
}
