# Generated by Django 5.0.6 on 2024-12-26 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0005_alter_entry_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entry',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
