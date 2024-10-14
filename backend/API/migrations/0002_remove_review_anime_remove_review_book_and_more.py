# Generated by Django 5.1.2 on 2024-10-11 02:24

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='anime',
        ),
        migrations.RemoveField(
            model_name='review',
            name='Book',
        ),
        migrations.RemoveField(
            model_name='review',
            name='movie',
        ),
        migrations.RemoveField(
            model_name='review',
            name='show',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='user',
        ),
        migrations.CreateModel(
            name='Entry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=2000)),
                ('author', models.CharField(max_length=40)),
                ('type', models.CharField(choices=[('MOVIE', 'Movie'), ('BOOK', 'Book'), ('TV SHOW', 'TV Show'), ('GAME', 'Game'), ('ANIME', 'Anime')], default='MOVIE', max_length=100)),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='Anime',
        ),
        migrations.DeleteModel(
            name='Book',
        ),
        migrations.DeleteModel(
            name='Movie',
        ),
        migrations.DeleteModel(
            name='Show',
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]