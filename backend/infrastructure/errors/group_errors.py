from fastapi import HTTPException


class GroupNotFound(HTTPException):
    def __init__(self):
        super().__init__(status_code=404, detail='Группа не найдена')


class InvalidInviteToken(HTTPException):
    def __init__(self):
        super().__init__(status_code=400, detail='Недействительный токен приглашения')


class UserAlreadyInGroup(HTTPException):
    def __init__(self):
        super().__init__(status_code=400, detail='Пользователь уже состоит в группе') 

class UserNotInGroup(HTTPException):
    def __init__(self):
        super().__init__(status_code=400, detail='Пользователь не состоит в группе')
    
    
class UserNotRights(HTTPException):
    def __init__(self):
        super().__init__(status_code=400, detail='Пользователь не имеет прав')


class InvalidElderName(HTTPException):
    def __init__(self):
        super().__init__(status_code=400, detail='Староста не найден')