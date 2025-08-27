from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Carrera(models.Model):
    nombre = models.CharField(max_length=100)
    codigo = models.IntegerField(null=True, blank=True, unique=True)

class Alumno(models.Model):
    nombre = models.CharField(max_length=100)
    rut = models.CharField(max_length=12, null=True, blank=True, unique=True)
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE)

class Periodo(models.Model):
    year = models.IntegerField()
    semestre = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.year} - {self.semestre}"

class Docente(models.Model):
    nombre = models.CharField(max_length=100)
    rut = models.CharField(max_length=12, null=True, blank=True, unique=True)

class Curso(models.Model):
    nombre = models.CharField(max_length=100)
    NRC = models.IntegerField(null=True, blank=True, unique=True)
    sesion = models.CharField(max_length=100)
    periodo = models.ForeignKey(Periodo, on_delete=models.CASCADE)
    docente = models.ForeignKey(Docente, on_delete=models.CASCADE)

class Inscripcion(models.Model):
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)

class Pregunta(models.Model):
    texto = models.CharField(max_length=300)

    def __str__(self):
        return self.texto

class Encuesta(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    preguntas = models.ManyToManyField(Pregunta)  

    def __str__(self):
        return self.titulo


class EvaluacionDocente(models.Model):
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    encuesta = models.ForeignKey(Encuesta, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.alumno} evaluó {self.curso.docente} en {self.curso}"


class Respuesta(models.Model):
    evaluacion = models.ForeignKey(EvaluacionDocente, on_delete=models.CASCADE)
    pregunta = models.ForeignKey(Pregunta, on_delete=models.CASCADE)
    valor = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(7)
        ]
    ) 
    comentario = models.TextField(blank=True, null=True)  # Para la pregunta abierta
