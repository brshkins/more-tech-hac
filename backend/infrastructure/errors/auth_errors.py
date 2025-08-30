from fastapi import HTTPException
from starlette import status


class UserAlreadyRegister(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Вы уже зарегистрированы!",
        )


class UserAlreadyExists(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Пользователь с такой почтой уже существует!",
        )



class InvalidToken(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Не удалось подтвердить учетные данные",
        )


class InvalidLoginData(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Проверьте введеные данные!",
        )


class UserAlreadyNotRegister(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Пользователь с такой почтой не найден!",
        )


class CodeIsIncorrectOrExpired(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Код не верен или устарел!",
        )


class UserIsNotAdmin(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="У вас нет доступа к этой странице!",
        )