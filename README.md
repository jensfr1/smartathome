# smartathome
Actually I wanted to create a blog, but I dont have time.<br />
On smartathome I will collect my ideas around KNX and integration with other smarthome solutions like iobroker, openhab and especially Node-Red. I will show you how to potentially save a lot of money using opensource technologys. I am not a coder, i am a consultant, so please be patient. <br/>
Stay tuned!

## You need...
* Raspberry Pi or any other device. 
* Node-Red
* Openhab
* iobroker


### KNX to AnyDevice
Example to switch any device connected to Node-Red with a KNX Sesnor like the MDT Glastaster 2
Node-Red Flow: <br />
https://github.com/jensfr1/smartathome/blob/master/knx_externalswitch.js



### AnyDevice to KNX
Example on how to switch a KNX actor with any Device which can be connected to Node-Red. This examples shows a Xiomi Mi switch to control an KNX Actor. <br />
https://github.com/jensfr1/smartathome/blob/master/mi_knx.js

### Alexa and KNX
Example flow to switch any KNX device with Alexa.<br />
https://github.com/jensfr1/smartathome/blob/master/mi_knx.js


<br />
<br />
<br />
These are all proof of concepts. I am sure some developments can be done better. Please raise an issue for questions, suggestions ore any comments. 
