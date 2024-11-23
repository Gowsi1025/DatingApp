using API.Interfaces;

namespace API.Data;

public class UnitOfWork(DataContext context, IUserRepository userRepository, 
    ILikesRepositary likesRepository, IMessageRepository messageRepository) : IUnitOfWork
{
    public IUserRepository UserRepository => userRepository;

    public IMessageRepository MessageRepository => messageRepository;

    public ILikesRepositary LikesRepository => likesRepository;
   

    public async Task<bool> Complete()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public bool HasChanges()
    {
        return context.ChangeTracker.HasChanges();
    }
}