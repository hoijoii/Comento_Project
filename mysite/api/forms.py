from django import forms

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Div, Submit, Row, Column, Field

from .models import Filedata


class ImportFiledata(forms.ModelForm):
    class Meta:
        model = Filedata
        fields = [ 'companyCode', 'companyName', 'classification', 'closingMonth', 'revenue', 'operatingIncome', 'netIncome',
                  ]