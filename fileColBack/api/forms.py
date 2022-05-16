from django import forms
from .models import File
'''
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Div, Submit, Row, Column, Field
'''


class DocumentForm(forms.ModelForm):
    class Meta:
        model = File
        fields = [ 'id', 'title', 'files', 'uploader', 'post' ]
