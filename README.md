
# Medical Assistant Chatbot

The medical assistant bot is a personal assitant which helps users identify their medical problem. Based on your responses and symptoms provided, the bot recommends the user a specialist or a generalist doctor. It takes into account the user location and medical history or any other details previously provided.

## Use of PubNub ChatEngine:
PubNub chat-engine is a layer on top of the core pubnub publish/subscribe. It allows creating a chat-client very seamless. The additional features are integration with PubNub presence features such as identifying if the user is online and indicating if the user is typing. All these features alone require a good amount of plumbing but with ChatEngine this becomes much simpler.

In this demo, you can see the online presence feature, where it provides an indication if the user is online or offline.


## Use of PubNub Storage and Playback:
The medical bot needs training data that can be collected from user interactions that happened in the chats. On top of that if a medical bot wants to provide personalization and needs to store user metadata, PubNub storage and playback features come in handy.
It is a history API to store messages and retrieve them later for analytics, machine learning, training of models, etc.


## Use of PubNub Functions:
Function as a service, that allows you to program the PubNub data stream network and build your own micro-services or webhooks. The chatbot is a separate application or micro-service that processes user conversation and replies back with a message. The service can be much complex and it can communicate with other services (such as machine learning models) and have rule-engine on top.


## Use of PubNub Access Manager:
The users of the medical chatbot trust and rely on the service. They trust that the data will not be shared or sold and cannot be hacked. For the messages to be secure, you need authentication and encryption to avoid man-in-the-middle attacks. 
PubNub provides security framework for secure access channels.


## Use of PubNub Blocks and BetterDoctor:
The medical chatbot is not a stand-alone service that does it all. It needs other services to cater to the users. Why re-invent the wheel? When the chatbot has collected enough symptoms from the user, it can decide what kind of a doctor should be recommended. The plug-in or a service that is BetterDoctor can be seamlessly integrated with PubNub ChatEngine model using Blocks. Blocks are services that can be communicated from ChatEngine through PubNub Functions.

The API reference for better-doctor can be found below.
https://developer.betterdoctor.com/code-samples

