from sqlalchemy import inspect, text

from app.database import Base, engine
from app.models import Note, Ticket


def init_database():
    Base.metadata.create_all(bind=engine)

    inspector = inspect(engine)
    if inspector.has_table("tickets"):
        columns = {column["name"] for column in inspector.get_columns("tickets")}
        missing_columns = {
            "company": "VARCHAR(150)",
            "priority": "VARCHAR(20)",
            "assignee": "VARCHAR(100)",
            "tags": "TEXT",
            "related_tickets": "TEXT",
        }
        for name, column_type in missing_columns.items():
            if name not in columns:
                with engine.begin() as connection:
                    connection.execute(text(f"ALTER TABLE tickets ADD COLUMN {name} {column_type}"))


if __name__ == "__main__":
    init_database()
    print("Database initialized successfully.")