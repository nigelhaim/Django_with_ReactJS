from django.urls import path
from . import views

urlpatterns = [
    path('', views.routes, name='getRoutes'),
    path('notes/', views.getNotes, name="AllNotes"), 
    path('notes/<str:pk>/update', views.updateNote, name="Updatenote"),
    path('notes/add', views.addNote, name="Updatenote"),
    path('notes/<str:pk>/delete/', views.deleteNote, name="Deletenote"),
    path('notes/<str:pk>/', views.getNote, name="Note"), 
]