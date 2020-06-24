from django.shortcuts import render, redirect
from phonebook.models import PhoneBook
# Create your views here.

def test(request):
    return render(request, 'phonebook/test.html')

def index(request):
    alluser = PhoneBook.objects.values('id','이름', '전화번호')
    print(alluser)
    context = {
        "phonebook":alluser
    }
    return render(request, 'phonebook/index.html', context)

def phoneAdd(request):
    if request.method == "POST":
        name = request.POST.get("name")
        phNum = request.POST.get("phNum")
        email = request.POST.get("email")
        addr = request.POST.get("addr")
        birth = request.POST.get("birth")
        author = request.POST.get("author")

        phonebook = PhoneBook()
        phonebook.이름 = name
        phonebook.전화번호 = phNum
        phonebook.이메일 = email
        phonebook.주소 = addr
        phonebook.생년월일 = birth
        phonebook.작성자 = author
        phonebook.save()

        return redirect("PB:I")
    else :
        print('사용자 : ', request.user)
        print('type : ', type(request.user))
        if request.user.is_active :
            return render(request, 'phonebook/phoneAdd.html')
        else :
            return redirect('login')

def phoneDelete(request, userId):
    if request.method=="POST":
        PhoneBook.objects.get(id=userId).delete()
        return redirect("PB:I")

    else : 
        userInfo = PhoneBook.objects.values('id', '이름', '전화번호').get(id=userId)
        context = {
            "userInfo" : userInfo
        }
        return render(request, 'phonebook/phoneDelete.html', context)

def phoneDetail(request,userId):
    userInfo = PhoneBook.objects.values('id','이름','전화번호','주소','이메일','생년월일','작성자').get(id=userId)
    context={
        'phonebook':userInfo
    }
    return render(request, 'phonebook/phoneDetail.html',context)

def phoneUpdate(request, userId):
    if request.method == "POST":
        name = request.POST.get("name")
        phNum = request.POST.get("phNum")
        email = request.POST.get("email")
        addr = request.POST.get("addr")
        birth = request.POST.get("birth")
        author = request.POST.get("author")

        phonebook = PhoneBook()
        phonebook.id = userId
        phonebook.이름 = name
        phonebook.전화번호 = phNum
        phonebook.이메일 = email
        phonebook.주소 = addr
        phonebook.생년월일 = birth
        phonebook.작성자 = author
        phonebook.save()

        return redirect("PB:I")

    else :
        if request.user.is_active:
            userInfo = PhoneBook.objects.values('id','이름','전화번호','주소','이메일','생년월일', '작성자').get(id=userId)
            if str(request.user) == userInfo["작성자"]:
                context = {
                    "userInfo" : userInfo
                }
                return render(request, 'phonebook/phoneUpdate.html', context)
            else :
                return redirect("errorAccess")
        else :
            return redirect('errorAccess')