from rest_framework import viewsets
from rest_framework import generics
from .models import FootInsight
from .serializers import FootInsightSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
import json
from .utils import get_labels_dics,create_colors_info,generate_file_name
import tempfile
import os
from langchain_community.document_loaders.csv_loader import CSVLoader
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
import openai
#Changement
from dotenv import load_dotenv
from django.core.files.storage import default_storage
from langchain_experimental.agents import create_csv_agent
from langchain_community.llms import OpenAI
load_dotenv()
class FootInsightViewSet(viewsets.ModelViewSet):
    queryset = FootInsight.objects.all()
    serializer_class = FootInsightSerializer


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def player_detail(request, pk=None):
    # Handling GET, PUT, DELETE for a specific player (requires pk)
    if pk is not None:
        try:
            player = FootInsight.objects.get(pk=pk)
        except FootInsight.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = FootInsightSerializer(player)
            return Response(serializer.data)

        if request.method == 'DELETE':
            player.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        if request.method == 'PUT':
            serializer = FootInsightSerializer(player, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Handling POST for creating a new player
    if request.method == 'POST':
        serializer = FootInsightSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#Working on Chatbot:

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['FootInsights']  # Select the database
collection = db['FootInsights']  # Replace with your collection name
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
if not OPENAI_API_KEY:
    raise ValueError("OpenAI API key is missing. Set it in your .env file.")
@csrf_exempt
def predict(request):
    if request.method == 'POST':
        try:
            # Validate that question is provided
            question = request.POST.get('question')
            if not question:
                return JsonResponse({'error': 'Question is missing.'}, status=400)

            # Fetch all data from MongoDB
            documents = list(collection.find({}))  
            
            # Convert the MongoDB data into JSON
            documents_json = json.dumps(documents)
            prompt = f"Here is the data: {documents_json}. Now, answer the following question based on this data: {question}"

            results = []
            response = openai.chat.completions.create(
                    model="gpt-4o-mini",  
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant."},
                        {"role": "user", "content": prompt}
                    ],
                 
            )
            results = response.choices[0].message.content.strip()

            # Combine the results from each chunk
            final_result = results

            return JsonResponse({'result': final_result})

        except Exception as e:
            return JsonResponse({'error': f'Error processing request: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)
