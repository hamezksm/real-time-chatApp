import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
#create, destroy and do a few more other things in a websocket


    async def connect (self): #connects and accepts connection 
        # self.roomGroupName = "group_chat_gfg"
        # await self.channel_layer.group_add(
        #     self.roomGroupName, #create group name
        #     self.channel_name
        # ) #add group name to channel layer group
        await self.accept()

    async def disconnect(self, close_code):
        # await self.channel_layer.group_discard(
        #     self.roomGroupName,
        #     self.channel_layer
        pass
        # ) #removes instance form the channel layer group
    

    #function is triggered when we send data from the websocket, ...
    # takes in the message and in json form and spreads it to other...
    # instances which are active in the group
    #internally has group_send() function; 1st arguement->roomGroupName; 2nd arguement -> dictionary
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        username = text_data_json["username"]
        await self.channel_layer.group_send(
            self.roomGroupName, {
                "type" : "sendMessage",
                "message" : message,
                "username" : username,
            }
        )

# takes the instance which is the sending of data and event
# event- holds data which was sent by group_send() method of the receive() function
    async def sendMessage(self, event):
        message = event["message"]
        username = event["username"]
        await self.send(text_data=json.dumps({
            "message" : message,
            "username" : username
        }))