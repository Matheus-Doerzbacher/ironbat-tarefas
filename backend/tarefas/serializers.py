from rest_framework import serializers
from tarefas.models import Tarefa


class TarefaSerializer(serializers.HyperlinkedModelSerializer):
    usuario = serializers.CharField(source='usuario.username', read_only=True)

    class Meta:
        model = Tarefa
        fields = [
            'url',
            'id',
            'titulo',
            'descricao',
            'realizada',
            'usuario',
            'data_criacao',
        ]
