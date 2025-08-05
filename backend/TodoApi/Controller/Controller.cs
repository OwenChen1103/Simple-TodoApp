using Microsoft.AspNetCore.Mvc;
using TodoApi.DTOs;
using TodoApi.Services;

[Route("api/[controller]")]
[ApiController]
public class TodosController : ControllerBase
{
    private readonly ITodoService _todoService;

    public TodosController(ITodoService todoService)
    {
        _todoService = todoService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoResponseDto>>> GetTodos()
    {
        var todos = await _todoService.GetAllTodosAsync();
        return Ok(todos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoResponseDto>> GetTodo(int id)
    {
        var todo = await _todoService.GetTodoByIdAsync(id);
        if (todo == null) return NotFound();
        return Ok(todo);
    }

    [HttpPost]
    public async Task<ActionResult<TodoResponseDto>> PostTodo(CreateTodoDto createTodoDto)
    {
        var todo = await _todoService.CreateTodoAsync(createTodoDto);
        return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TodoResponseDto>> PutTodo(int id, UpdateTodoDto updateTodoDto)
    {
        var todo = await _todoService.UpdateTodoAsync(id, updateTodoDto);
        if (todo == null) return NotFound();
        return Ok(todo);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodo(int id)
    {
        var success = await _todoService.DeleteTodoAsync(id);
        if (!success) return NotFound();
        return NoContent();
    }
}