using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.DTOs;
using TodoApi.Model;

namespace TodoApi.Services;

public class TodoService : ITodoService
{
    private readonly TodoContext _context;

    public TodoService(TodoContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TodoResponseDto>> GetAllTodosAsync()
    {
        var todos = await _context.Todos.ToListAsync();
        return todos.Select(MapToResponseDto);
    }

    public async Task<TodoResponseDto?> GetTodoByIdAsync(int id)
    {
        var todo = await _context.Todos.FindAsync(id);
        return todo != null ? MapToResponseDto(todo) : null;
    }

    public async Task<TodoResponseDto> CreateTodoAsync(CreateTodoDto createTodoDto)
    {
        var todo = new Todo
        {
            Title = createTodoDto.Title,
            Description = createTodoDto.Description,
            CreatedAt = DateTime.UtcNow
        };

        _context.Todos.Add(todo);
        await _context.SaveChangesAsync();

        return MapToResponseDto(todo);
    }

    public async Task<TodoResponseDto?> UpdateTodoAsync(int id, UpdateTodoDto updateTodoDto)
    {
        var todo = await _context.Todos.FindAsync(id);
        if (todo == null) return null;

        todo.Title = updateTodoDto.Title;
        todo.Description = updateTodoDto.Description;
        todo.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return MapToResponseDto(todo);
    }

    public async Task<bool> DeleteTodoAsync(int id)
    {
        var todo = await _context.Todos.FindAsync(id);
        if (todo == null) return false;

        _context.Todos.Remove(todo);
        await _context.SaveChangesAsync();

        return true;
    }

    private static TodoResponseDto MapToResponseDto(Todo todo)
    {
        return new TodoResponseDto
        {
            Id = todo.Id,
            Title = todo.Title ?? string.Empty,
            Description = todo.Description ?? string.Empty,
            CreatedAt = todo.CreatedAt,
            UpdatedAt = todo.UpdatedAt
        };
    }
} 