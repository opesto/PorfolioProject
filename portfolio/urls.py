from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
import jobs.views
import sudoku.views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', jobs.views.home, name='home'),
    path('blog/', include('blog.urls')),
    path('travel/', jobs.views.travel, name="travel"),
    path('vanBuild/', jobs.views.vanBuild, name="vanBuild"),
    path('sudoku/', jobs.view.sudoku, name="sudoku"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)