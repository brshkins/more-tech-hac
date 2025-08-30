from fastapi import HTTPException


class UniversityNotFound(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=404,
            detail="Университет не найден",
        )