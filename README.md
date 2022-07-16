# DDD Validation Example:

-----

## Problems I'm trying to solve:
- Code must be readable, therefore big functions and methods should not appear when we're increasing number of validation rules. `Clean code` 
- Domain layer must be isolated from other layers `Clean architecture`
- Entity must never enter invalid state `Always-Valid domain model principle from DDD`
- Application layer should have an opportunity to pass properly structured validation errors to presentation layer.
- All possible validation error should be easily displayable somewhere (for example, QA engineer might need all possible not 500-th errors which might appear on one every endpoint)

-----
