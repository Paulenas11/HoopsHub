import os

class Config:
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = 'HoopsHub24'
    MYSQL_DB = 'HoopsHub'
    MYSQL_CURSORCLASS = 'DictCursor'

    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:HoopsHub24@localhost/HoopsHub'
    SQLALCHEMY_TRACK_MODIFICATIONS = False