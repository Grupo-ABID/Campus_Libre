from django.contrib import admin
from .models import (
    Carrera, Alumno, Periodo, Docente, Curso,
    Inscripcion, Pregunta, Encuesta, EvaluacionDocente, Respuesta
)

admin.site.register(Carrera)
admin.site.register(Alumno)
admin.site.register(Periodo)
admin.site.register(Docente)
admin.site.register(Curso)
admin.site.register(Inscripcion)
admin.site.register(Pregunta)
admin.site.register(Encuesta)
admin.site.register(Respuesta)

class RespuestaInline(admin.TabularInline):
    model = Respuesta
    extra = 0

class EvaluacionDocenteAdmin(admin.ModelAdmin):
    inlines = [RespuestaInline]

admin.site.register(EvaluacionDocente, EvaluacionDocenteAdmin)
