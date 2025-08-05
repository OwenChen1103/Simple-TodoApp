using TodoApi.DTOs;
using TodoApi.Model;

namespace TodoApi.Services;

public interface ITodoService
{
    Task<IEnumerable<TodoResponseDto>> GetAllTodosAsync();
    Task<TodoResponseDto?> GetTodoByIdAsync(int id);
    Task<TodoResponseDto> CreateTodoAsync(CreateTodoDto createTodoDto);
    Task<TodoResponseDto?> UpdateTodoAsync(int id, UpdateTodoDto updateTodoDto);
    Task<bool> DeleteTodoAsync(int id);
} 