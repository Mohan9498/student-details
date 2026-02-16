from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'phone', 'age', 'created_at')
    readonly_fields = ('created_at', 'updated_at')
