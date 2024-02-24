from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URI = "postgresql+psycopg2://postgres:manchita@localhost:5432/Lab"
#DATABASE_URI = "postgresql+psycopg2://postgres:manchita@localhost:5432/Lab?client_encoding=utf8"

engine = create_engine(DATABASE_URI, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def create_all():
    print("Creando tablas",Base)
    Base.metadata.create_all(bind=engine)

def drop_all():
    Base.metadata.drop_all(bind=engine)

def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
