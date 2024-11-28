from rest_framework.response import Response
import requests
import json
from django.http import JsonResponse
from django.views import View
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Entry, Review
from .serializers import (
    UserSerializer,EntrySerializer, ReviewSerializer
)
from django.views.decorators.csrf import csrf_exempt


class AddEntry(generics.ListCreateAPIView):
    serializer_class = EntrySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user= self.request.user
        return Entry.objects.filter(user=user)
    
    def perform_create(self,serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

class EntryDelete(generics.DestroyAPIView):
    serializer_class = EntrySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user= self.request.user
        return Entry.objects.filter(user=user)
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class IGDBInfoView(View):
    permission_classes = [AllowAny]

    @csrf_exempt  # Exempt this view from CSRF protection
    def get(self, request, *args, **kwargs):
        
        headers = {
            'Client-ID': '28bj4ks2i0coi61t8udccdvo9rtoi2',  # IGDB Client ID
            'Authorization': "Bearer kyyagr8eo6akih2eqijt2kw5qj20ek",
        }
        url = 'https://api.igdb.com/v4/games'
        payload = f'fields name, involved_companies, cover, genres; sort rating desc; where name ~ *"p"* ;'

        response = requests.post(url, headers=headers, data=payload)

        if response.status_code == 200:
            games = response.json()
            return JsonResponse(games, safe=False)
        else:
            return JsonResponse({'error': 'Failed to fetch data from IGDB'}, status=response.status_code)