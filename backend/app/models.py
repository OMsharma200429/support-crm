from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)

    ticket_id = Column(
        String(20),
        unique=True,
        nullable=False,
        index=True,
    )

    customer_name = Column(
        String(100),
        nullable=False,
    )

    customer_email = Column(
        String(255),
        nullable=False,
    )

    company = Column(
        String(150),
        default="",
        nullable=True,
    )

    subject = Column(
        String(200),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=False,
    )

    status = Column(
        String(20),
        nullable=False,
        default="Open",
    )

    priority = Column(
        String(20),
        default="Medium",
        nullable=True,
    )

    assignee = Column(
        String(100),
        default="Unassigned",
        nullable=True,
    )

    tags = Column(
        Text,
        default="[]",
        nullable=True,
    )

    related_tickets = Column(
        Text,
        default="[]",
        nullable=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    notes = relationship(
        "Note",
        back_populates="ticket",
        cascade="all, delete-orphan",
    )


class Note(Base):
    __tablename__ = "notes"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    ticket_id = Column(
        Integer,
        ForeignKey("tickets.id"),
        nullable=False,
    )

    note_text = Column(
        Text,
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    ticket = relationship(
        "Ticket",
        back_populates="notes",
    )