from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Tarefa(models.Model):
    data_criacao = models.DateTimeField(default=timezone.now)
    titulo = models.CharField(max_length=50)
    descricao = models.TextField(blank=True, default='')
    realizada = models.BooleanField(default=False)
    usuario = models.ForeignKey(User, related_name='tarefas', on_delete=models.CASCADE)

    class Meta:
        ordering = ['-data_criacao']

    def __str__(self):
        return self.titulo
