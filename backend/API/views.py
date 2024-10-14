from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Entry, Review
from .serializers import (
    UserSerializer,EntrySerializer, ReviewSerializer
)

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