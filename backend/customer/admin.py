from django.contrib import admin
from customer.models import Customer
from customer.models import Global
from django.contrib.sessions.models import Session

class SessionAdmin(admin.ModelAdmin):
    def _session_data(self, obj):
        return obj.get_decoded()
    list_display = ['session_key', '_session_data', 'expire_date']
admin.site.register(Session, SessionAdmin)
admin.site.register(Customer)
admin.site.register(Global)
