using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Store.BusinessLogicLayer.Models.Authors;
using Store.BusinessLogicLayer.Services.Interfaces;

namespace Store.PresentationLayer.Areas.Administration.Pages
{
    public class AddAuthorModel : PageModel
    {
        private IAuthorService _authorService;
        public AddAuthorModel(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public AuthorModel AuthorModel { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
            await _authorService.CreateAuthorAsync(AuthorModel);
            return RedirectToPage("GetAuthors");
        }

    }
}
