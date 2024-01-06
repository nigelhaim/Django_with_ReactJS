from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serlizers import NoteSerializier
# Create your views here.
@api_view(['GET'])
def routes(request):
    
    api_urls =[
        {
            'Endpoint':'/notes/',
            'method':'GET',
            'body':None,
            'description':'Returns an array of notes to be viewed'
        },
        {
            'Endpoint':'/notes/id',
            'method':'GET',
            'body':None,
            'description':'Returns a specific note'
        },
        {
            'Endpoint':'/notes/create',
            'method':'POST',
            'body':{'body':""},
            'description':'Creates a note'
        },
        {
            'Endpoint':'/notes/id/update',
            'method':'PUT',
            'body':{'body':""},
            'description':'Updates a note'
        },
        {
            'Endpoint':'/notes/id/delete',
            'method':'GET',
            'body':None,
            'description':'Deletes a note'
        }
    ]
    return Response(api_urls)

@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all()
    serializier = NoteSerializier(notes, many=True)
    return Response(serializier.data)

@api_view(['GET'])
def getNote(request, pk):
    # notes = Note.objects.get(id= pk)
    note = Note.objects.get(id=pk)
    serializier = NoteSerializier(note, many=False)
    return Response(serializier.data)