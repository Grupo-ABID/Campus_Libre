from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from .views import (
    CarreraViewSet, AlumnoViewSet, PeriodoViewSet, DocenteViewSet, CursoViewSet,
    InscripcionViewSet, PreguntaViewSet, EncuestaViewSet, EvaluacionDocenteViewSet,
    RespuestaViewSet, RegistrarEvaluacionView
)
from django.http import JsonResponse

router = DefaultRouter()
router.register(r'carreras', CarreraViewSet)
router.register(r'alumnos', AlumnoViewSet)
router.register(r'periodos', PeriodoViewSet)
router.register(r'docentes', DocenteViewSet)
router.register(r'cursos', CursoViewSet)
router.register(r'inscripciones', InscripcionViewSet)
router.register(r'preguntas', PreguntaViewSet)
router.register(r'encuestas', EncuestaViewSet)
router.register(r'evaluaciones', EvaluacionDocenteViewSet)
router.register(r'respuestas', RespuestaViewSet)

urlpatterns = [
    path('evaluaciones/responder/', RegistrarEvaluacionView.as_view()),  # 👈 Mueve esto arriba
    path('ping/', lambda request: JsonResponse({"pong": True})),         # prueba extra
    path('', include(router.urls)),                                      # 👈 Este debe ir al final
    path('admin/', admin.site.urls)
]
