from django.contrib import admin
from .models import User, Role, Key_interests, RecoveryCode, RejectionReason

# Register your models here.
admin.site.register(User)
admin.site.register(Role)
admin.site.register(Key_interests)
admin.site.register(RecoveryCode)
admin.site.register(RejectionReason)
