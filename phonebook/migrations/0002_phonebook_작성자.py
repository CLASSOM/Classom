# Generated by Django 2.1.5 on 2020-03-12 04:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('phonebook', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='phonebook',
            name='작성자',
            field=models.CharField(default='admin', max_length=200),
            preserve_default=False,
        ),
    ]
