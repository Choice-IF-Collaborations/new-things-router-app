# New Things Router App

## What is this?
This Node.js app is a prototype for an application that can run on the CHOICE New Things Team prototype router.

It is intended to explore what data points should be made accessible on the New Things router platform, and to respond to user research by IF into how people can better understand their home network.

## What does it do?
Right now, it contains:

* A functioning front-end that presents information around Internet performance and what's connected in the home.

* A Python script that runs in the background that pipes live data into the front-end.

* A SQLite database logs Internet connection test speeds.

The code in this repository is intended to be further developed to enable actual performance data to be used.

## How do I install it?

1. In Terminal, clone this repository using `git pull` and `cd` into it.

2. Install Node.js dependencies using `npm install`.

3. Create a new blank logging database by using `cp log.db.empty log.db`

4. Compile the SASS stylesheets by running `npm run watch`. In development, keep this script running to update the stylesheets as changes are made. In production, close the script using `CTRL + C`.

5. Run the Node.js app using `node index.js`.

6. In another Terminal window, run `python app.py` to start the background daemon.

7. The interface can be accessed at `http://localhost:3000`.

## Data

### What data points does this need access to?

* Advertised upload speed
* Actual upload speed
* Advertised download speed
* Actual download speed
* Devices currently connected to the network (MAC address, name, type of device)
* Line quality
* ISP name
* ISP contact phone number
* Router username and password
* Maximum router bandwidth
* Bandwidth used by each device
* Internet connection uptime

### What data points does this need to store?

* History of internet connection speeds
* History of connected devices, including when they are connected and how long
* History of broadband connections and disconnections
