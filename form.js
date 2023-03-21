
    function Store(minCookiesPerCustomer, maxCookiesPerCustomer, averageCookiesPerCustomer, name) {
      // Properties for a Store object
      this.minCookiesPerCustomer = minCookiesPerCustomer;
      this.maxCookiesPerCustomer = maxCookiesPerCustomer;
      this.averageCookiesPerCustomer = averageCookiesPerCustomer;
      this.name = name;
      // Call cookiesPerHour function and store the result
      this.cookiesPerHour = cookiesPerHour(this);
      // Call calculateTotalCookies function and store the result
      this.totalCookies = this.calculateTotalCookies();
    }
    
    // Calculates the total number of cookies sold for a given store location
    Store.prototype.calculateTotalCookies = function() {
      // Initialize the total number of cookies sold
      let totalCookies = 0;
    
      // Iterate through the cookiesPerHour array and sum up the number of cookies sold
      this.cookiesPerHour.forEach(hourlyData => {
        const cookiesSold = parseInt(hourlyData.split(':')[1].trim().split(' ')[0]);
        totalCookies += cookiesSold;
      });
    
      // Return the total number of cookies sold for this location
      return totalCookies;
    }
    
    // Function that generates a random number of customers for a given range
    function randomCustomers(min, max) {
      // Returns a random integer between min and max
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    // Function that calculates the number of cookies sold per hour for a given store location
    function cookiesPerHour(store) {
      // An empty array to store hourly cookie sales data
      const cookiesPerHourArray = [];
      // Iterate over a 14 hour work day
      for (let i = 6; i < 20; i++) {
        // Generate a random number of customers for this hour
        const numCustomers = randomCustomers(store.minCookiesPerCustomer, store.maxCookiesPerCustomer);
        // Number of cookies sold per customer for this location
        const cookiesPerCustomer = store.averageCookiesPerCustomer;
        // Total number of cookies sold for this hour
        const cookiesPerHour = Math.round(numCustomers * cookiesPerCustomer);
        // Convert 24-hour time to 12-hour time format
        const hour = i % 12 || 12;
        // Determine if it's AM or PM
        const timeOfDay = i < 12 ? "AM" : "PM";
        // Add the number of cookies sold to the array for this location
        cookiesPerHourArray.push(`${hour}${timeOfDay}: ${cookiesPerHour} cookies`);
      }
      // Return the array of cookies sold per hour for this location
      return cookiesPerHourArray;
    }
    
    // Create an array of Store objects
    const stores = [  new Store(23, 65, 6.3, 'Seattle'),  new Store(3, 24, 1.2, 'Tokyo'),  new Store(11, 38, 3.7, 'Dubai'),  new Store(20, 38, 2.3, 'Paris'),  new Store(2, 16, 4.6, 'Lima')];
    
    // Initialize the hourly totals array to all zeros
    const hourlyTotals = new Array(14).fill(0);
    
    // Calculate the total cookies sold for all stores
    let totalCookiesAllStores = 0;
    for (let i = 0; i < stores.length; i++) {
      totalCookiesAllStores += stores[i].totalCookies;
    }
    
    function renderTable() {
      // Create the table header row with column labels
      const tableHeader = "<tr><th>City</th><th>6AM</th><th>7AM</th><th>8AM</th><th>9AM</th><th>10AM</th><th>11AM</th><th>12PM</th><th>1PM</th><th>2PM</th><th>3PM</th><th>4PM</th><th>5PM</th><th>6PM</th><th>7PM</th><th>Daily<br>Total</th></tr>";
    
      // Create the table body rows using forEach
      const tableBody = [];
      stores.forEach(store => {
        // Get the cookiesPerHour array for this store
        const cookiesPerHour = store.cookiesPerHour;
        // Initialize the total number of cookies sold for this store
        let totalCookies = 0;
        // Create a row for this store
        let row = "<tr>";
        row += `<td class="store-name">${store.name}</td>`;
        cookiesPerHour.forEach(hour => {
          // Extract the number of cookies sold from the hour string
          const cookiesSold = parseInt(hour.split(':')[1].trim().split(' ')[0]);
          // Add the number of cookies sold to the total for this store
          totalCookies += cookiesSold;
          // Add a cell with the number of cookies sold to the row
          row += `<td class="cookies-sold">${cookiesSold}</td>`;
        });
        row += `<td class="total-cookies bold">${totalCookies}</td></tr>`;
        tableBody.push(row);
      });
    
      // Create the table footer row with hourly and daily totals
      stores.forEach(store => {
        store.cookiesPerHour.forEach((hour, i) => {
          const cookiesSold = parseInt(hour.split(':')[1].trim().split(' ')[0]);
          hourlyTotals[i] += cookiesSold;
        });
      });
      const totalCookiesAllStores = stores.reduce((total, store) => total + store.totalCookies, 0);
      const tableFooter = "<tr><td><strong>Hourly Totals</strong></td>" + 
                          hourlyTotals.map(total => `<td><strong>${total}</strong></td>`).join('') + 
                          `<td><strong>${totalCookiesAllStores}</strong></td></tr>`;
    
      // Create the table by combining the header, body, and footer rows
      const table = `<table style="border-collapse: collapse; border-spacing: 0; width: 100%; border: 1px solid #ddd;">${tableHeader}${tableBody.join('')}${tableFooter}</table>`;
    
      // Insert the table into the HTML document
      document.getElementById('table').innerHTML = table;
    }
    
   
    renderTable();
    
   // Add event listener to form submit button
   document.getElementById('new-store-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Get input values from form
    const location = document.getElementById('location').value;
    const minCookies = parseInt(document.getElementById('min-cookies').value);
    const maxCookies = parseInt(document.getElementById('max-cookies').value);
    const avgCookies = parseFloat(document.getElementById('avg-cookies').value);
    // Create a new Store object with input values
    const newStore = new Store(minCookies, maxCookies, avgCookies, location);
    // Push new Store object to stores array
    stores.push(newStore);
    // Reset hourlyTotals to all zeros
    hourlyTotals.fill(0);
    // Update daily table with new store data
    renderTable();
  });
  

    