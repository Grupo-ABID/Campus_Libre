from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # ✅ Ruta al panel de administración
    path('api/', include('api.urls')),  # ✅ Ruta a la API
]
