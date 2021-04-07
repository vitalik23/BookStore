using Microsoft.AspNetCore.Mvc;
using Store.BusinessLogicLayer.Models.Authors;
using Store.BusinessLogicLayer.Services.Interfaces;
using System.Threading.Tasks;

namespace AjaxWebApplication.Controllers
{
    public class AuthorController : Controller
    {
        private IAuthorService _authorService;
        public AuthorController(IAuthorService authorService)
        {
            _authorService = authorService;
        }
        public IActionResult GetAuthors()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> GetAuthorsAsync(AuthorFilterAndPaginationModel model)
        {
            var authors = await _authorService.GetFilteredAuthorsAsync(model.AuthorFilterModels, model.PaginationFilterModels);
            return Ok(authors);
        }

    }
}
