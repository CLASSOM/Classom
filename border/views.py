from django.shortcuts import render, redirect
from border.models import Border
from datetime import datetime
from django.core.paginator import Paginator, EmptyPage
from mainApp import settings
import os
# Create your views here.

def index(request):
    borderTable = Border.objects.values('id', '제목', '작성자', '조회수').order_by('-id')
    print(borderTable)
    context = { "borderTable" : borderTable}
    return render(request, 'border/index.html', context)

def borderDetail(request, border_id):
    border = Border.objects.get(id=border_id)
    border.조회수 = border.조회수 + 1
    border.save()
    
    try:
        dirList = os.listdir(settings.MEDIA_ROOT+"\\"+str(border.id))
        context = { 
            "border" : border,
            "dirList" : dirList,
        }
    except :
        print("파일 없음")
        context = {
            "border" : border,
        }
    return render(request, 'border/detail.html', context)

def borderUpdate(request, border_id):
    if request.method=="POST":
        title = request.POST.get("title")
        context = request.POST.get("context")

        border = Border.objects.get(id = border_id)
        border.제목 = title
        border.내용 = context
        border.수정일 = datetime.now()
        border.save()
        return redirect("BD:D", border.id)

    else :
        border = Border.objects.values('id','제목','내용').get(id=border_id)
        dirList = os.listdir(settings.MEDIA_ROOT+"\\"+str(border_id))
        context = { 
            "border" : border,
            "dirList" : dirList,
        }
        return render(request, 'border/update.html', context)

def borderDelete(request, border_id):
    Border.objects.get(id = border_id).delete()
    context = { "border_id" : border_id }
    return render(request, 'border/delete.html', context)

def borderAdd(request):
    if request.method=="POST":
        title = request.POST.get("title")
        context = request.POST.get("context")
        author = request.POST.get("author")
        vcount = request.POST.get("vcount")

        if request.user.is_active == False :
            return redirect('login')
            
        border = Border()
        border.제목 = title
        border.내용 = context
        border.작성자 = author
        border.작성일 = datetime.now()
        border.수정일 = datetime.now()
        border.조회수 = vcount
        border.save()
        
        os.mkdir(settings.MEDIA_ROOT+"\\"+str(border.id)+"\\")
        for x in request.FILES.getlist("files"):
            upLoadFile = open(settings.MEDIA_ROOT+"\\"+str(border.id)+"\\"+str(x), 'wb')
            for chunk in x.chunks():
                print(chunk)
                upLoadFile.write(chunk)
        
        return redirect("BD:D", border.id)
    else :
        return render(request, 'border/add.html')

def page(request, page_id):
    border = Border.objects.all().order_by('-id')
    print('type : ', type(border))
    print('len : ', len(border))
    print('border : ', border)

    
    paging = Paginator(border,2)
    try:
        context = { "page" : paging.page(page_id) } 
    except EmptyPage :
        context = { "pageEmpty" : paging.page(paging.num_pages)}
    return render(request,'border/page.html', context)