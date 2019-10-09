# Baseball Web Application
Basic frontend web app created for an interview assignment. This project assumes npm is already installed as per instructions.

# Initializing Application
## Step 1 - Extracting Project
* Click on "Clone or download" button from the repository page and select "Download ZIP".
* Navigate to the ZIP location and extract the contents to the location of your choice. This will be your `installation directory`.

## Step 2 - Installing http-server Package
Install http-server package if it is not already installed. The current version (0.10.0) seems to throw errors on Windows machines so we will use version 0.9.0 instead.

The -g flag will install it globally so that it can be accessed from any directory.

    npm install -g http-server@0.9.0

## Step 3 - Starting the Web Server
Now that the http-server package is installed, navigate to the `installation directory` using the terminal of your choice. By default the site directory will be named "Baseball-master".

* To ensure you are in the correct location, check the directory to confirm the presence of an `index.html` file. This can be done with `ls` on Linux or `dir` on Windows.

We should be all set to start the web server with the following simple command:

    http-server

## Step 4 - Accessing the Wep Application
The terminal will list the available URLs for use in accessing the application. Open a web browser and enter one of these URLs into the address bar. 

Alternatively, the site should be accessible by entering the default of `localhost:8080` in the address bar.