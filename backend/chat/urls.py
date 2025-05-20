from django.urls import path
from .views import RoomView, home

urlpatterns = [
    path('', home, name='home'), 
    path('room/<str:room_name>/', RoomView.as_view()),
]


