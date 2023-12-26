from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('task_list/', views.taskList, name="api-list"),
    path('task_detail/<str:pk>/', views.taskDetail, name="api-detail"),
    path('task_create/', views.taskCreate, name="api-create"),
    path('task_update/<str:pk>/', views.taskUpdate, name="api-update"),
    path('task_delete/<str:pk>/', views.taskDelete, name="api-delete"),
]