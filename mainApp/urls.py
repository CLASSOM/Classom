"""mainApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import handler400, handler403, handler404, handler500
from django.urls import path, include
from mainApp import views

handler400='mainApp.views.errorAccess'
handler403='mainApp.views.errorAccess'
handler404='mainApp.views.errorAccess'
handler500='mainApp.views.errorAccess'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('django.contrib.auth.urls')),
    path('account/register/', views.createAccount, name="createAccount"),
    path('account/list/', views.list),
    path('account/myInfo/', views.myInfo, name='myInfo'),
    path('account/delete/', views.delete, name='delete'),
    path('', views.mainIndex, name="mainIndex"),
    path('phonebook/', include('phonebook.urls')),
    path('img/', views.img),  
    path('error/access/', views.errorAccess, name="errorAccess"),
    path('border/', include('border.urls')),
    path('updown/', include('updown.urls')),
]
