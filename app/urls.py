from django.urls import path, include
from app import views as chat_views
from django.contrib.auth.views import LoginView, LogoutView

#Create your urls here

urlpatterns = [
    path('', chat_views.chatPage, name="chat-page"),

    #on the login section
    path("auth/login/", LoginView.as_view(template_name="loginpage.html"), name= "login-user"),
    path("auth/logout/", LogoutView.as_view(), name="logout-user"),
]
