from django.shortcuts import render
from .models import Job

def home(request):
    jobs = Job.objects
    return render(request, 'jobs/home.html', {'jobs':jobs})

def travel(request):
    return render(request, 'jobs/travel.html')

def vanBuild(request):
    return render(request, 'jobs/vanBuild.html')
