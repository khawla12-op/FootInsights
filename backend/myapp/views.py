from rest_framework import viewsets
from rest_framework import generics
from .models import FootInsight
from .serializers import FootInsightSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
import tempfile
from langchain_community.document_loaders.csv_loader import CSVLoader
# from langchain.embeddings import HuggingFaceEmbeddings
# from langchain.llms import CTransformers
# from langchain_community.vectorstores import FAISS
# from langchain.chains import ConversationalRetrievalChain
from django.views.decorators.csrf import csrf_exempt
import os
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

# DB_FAISS_PATH = 'vectorstore/db_faiss'

# def load_llm():
#     model_path = 'C:/Users/allak/Desktop/FootInsights/backend/myapp/llama-2-7b-chat.ggmlv3.q8_0.bin'
#     if not os.path.isfile(model_path):
#         raise FileNotFoundError(f"Model file not found at {model_path}")
    
#     return CTransformers.load(model_path)


# @csrf_exempt
# def upload_csv(request):
#     if request.method == 'POST' and 'file' in request.FILES:
#         uploaded_file = request.FILES['file']
        
#         with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
#             tmp_file.write(uploaded_file.read())
#             tmp_file_path = tmp_file.name

#         try:
#             loader = CSVLoader(file_path=tmp_file_path, encoding="utf-8", csv_args={'delimiter': ','})
#             data = loader.load()

#             embeddings = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2',
#                                                model_kwargs={'device': 'cpu'})

#             db = FAISS.from_documents(data, embeddings)
#             db.save_local(DB_FAISS_PATH)
#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=500)
#         finally:
#             os.remove(tmp_file_path)  # Clean up the temporary file

#         return JsonResponse({"status": "CSV uploaded successfully"})

#     return JsonResponse({"error": "Invalid request"}, status=400)


# @csrf_exempt
# def chatbot_query(request):
#     if request.method == 'POST':
#         query = request.POST.get('query', '')
#         history = request.POST.getlist('history[]', [])

#         if not query:
#             return JsonResponse({"error": "Query is required"}, status=400)

#         try:
#             llm = load_llm()
#             db = FAISS.load_local(DB_FAISS_PATH, HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2',
#                                                                        model_kwargs={'device': 'cpu'}))
#             chain = ConversationalRetrievalChain.from_llm(llm=llm, retriever=db.as_retriever())
#             result = chain({"question": query, "chat_history": history})

#             response = {
#                 "answer": result.get("answer", "No response available"),
#                 "history": history + [(query, result.get("answer", "No response available"))]
#             }
#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=500)

#         return JsonResponse(response)

#     return JsonResponse({"error": "Invalid request"}, status=400)

@csrf_exempt
def predict(request):
    if request.method == 'POST':
        # Validate if file and question exist
        if 'file' not in request.FILES or 'question' not in request.POST:
            return JsonResponse({'error': 'File or question is missing.'}, status=400)

        file = request.FILES['file']
        file_path = default_storage.save(file.name, file)

        try:
            # Validate OpenAI API key
            openai_api_key = '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'
            if not openai_api_key:
                return JsonResponse({'error': 'OpenAI API key is not set.'}, status=500)

            # Create the agent
            agent = create_csv_agent(OpenAI(api_key=openai_api_key, temperature=0), file_path, verbose=True, allow_dangerous_code=True)

            # Process the question
            question = request.POST['question']
            result = agent.run(question)

        except Exception as e:
            return JsonResponse({'error': f'Error processing request: {str(e)}'}, status=500)

        finally:
            # Clean up file
            default_storage.delete(file_path)

        return JsonResponse({'result': result})

    return JsonResponse({'error': 'Invalid request method.'}, status=400)