const { httpGet } = require('./mock-http-interface');

// Note: Edge cases (empty arrays, null inputs, malformed URLs) are not handled
// as per README instruction: "Keep your solution as simple as possible, input validation for get-arnie-quotes() is not required."

const getArnieQuotes = async (urls) => {
  // Create an array of promises for all HTTP requests
  const promises = urls.map(async (url) => {
    try {
      // Execute HTTP GET for each URL
      const response = await httpGet(url);
      
      // Parse the JSON response body to get the message
      const { message } = JSON.parse(response.body);
      
      // Check status code and create appropriate result object
      if (response.status === 200) {
        return { 'Arnie Quote': message };
      } else {
        return { 'FAILURE': message };
      }
    } catch (error) {
      // Handle any unexpected errors
      return { 'FAILURE': error.message };
    }
  });
  
  // Wait for all requests to complete and return results
  const results = await Promise.all(promises);
  return results;
};

module.exports = {
  getArnieQuotes,
};
