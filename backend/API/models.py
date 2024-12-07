from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.


class Entry(models.Model):
    TYPE_CHOICES = [
        ('movie', 'Movie'),
        ('book', 'Book'),
        ('game', 'Game'),
        ('anime', 'Anime')
    ]
    title = models.CharField(max_length=100)
    picture = models.CharField(max_length=2000)
    author = models.CharField(max_length=40)
    type = models.CharField(choices=TYPE_CHOICES, max_length=100, default="MOVIE")
    #rank = models.IntegerField(default=None, blank=True)
    user = models.ForeignKey(User, blank=True, on_delete=models.CASCADE)
    def __str__(self):
        return self.title



class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review = models.CharField(max_length=5000, blank=True)
    rating = rating = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ])
    entry = models.ForeignKey(Entry, on_delete=models.CASCADE, default=None)
    def __str__(self):
        return self.rating
    