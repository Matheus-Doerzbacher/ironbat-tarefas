from rest_framework import permissions, viewsets

from tarefas.models import Tarefa
from tarefas.serializers import TarefaSerializer
from tarefas.permissions import IsOwnerOrReadOnly


class TarefaViewSet(viewsets.ModelViewSet):
    """
    Este ViewSet fornece automaticamente ações de `list`, `create`, `retrieve`, `update` e `destroy`.
    """

    serializer_class = TarefaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Tarefa.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
