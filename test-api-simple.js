const http = require('http');

const data = JSON.stringify({
  url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
});

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/download/info',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response completed');
    try {
      const parsedData = JSON.parse(responseData);
      console.log('Response data:', JSON.stringify(parsedData, null, 2));
    } catch (e) {
      console.error('Error parsing response:', e.message);
      console.log('Raw response:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('Error making request:', error.message);
});

req.write(data);
req.end();

console.log('Request sent');
