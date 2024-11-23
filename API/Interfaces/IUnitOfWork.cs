using API.Data;

namespace API.Interfaces;

public interface IUnitOfWork
{
    IUserRepository UserRepository {get;}
    IMessageRepository MessageRepository {get;}
    ILikesRepositary LikesRepository {get;}
    Task<bool> Complete();
    bool HasChanges();
}