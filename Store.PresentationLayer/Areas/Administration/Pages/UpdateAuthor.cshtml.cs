using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Store.BusinessLogicLayer.Models.Authors;
using Store.BusinessLogicLayer.Services.Interfaces;

namespace Store.PresentationLayer.Areas.Administration.Pages
{
    public class UpdateAuthorModel : PageModel
    {
        private IAuthorService _authorService;
        public UpdateAuthorModel(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        public async Task<IActionResult> OnGetAsync(long id)
        {
            AuthorModel = await _authorService.GetAuthorAsync(id);
            return Page();
        }

        [BindProperty]
        public AuthorModel AuthorModel { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
            await _authorService.UpdateAuthorAsync(AuthorModel);
            return RedirectToPage("GetAuthors");
        }

    }
}
