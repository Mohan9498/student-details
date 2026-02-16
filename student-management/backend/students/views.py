from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Student
from .serializers import StudentSerializer
import json


# Function-based view to list all students and create a new student
# This is simpler and more beginner-friendly than class-based views
def student_list(request):
    """
    Handle GET (list all students) and POST (create new student) requests.
    
    GET: Returns a list of all students ordered by creation date (newest first)
    POST: Creates a new student with the provided data
    """
    if request.method == 'GET':
        # Get all students from database, order by newest first
        students = Student.objects.all().order_by('-created_at')
        # Convert students to JSON
        serializer = StudentSerializer(students, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    elif request.method == 'POST':
        # Parse the JSON data from the request body
        data = json.loads(request.body)
        # Create a new student with the provided data
        serializer = StudentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)


# Function-based view to get, update, or delete a specific student
@csrf_exempt  # This allows POST requests from the frontend without CSRF token
def student_detail(request, pk):
    """
    Handle GET (get student), PUT (update student), and DELETE (delete student) requests.
    
    GET: Returns the student with the given ID
    PUT: Updates the student with the given ID
    DELETE: Deletes the student with the given ID
    """
    try:
        # Try to get the student from the database
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        # Return 404 if student not found
        return JsonResponse({'error': 'Student not found'}, status=404)
    
    if request.method == 'GET':
        # Return the student data as JSON
        serializer = StudentSerializer(student)
        return JsonResponse(serializer.data)
    
    elif request.method == 'PUT':
        # Update the student with the provided data
        data = json.loads(request.body)
        serializer = StudentSerializer(student, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    
    elif request.method == 'DELETE':
        # Delete the student from the database
        student.delete()
        # Return 204 No Content on successful deletion
        return JsonResponse({}, status=204)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)
