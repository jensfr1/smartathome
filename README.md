**These are all proof of concepts. I am sure some developments can be done better. Please raise an issue for questions, suggestions ore any comments.**

# smartathome
Actually I wanted to create a blog, but I dont have time right now. I might migrate that stuff later.<br />
On smartathome I will collect my ideas around **KNX** and integration with other smarthome solutions like iobroker, openhab and especially Node-Red. I will show you how to potentially save a lot of money using opensource technologys. I am not a coder, i am a consultant, so please be patient. <br/>
Stay tuned!

## You need...
* Raspberry Pi or any other device which can run Node-Red, Iobroker and Openhab.
* Node-Red and some nodes for KNX and Alexa (KNX Easy and Alexa Local)
* Openhab is the easy way to integrate Google Home
* iobroker as the connector and powerfull engine in between

## Node-Red Flows
### KNX to AnyDevice
Example to switch any device connected to Node-Red with a KNX Sesnor like the MDT Glastaster 2. In thise proof of concept I am switch a Sheely device with the MDT Glastaster. <br />
Node-Red Flow: <br />
https://github.com/jensfr1/smartathome/blob/master/knx_externalswitch.js



### AnyDevice to KNX
Example on how to switch a KNX actor with any Device which can be connected to Node-Red. This examples shows a Xiomi Mi switch to control an KNX Actor. <br /> Node-Red Flow: <br />
https://github.com/jensfr1/smartathome/blob/master/mi_knx.js

### Alexa and KNX
Example flow to switch any KNX device with Alexa.<br />Node-Red Flow: <br />
https://github.com/jensfr1/smartathome/blob/master/mi_knx.js

## Openhab Examples
### Setup Google Home (Nest Home Hub) Integration for KNX Devices


