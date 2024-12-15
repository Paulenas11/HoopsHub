from app import app

if __name__ == "__main__":
    # Local development
    app.run(debug=True)
else:
    # For production use with a WSGI server like Gunicorn or Waitress
    pass
