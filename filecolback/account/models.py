
from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)

class UserManager(BaseUserManager):
    def create_user(self, email, realname, companyCode, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            realname=realname,
            companyCode=companyCode,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, realname, companyCode, password):
        user = self.create_user(
            email,
            password=password,
            companyCode=companyCode,
            realname=realname,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True, null=False, blank=False)
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
        unique=True,
    )
    realname = models.CharField(max_length=10)
    companyCode = models.IntegerField(null=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['realname', 'companyCode']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin
