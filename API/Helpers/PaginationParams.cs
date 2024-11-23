namespace API.Helpers;

public class PaginationParams
{
    private const int MaxPagesize = 50;
    public int PageNumber { get; set; } = 1;
    private int _pageSize = 10;
   
    public int PageSize
     {
        get => _pageSize;
        set => _pageSize = (value > MaxPagesize) ? MaxPagesize : value;
     }

}
