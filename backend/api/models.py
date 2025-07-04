import uuid
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Carrera(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    codigo = models.IntegerField(null=True, blank=True, unique=True)

    def _str_(self):
        return self.nombre

class Alumno(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    rut = models.CharField(max_length=12, null=True, blank=True, unique=True)
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE)

    def _str_(self):
        return self.nombre

class Periodo(models.Model):
    id = models.AutoField(primary_key=True)
    year = models.IntegerField()
    semestre = models.CharField(max_length=100)

    def _str_(self):
        return f"{self.year} - {self.semestre}"

class Docente(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    rut = models.CharField(max_length=12, null=True, blank=True, unique=True)

    def _str_(self):
        return self.nombre

class Curso(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    NRC = models.IntegerField(null=True, blank=True, unique=True)
    sesion = models.CharField(max_length=100)
    periodo = models.ForeignKey(Periodo, on_delete=models.CASCADE)
    docente = models.ForeignKey(Docente, on_delete=models.CASCADE)

    def _str_(self):
        return f"{self.nombre} - {self.NRC}"

class Inscripcion(models.Model):
    id = models.AutoField(primary_key=True)
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)

class Pregunta(models.Model):
    id = models.AutoField(primary_key=True)
    texto = models.CharField(max_length=300)

    def _str_(self):
        return self.texto

class Encuesta(models.Model):
    id = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    preguntas = models.ManyToManyField(Pregunta)

    def _str_(self):
        return self.titulo

class EvaluacionDocente(models.Model):
    id = models.AutoField(primary_key=True)
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    encuesta = models.ForeignKey(Encuesta, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"{self.alumno} evaluó {self.curso.docente} en {self.curso}"

class Respuesta(models.Model):
    id = models.AutoField(primary_key=True)
    evaluacion = models.ForeignKey(EvaluacionDocente, on_delete=models.CASCADE)
    pregunta = models.ForeignKey(Pregunta, on_delete=models.CASCADE)
    valor = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(7)
        ]
    )
    comentario = models.TextField(blank=True, null=True)

    def _str_(self):
        return f"Evaluación {self.evaluacion.id} - Pregunta {self.pregunta.id} = {self.valor}"