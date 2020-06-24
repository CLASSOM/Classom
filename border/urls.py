from django.urls import path, re_path
from border import views

app_name = "BD"

urlpatterns=[
    path('', views.index, name="I"),
    re_path(r'^add/$',views.borderAdd, name="A"),
    re_path(r'^([0-9]+)/$', views.borderDetail, name='D'),
    re_path(r'^([0-9]+)/update/$',views.borderUpdate, name="U"),
    re_path(r'^([0-9]+)/delete/$', views.borderDelete, name="L"),
    re_path(r'^page/([0-9]+)/$', views.page, name="P"),
]
