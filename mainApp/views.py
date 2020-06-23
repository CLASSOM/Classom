from django.shortcuts import render, redirect
from django.contrib.auth.models import User

def mainIndex(request):
    return render(request, 'mainIndex.html')

def createAccount(request):
    if request.method=="GET":
        return render(request, 'registration/register.html')
    
    elif request.method=="POST" :
        username = request.POST.get("username")
        password = request.POST.get("password")
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        email = request.POST.get("email")

        User.objects.create_user(username, email, password, first_name=first_name, last_name=last_name)

        return redirect('login')

def list(request):
    alluser = User.objects.values('username', 'email', 'first_name', 'last_name')
    context = {
        "alluser" : alluser
    }
    return render(request, 'registration/list.html', context)

def myInfo(request):
    
    if request.method=="POST":
        user = User.objects.get(username=request.user.username)
        user.email = request.POST.get('email')
        password = request.POST.get("password")
        print(password)
        if (password != ''):
            user.set_password(request.POST.get('password'))
        user.first_name = request.POST.get('first_name')
        user.last_name = request.POST.get('last_name')
        user.save()

        return redirect('mainIndex')
    else :
        user = User.objects.get(username=request.user.username)
        context = {
            "user" : user
        }
        return render(request, 'registration/myInfo.html', context)

def delete(request):
    if request.method=="POST":
        request.user.delete()
        return redirect('mainIndex')
    else :
        return render(request, 'registration/delete.html')

def img(request):
    return render(request, 'img.html')

def errorAccess(request):
    return render(request, 'error/errorAccess.html')

