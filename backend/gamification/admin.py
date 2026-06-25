from django.contrib import admin
from .models import XPTransaction, QuestTemplate, QuestProgress

admin.site.register(XPTransaction)
admin.site.register(QuestTemplate)
admin.site.register(QuestProgress)

# Register your models here.
