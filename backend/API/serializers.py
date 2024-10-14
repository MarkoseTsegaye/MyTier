from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Entry, Review

# Serializer for UserProfile
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
# Serializer for User


# Serializer for Movie
class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ['id', 'title', 'description', 'author', 'type']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model= Review
        fields=['id', 'user', 'rating', 'review']