import json

from sqlalchemy.orm import Session

from app.models import Note, Ticket
from app.schemas import TicketCreate, TicketUpdate


def _dump_json_list(value):
    if value is None:
        return "[]"
    if isinstance(value, str):
        return value if value.startswith("[") else json.dumps([value])
    return json.dumps(value)


def create_ticket(db: Session, ticket_data: TicketCreate) -> Ticket:
    ticket = Ticket(
        ticket_id="TEMP",
        customer_name=ticket_data.customer_name,
        customer_email=str(ticket_data.customer_email),
        company=ticket_data.company or "",
        subject=ticket_data.subject,
        description=ticket_data.description,
        status=ticket_data.status or "Open",
        priority=ticket_data.priority or "Medium",
        assignee=ticket_data.assignee or "Unassigned",
        tags=_dump_json_list(ticket_data.tags),
        related_tickets=_dump_json_list(ticket_data.related_tickets),
    )

    db.add(ticket)
    db.flush()

    ticket.ticket_id = f"TKT-{ticket.id:04d}"

    db.commit()
    db.refresh(ticket)

    return ticket


def get_tickets(db: Session) -> list[Ticket]:
    return db.query(Ticket).order_by(Ticket.created_at.desc()).all()


def get_ticket_by_id(db: Session, ticket_id: str) -> Ticket | None:
    return db.query(Ticket).filter(Ticket.ticket_id == ticket_id).first()


def update_ticket(
    db: Session,
    ticket: Ticket,
    ticket_data: TicketUpdate,
) -> Ticket:
    if ticket_data.status:
        ticket.status = ticket_data.status

    if ticket_data.priority:
        ticket.priority = ticket_data.priority

    if ticket_data.assignee:
        ticket.assignee = ticket_data.assignee

    if ticket_data.company is not None:
        ticket.company = ticket_data.company

    if ticket_data.tags is not None:
        ticket.tags = _dump_json_list(ticket_data.tags)

    if ticket_data.related_tickets is not None:
        ticket.related_tickets = _dump_json_list(ticket_data.related_tickets)

    if ticket_data.notes:
        note = Note(
            ticket_id=ticket.id,
            note_text=ticket_data.notes,
        )
        db.add(note)

    db.commit()
    db.refresh(ticket)

    return ticket