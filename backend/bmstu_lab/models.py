from django.db import models
from django.contrib.auth.models import User

class Footballers(models.Model):
    id_footballer = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    position = models.CharField(max_length=20, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    id_team = models.CharField(max_length=20, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    description = models.CharField(max_length=20, blank=True, null=True)


    class Meta:
        managed = True
        db_table = 'footballers'

class Order(models.Model):
    item = models.ForeignKey(Footballers, on_delete=models.DO_NOTHING)
    customer = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    status = models.TextField()
    order_date = models.DateTimeField()

    class Meta:
        managed = True
        db_table = 'orders'
