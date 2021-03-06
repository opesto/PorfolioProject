from django.shortcuts import render, get_object_or_404
from .models import blogPost

def allBlogs(request):
    blogPosts = blogPost.objects
    return render(request, 'jobs/allBlogs.html', {'blogPosts':blogPosts})

def detail(request, blog_id):
    detailBlog = get_object_or_404(blogPost, pk=blog_id)
    return render(request, 'jobs/detail.html', {'blog':detailBlog})