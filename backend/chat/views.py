from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse

class RoomView(APIView):
    def get(self, request, room_name):
        return Response({"room_name": room_name})

def home(request):
        return HttpResponse("Welcome to WatchParty backend!")