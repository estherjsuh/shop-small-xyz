import os

DATABASE_URI = os.environ.get('DATABASE_URL')

SCREENSHOT_KEY = os.environ.get('SCREENSHOT_KEY')

SECRET_KEY = os.environ.get('SECRET_KEY')

S3_KEY = os.environ.get('S3_KEY')
S3_SECRET = os.environ.get('S3_SECRET')
S3_BUCKET = os.environ.get('S3_BUCKET')
S3_PREFIX = os.environ.get('S3_PREFIX')

MAIL_SERVER = os.environ.get('MAIL_SERVER')
MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER')
MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD') 


BASIC_AUTH_USERNAME = os.environ.get('BASIC_AUTH_USERNAME')
BASIC_AUTH_PASSWORD = os.environ.get('BASIC_AUTH_PASSWORD')