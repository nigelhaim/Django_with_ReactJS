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
    notes = Note.objects.all().order_by('-updated')
    serializier = NoteSerializier(notes, many=True)
    return Response(serializier.data)

@api_view(['GET'])
def getNote(request, pk):
    note = Note.objects.get(id=pk)
    serializier = NoteSerializier(note, many=False)
    return Response(serializier.data)

@api_view(['PUT'])
def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializier(instance=note, data=data)
    
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteNote(request,pk): 
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted!')
    
@api_view(['POST'])
def addNote(request):
    data = request.data
    note = Note.objects.create(
        body=data['body']
    )
    serialilzer = NoteSerializier(note, many=False)
    return Response(serialilzer.data)