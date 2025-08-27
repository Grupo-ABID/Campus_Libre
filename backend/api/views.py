from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import (
    Carrera, Alumno, Periodo, Docente, Curso,
    Inscripcion, Pregunta, Encuesta, EvaluacionDocente, Respuesta
)
from .serializers import (
    CarreraSerializer, AlumnoSerializer, PeriodoSerializer, DocenteSerializer, CursoSerializer,
    InscripcionSerializer, PreguntaSerializer, EncuestaSerializer, EvaluacionDocenteSerializer, RespuestaSerializer
)

class CarreraViewSet(viewsets.ModelViewSet):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer


class AlumnoViewSet(viewsets.ModelViewSet):
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializer


class PeriodoViewSet(viewsets.ModelViewSet):
    queryset = Periodo.objects.all()
    serializer_class = PeriodoSerializer


class DocenteViewSet(viewsets.ModelViewSet):
    queryset = Docente.objects.all()
    serializer_class = DocenteSerializer


class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer


class InscripcionViewSet(viewsets.ModelViewSet):
    queryset = Inscripcion.objects.all()
    serializer_class = InscripcionSerializer


class PreguntaViewSet(viewsets.ModelViewSet):
    queryset = Pregunta.objects.all()
    serializer_class = PreguntaSerializer


class EncuestaViewSet(viewsets.ModelViewSet):
    queryset = Encuesta.objects.all()
    serializer_class = EncuestaSerializer

    @action(detail=False, methods=['get'], url_path='curso/(?P<curso_id>[^/.]+)')
    def encuesta_por_curso(self, request, curso_id=None):
        try:
            encuesta = Encuesta.objects.get(curso__id=curso_id)
            serializer = self.get_serializer(encuesta)
            return Response(serializer.data)
        except Encuesta.DoesNotExist:
            return Response({"error": "Encuesta no encontrada para este curso"}, status=status.HTTP_404_NOT_FOUND)


class EvaluacionDocenteViewSet(viewsets.ModelViewSet):
    queryset = EvaluacionDocente.objects.all()
    serializer_class = EvaluacionDocenteSerializer


class RespuestaViewSet(viewsets.ModelViewSet):
    queryset = Respuesta.objects.all()
    serializer_class = RespuestaSerializer

class RegistrarEvaluacionView(APIView):
    def post(self, request):
        data = request.data
        alumno_id = data.get("alumno_id")
        curso_id = data.get("curso_id")
        encuesta_id = data.get("encuesta_id")
        respuestas_data = data.get("respuestas", [])

        if not all([alumno_id, curso_id, encuesta_id, respuestas_data]):
            return Response({"error": "Datos incompletos"}, status=400)

        evaluacion = EvaluacionDocente.objects.create(
            alumno_id=alumno_id,
            curso_id=curso_id,
            encuesta_id=encuesta_id
        )

        for r in respuestas_data:
            Respuesta.objects.create(
                evaluacion=evaluacion,
                pregunta_id=r["pregunta_id"],
                valor=r["valor"],
                comentario=r.get("comentario", "")
            )

        return Response({"message": "Evaluación registrada correctamente."}, status=201)