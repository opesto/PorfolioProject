from django.shortcuts import render

def sudoku(request):
    return render(request, 'jobs/sudoku.html')
