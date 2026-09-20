import json
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, field_validator


def parse_list(value):
    if value is None:
        return []
    if isinstance(value, list):
        return [str(item) for item in value if item is not None]
    if isinstance(value, str):
        text = value.strip()
        if not text:
            return []
        try:
            parsed = json.loads(text)
        except json.JSONDecodeError:
            return [part.strip() for part in text.split(',') if part.strip()]
        if isinstance(parsed, list):
            return [str(item) for item in parsed if item is not None]
        return [str(parsed)]
    return [str(value)]


class TicketCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    company: str | None = None
    subject: str
    description: str
    status: str | None = None
    priority: str | None = None
    assignee: str | None = None
    tags: list[str] | str | None = None
    related_tickets: list[str] | str | None = None

    @field_validator('tags', 'related_tickets', mode='before')
    @classmethod
    def parse_tags(cls, value):
        return parse_list(value)


class NoteResponse(BaseModel):
    id: int
    note_text: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TicketListResponse(BaseModel):
    ticket_id: str
    customer_name: str
    customer_email: EmailStr | None = None
    company: str | None = None
    subject: str
    description: str | None = None
    status: str
    priority: str | None = None
    assignee: str | None = None
    tags: list[str] = []
    related_tickets: list[str] = []
    created_at: datetime
    updated_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)

    @field_validator('tags', 'related_tickets', mode='before')
    @classmethod
    def parse_tags(cls, value):
        return parse_list(value)


class TicketDetailResponse(BaseModel):
    ticket_id: str
    customer_name: str
    customer_email: EmailStr | None = None
    company: str | None = None
    subject: str
    description: str
    status: str
    priority: str | None = None
    assignee: str | None = None
    tags: list[str] = []
    related_tickets: list[str] = []
    notes: list[NoteResponse]
    created_at: datetime
    updated_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)

    @field_validator('tags', 'related_tickets', mode='before')
    @classmethod
    def parse_tags(cls, value):
        return parse_list(value)


class TicketUpdate(BaseModel):
    status: str | None = None
    priority: str | None = None
    assignee: str | None = None
    company: str | None = None
    tags: list[str] | str | None = None
    related_tickets: list[str] | str | None = None
    notes: str | None = None

    @field_validator('tags', 'related_tickets', mode='before')
    @classmethod
    def parse_tags(cls, value):
        return parse_list(value)


class TicketUpdateResponse(BaseModel):
    success: bool = True
    updated_at: datetime | None = None


class TicketCreateResponse(BaseModel):
    ticket_id: str
    created_at: datetime