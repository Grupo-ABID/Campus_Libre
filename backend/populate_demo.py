import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")
django.setup()

from api.models import (
    Carrera, Alumno, Periodo, Docente, Curso,
    Pregunta, Encuesta
)

# Limpiar todo lo previo (opcional en desarrollo)
Carrera.objects.all().delete()
Alumno.objects.all().delete()
Periodo.objects.all().delete()
Docente.objects.all().delete()
Curso.objects.all().delete()
Pregunta.objects.all().delete()
Encuesta.objects.all().delete()

# Crear Carrera
carrera = Carrera.objects.create(nombre="Ingeniería en Informática", codigo=101)

# Crear Alumno
alumno = Alumno.objects.create(nombre="María Torres", rut="12345678-9", carrera=carrera)

# Crear Periodo
periodo = Periodo.objects.create(year=2025, semestre="1")

# Crear Docente
docente = Docente.objects.create(nombre="Profesor Juan Pérez", rut="98765432-1")

# Crear Curso
curso = Curso.objects.create(
    nombre="Programación Avanzada",
    NRC=99991,
    sesion="Lunes-Miércoles",
    periodo=periodo,
    docente=docente
)

# Crear Preguntas
p1 = Pregunta.objects.create(texto="¿El docente explica con claridad?")
p2 = Pregunta.objects.create(texto="¿Resuelve dudas oportunamente?")
p3 = Pregunta.objects.create(texto="¿El curso está bien organizado?")

# Crear Encuesta
encuesta = Encuesta.objects.create(
    titulo="Encuesta Evaluación Docente 1er Semestre",
    descripcion="Instrumento de evaluación de desempeño docente para el curso.",
    curso=curso
)
encuesta.preguntas.set([p1, p2, p3])  # Asocia preguntas a la encuesta

print("✅ Base de datos poblada exitosamente con datos de prueba.")
