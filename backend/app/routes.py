from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.crud import create_ticket, get_ticket_by_id, get_tickets, update_ticket
from app.database import get_db
from app.models import Ticket
from app.schemas import (
    TicketCreate,
    TicketCreateResponse,
    TicketDetailResponse,
    TicketListResponse,
    TicketUpdate,
    TicketUpdateResponse,
)

router = APIRouter(prefix="/api/tickets", tags=["Tickets"])


@router.post(
    "",
    response_model=TicketCreateResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_ticket(
    ticket_data: TicketCreate,
    db: Session = Depends(get_db),
):
    ticket = create_ticket(db, ticket_data)

    return {
        "ticket_id": ticket.ticket_id,
        "created_at": ticket.created_at,
    }


@router.get("", response_model=list[TicketListResponse])
def list_tickets(
    db: Session = Depends(get_db),
    status: str | None = Query(default=None),
    search: str | None = Query(default=None),
):
    query = db.query(Ticket)

    if status:
        query = query.filter(Ticket.status == status)

    if search:
        term = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Ticket.ticket_id.ilike(term),
                Ticket.customer_name.ilike(term),
                Ticket.subject.ilike(term),
                Ticket.description.ilike(term),
            )
        )

    return query.order_by(Ticket.created_at.desc()).all()


@router.get("/{ticket_id}", response_model=TicketDetailResponse)
def get_single_ticket(
    ticket_id: str,
    db: Session = Depends(get_db),
):
    ticket = get_ticket_by_id(db, ticket_id)

    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found",
        )

    return ticket


@router.put("/{ticket_id}", response_model=TicketUpdateResponse)
def update_existing_ticket(
    ticket_id: str,
    ticket_data: TicketUpdate,
    db: Session = Depends(get_db),
):
    ticket = get_ticket_by_id(db, ticket_id)

    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found",
        )

    updated_ticket = update_ticket(db, ticket, ticket_data)

    return {
        "success": True,
        "updated_at": updated_ticket.updated_at,
    }


@router.patch("/{ticket_id}", response_model=TicketUpdateResponse)
def patch_existing_ticket(
    ticket_id: str,
    ticket_data: TicketUpdate,
    db: Session = Depends(get_db),
):
    return update_existing_ticket(ticket_id, ticket_data, db)