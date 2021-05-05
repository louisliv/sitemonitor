# Generated by Django 3.2 on 2021-05-01 21:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SystemSetting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=25)),
                ('label', models.CharField(max_length=50)),
                ('value', models.SlugField(allow_unicode=True, default='')),
                ('value_type', models.CharField(choices=[('char', 'char'), ('list', 'list'), ('bool', 'boolean'), ('int', 'int'), ('float', 'float'), ('dict', 'dict'), ('tuple', 'tuple')], default='char', max_length=5)),
            ],
        ),
    ]
