*Market Partner Pages*
---
About
---
This is a tool that enables ops to add and remove market partners and other referral contacts to the database with ease.
This project is used in conjunction with [referral-chat](https://gitlab.com/Homigo/referral-chat).

Testing
---
To start the app on local environment, run:
```
npm start
```
The app will run on `localhost:3007`

Basic Auth in effect
---
Username `setter`

Password  `ziggy2020`

~~The react app will point to https://staging.api.setter.com/ once build
Update .env~~


.env controls the build path of the api
for example the default is set to localhost to update for production use
`REACT_APP_API_ORIGIN='https://staging.api.setter.com'`
---


This is hosted on the VM `html-server` to access quickly use 
`gcloud compute --project "beaming-night-139614" ssh --zone "us-east1-d" "html-server"`
---


The built files are served by caddy from `/var/www/market-partner-pages/build`