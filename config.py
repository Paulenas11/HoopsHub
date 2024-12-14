class Config:
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = 'HoopsHub24'
    MYSQL_DB = 'HoopsHub'
    MYSQL_CURSORCLASS = 'DictCursor'

    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:HoopsHub24@localhost/HoopsHub'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Secret key for Flask sessions
    SECRET_KEY = '4a1c88500208050185706ad0dd1f0d268c50d117d0d10945a5ead95603772078'
    # Secret key for JWT signing
    JWT_SECRET_KEY = '4a1c88500208050185706ad0dd1f0d268c50d117d0d10945a5ead95603772078'
