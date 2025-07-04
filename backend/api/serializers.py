from rest_framework import serializers
from .models import *

# ------------------------
# Carrera
# ------------------------

class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrera
        fields = ['id', 'nombre', 'codigo']

# ------------------------
# Alumno
# ------------------------

class AlumnoReadSerializer(serializers.ModelSerializer):
    carrera = CarreraSerializer()

    class Meta:
        model = Alumno
        fields = ['id', 'nombre', 'rut', 'carrera']

class AlumnoWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = ['id', 'nombre', 'rut', 'carrera']

# ------------------------
# Periodo
# ------------------------

class PeriodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Periodo
        fields = ['id', 'year', 'semestre']

# ------------------------
# Docente
# ------------------------

class DocenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docente
        fields = ['id', 'nombre', 'rut']

# ------------------------
# Curso
# ------------------------

class CursoReadSerializer(serializers.ModelSerializer):
    periodo = PeriodoSerializer()
    docente = DocenteSerializer()

    class Meta:
        model = Curso
        fields = ['id', 'nombre', 'NRC', 'sesion', 'periodo', 'docente']

class CursoWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = ['id', 'nombre', 'NRC', 'sesion', 'periodo', 'docente']

# ------------------------
# Inscripcion
# ------------------------

class InscripcionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inscripcion
        fields = ['id', 'alumno', 'curso']

# ------------------------
# Pregunta
# ------------------------

class PreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields = ['id', 'texto']

# ------------------------
# Encuesta
# ------------------------

class EncuestaReadSerializer(serializers.ModelSerializer):
    preguntas = PreguntaSerializer(many=True)

    class Meta:
        model = Encuesta
        fields = ['id', 'titulo', 'descripcion', 'curso', 'preguntas']

class EncuestaWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Encuesta
        fields = ['id', 'titulo', 'descripcion', 'curso', 'preguntas']

# ------------------------
# EvaluacionDocente
# ------------------------

class EvaluacionDocenteReadSerializer(serializers.ModelSerializer):
    alumno = AlumnoReadSerializer()
    curso = CursoReadSerializer()
    encuesta = EncuestaReadSerializer()

    class Meta:
        model = EvaluacionDocente
        fields = ['id', 'alumno', 'curso', 'encuesta', 'fecha']

class EvaluacionDocenteWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluacionDocente
        fields = ['id', 'alumno', 'curso', 'encuesta']

# ------------------------
# Respuesta
# ------------------------

class RespuestaReadSerializer(serializers.ModelSerializer):
    evaluacion = EvaluacionDocenteReadSerializer()
    pregunta = PreguntaSerializer()

    class Meta:
        model = Respuesta
        fields = ['id', 'evaluacion', 'pregunta', 'valor', 'comentario']

class RespuestaWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Respuesta
        fields = ['id', 'evaluacion', 'pregunta', 'valor', 'comentario']