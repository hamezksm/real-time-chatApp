"""
ASGI config for chatapp project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chatapp.settings')

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from app import routing

application = ProtocolTypeRouter(
    {
        "http" : get_asgi_application(), # Deals with the synchronous part of the program
        "websocket" : AuthMiddlewareStack(
            URLRouter(
                routing.websocket_urlpatterns 
            )# Authenticates routes and instances for the Authentication and URLRouter routes the ws
        )# This deal with the asynchronous part of the program
    }
)# Creates different types of protocols used in the application
