from django.urls import path, include, re_path
from phonebook import views

app_name="PB"

urlpatterns = [
    path('', views.test),
    path('index/', views.index, name="I"),
    path('add/', views.phoneAdd, name="A"),
    re_path('delete/([0-9]+)/', views.phoneDelete, name="L"),
    re_path('detail/([0-9]+)/', views.phoneDetail,name='D'),
    re_path('update/([0-9]+)/', views.phoneUpdate,name="U"),
]
