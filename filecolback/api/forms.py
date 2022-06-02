from django import forms
from .models import File

class DocumentForm(forms.ModelForm):
    class Meta:
        model = File
        fields = [ 'id', 'title', 'files', 'uploader', 'post' ]
