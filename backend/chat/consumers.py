import json
from channels.generic.websocket import AsyncWebsocketConsumer

class RoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = f"watchparty_{self.room_id}"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        if 'msg' in data:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat.message',
                    'message': data['msg']
                }
            )
        elif 'action' in data:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': f"video.{data['action']}"
                }
            )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'chat': event['message']
        }))

    async def video_play(self, event):
        await self.send(text_data=json.dumps({'action': 'play'}))

    async def video_pause(self, event):
        await self.send(text_data=json.dumps({'action': 'pause'}))
