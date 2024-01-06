from django.urls import path
from . import views

urlpatterns = [
    path('', views.routes, name='getRoutes'),
    path('notes/', views.getNotes, name="AllNotes"), 
    path('notes/<str:pk>/', views.getNote, name="Note"), 
]