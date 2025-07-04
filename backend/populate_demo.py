import os
import django
from datetime import datetime
from random import randint

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")
django.setup()

from api.models import (
    Carrera, Alumno, Periodo, Docente, Curso,
    Pregunta, Encuesta, EvaluacionDocente, Respuesta
)

# Limpieza de datos anteriores (opcional en desarrollo)
Respuesta.objects.all().delete()
EvaluacionDocente.objects.all().delete()
Encuesta.objects.all().delete()
Pregunta.objects.all().delete()
Curso.objects.all().delete()
Docente.objects.all().delete()
Periodo.objects.all().delete()
Alumno.objects.all().delete()
Carrera.objects.all().delete()

# 1. Crear Carrera
carrera = Carrera.objects.create(nombre="Ingeniería en Informática", codigo=101)

# 2. Crear Alumno
alumno = Alumno.objects.create(nombre="María Torres", rut="12345678-9", carrera=carrera)

# 3. Crear Periodo
periodo = Periodo.objects.create(year=2025, semestre="1")

# 4. Crear Docente
docente = Docente.objects.create(nombre="Profesor Juan Pérez", rut="98765432-1")

# 5. Crear Curso
curso = Curso.objects.create(
    nombre="Programación Avanzada",
    NRC=99991,
    sesion="Lunes-Miércoles",
    periodo=periodo,
    docente=docente
)

# 6. Crear Preguntas
p1 = Pregunta.objects.create(texto="¿El docente explica con claridad?")
p2 = Pregunta.objects.create(texto="¿Resuelve dudas oportunamente?")
p3 = Pregunta.objects.create(texto="¿El curso está bien organizado?")

# 7. Crear Encuesta y asociar preguntas
encuesta = Encuesta.objects.create(
    titulo="Encuesta Evaluación Docente 1er Semestre",
    descripcion="Instrumento de evaluación de desempeño docente para el curso.",
    curso=curso
)
encuesta.preguntas.set([p1, p2, p3])

# 8. (Opcional) Crear Evaluación + Respuestas simuladas
evaluacion = EvaluacionDocente.objects.create(
    alumno=alumno,
    curso=curso,
    encuesta=encuesta,
    fecha=datetime.now()
)

# 9. Crear respuestas con valores simulados
for pregunta in [p1, p2, p3]:
    Respuesta.objects.create(
        evaluacion=evaluacion,
        pregunta=pregunta,
        valor=randint(4, 7),
        comentario="Respuesta automática para prueba"
    )

print("✅ Base de datos poblada exitosamente con datos de prueba.")