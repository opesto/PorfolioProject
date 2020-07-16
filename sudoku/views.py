from django.shortcuts import render

def sudoku(request):
    return render(request, 'sudoku.html')
