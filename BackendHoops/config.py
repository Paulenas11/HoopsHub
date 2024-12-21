class Config:
    MYSQL_HOST = 'db-mysql-nyc3-46107-do-user-18587697-0.m.db.ondigitalocean.com'
    MYSQL_USER = 'doadmin'
    MYSQL_PASSWORD = 'AVNS_7rg1g2S5DMwqLr1cAM3'
    MYSQL_DB = 'HoopsHub'
    MYSQL_PORT = 25060
    MYSQL_CURSORCLASS = 'DictCursor'

    SQLALCHEMY_DATABASE_URI = (
        'mysql+pymysql://doadmin:AVNS_7rg1g2S5DMwqLr1cAM3@db-mysql-nyc3-46107-do-user-18587697-0.m.db.ondigitalocean.com:25060/HoopsHub'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Secret key for Flask sessions
    SECRET_KEY = '4a1c88500208050185706ad0dd1f0d268c50d117d0d10945a5ead95603772078'
    # Secret key for JWT signing
    JWT_SECRET_KEY = '4a1c88500208050185706ad0dd1f0d268c50d117d0d10945a5ead95603772078'

    # SSL configuration
    SQLALCHEMY_ENGINE_OPTIONS = {
        "connect_args": {
            "ssl": {
                "ca": "ca-certificate.crt"  # Replace with the actual path to your CA certificate
            }
        }
    }
