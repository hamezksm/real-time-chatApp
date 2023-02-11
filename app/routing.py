from django.urls import path, include,re_path
from app.consumers import ChatConsumer

#Here, "" is routing to the URL ChatConsumer which...
# will handle chat functionality

websocket_urlpatterns = [
    re_path("/",ChatConsumer.as_asgi()),
]