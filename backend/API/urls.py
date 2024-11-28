from django.urls import include, path
from . import views

# Create a router and register the viewsets


# Include the router URLs
urlpatterns = [
    path('entry/', views.AddEntry.as_view(), name='entry-list'),
    path('entry/delete/<int:pk>', views.EntryDelete.as_view(), name='delete-entry'),
    path('api/igdb-info/', views.IGDBInfoView.as_view(), name='igdb-info'),

]
