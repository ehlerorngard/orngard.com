// This express server exists solely to serve up static assets,
// particularly the index.html file in the case of direct
// navigation to something other than the root ("/") relative path
// (an issue with client-side pathing like in react-router's BrowserRouter)

const express = require("express");
const path = require("path");

const app = express();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, 'build')));
}
else {
	app.use(express.static(path.join(__dirname, 'public')));
}

app.get('*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
	console.log(`Server running on port ${PORT} :) `);
});

