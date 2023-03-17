'use strict';

const stores = [
    new Store('Seattle', 23, 65, 6.3),
    new Store('Tokyo', 3, 24, 1.2),
    new Store('Dubai', 11, 38, 3.7),
    new Store('Paris', 20, 38, 2.3),
    new Store('Lima', 2, 16, 4.6)
];

const hours = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "Total"];

function randomCustomers(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Store(name, minCookiesPerCustomer, maxCookiesPerCustomer, averageCookiesPerCustomer) {
    this.name = name;
    this.minCookiesPerCustomer = minCookiesPerCustomer;
    this.maxCookiesPerCustomer = maxCookiesPerCustomer;
    this.averageCookiesPerCustomer = averageCookiesPerCustomer;
    this.cookiesPerHour = [];
    this.totalCookies = 0;
}

Store.prototype.generateCookiesPerHour = function () {
    for (let i = 0; i < hours.length; i++) {
        const numCustomers = randomCustomers(this.minCookiesPerCustomer, this.maxCookiesPerCustomer);
        const cookiesPerHour = Math.round(numCustomers * this.averageCookiesPerCustomer);
        this.cookiesPerHour.push(cookiesPerHour);
    }
};

Store.prototype.calculateTotalCookies = function () {
    this.generateCookiesPerHour();
    this.totalCookies = this.cookiesPerHour.reduce((total, hour) => total + hour, 0);
};

stores.forEach(store => store.calculateTotalCookies());

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

const dailyTable = document.getElementById('daily-table');
const dailyHeaderRow = document.createElement('tr');
const dailyLocationHeader = document.createElement('th');

dailyLocationHeader.textContent = 'location';
dailyHeaderRow.appendChild(dailyLocationHeader);

const totalHeader = document.createElement('th');
totalHeader.textContent = 'Total';
dailyHeaderRow.appendChild(totalHeader);

dailyTable.appendChild(dailyHeaderRow);

for (let i = 0; i < stores.length; i++) {
    const store = stores[i];
    const row = document.createElement('tr');
    const locationCell = document.createElement('td');
    locationCell.textContent = store.name;
    row.appendChild(locationCell);

    const totalCell = document.createElement('td');
    totalCell.textContent = store.totalCookies;
    row.appendChild(totalCell);

    dailyTable.appendChild(row);
}

const dailyFooterRow = document.createElement('tr');
const grandTotalCell = document.createElement('td');
grandTotalCell.textContent = 'Grand Total';
dailyFooterRow.appendChild(grandTotalCell);

const grandTotal = hourlyTotals.reduce((total, hour) => total + hour, 0);
const grandTotalValueCell = document.createElement('td');
grandTotalValueCell.textContent = grandTotal;
dailyFooterRow.appendChild(grandTotalValueCell);

dailyTable.appendChild(dailyFooterRow);

// Add hourly sales data to the table
const hourlyHeaderRow = document.createElement('tr');
const hourlyLocationHeader = document.createElement('th');
hourlyLocationHeader.textContent = 'Hourly Sales';
hourlyHeaderRow.appendChild(hourlyLocationHeader);

for (let i = 0; i < hours.length; i++) {
    const hourHeader = document.createElement('th');
    hourHeader.textContent = hours[i];
    hourlyHeaderRow.appendChild(hourHeader);
}

dailyTable.appendChild(hourlyHeaderRow);

for (let i = 0; i < stores.length; i++) {
    const store = stores[i];
    const row = document.createElement('tr');
    const locationCell = document.createElement('td');
    locationCell.textContent = store.name;
    row.appendChild(locationCell);

    for (let j = 0; j < store.hourlySales.length; j++) {
        const hourlySalesCell = document.createElement('td');
        hourlySalesCell.textContent = store.hourlySales[j];
        row.appendChild(hourlySalesCell);
    }

    dailyTable.appendChild(row);
}
