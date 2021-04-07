using Microsoft.AspNetCore.Mvc.RazorPages;
using Store.BusinessLogicLayer.Models.Authors;
using System.Threading.Tasks;
using Store.DataAccessLayer.Models.Author;
using Store.DataAccessLayer.Models.Pagination;
using Store.BusinessLogicLayer.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.AspNetCore.Authorization;
using Store.Shared.Constants;

namespace Store.PresentationLayer.Areas.Administration.Pages
{
    [Authorize]
    public class GetAuthorsModel : PageModel
    {

        private IAuthorService _authorService;
        public GetAuthorsModel(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        public PagedResponse<AuthorModel> PagedPesponse { get; set; }

        [BindProperty]
        public AuthorFilterAndPaginationModel AuthorFilterAndPaginationModel { get; set; }

        public async Task<IActionResult> OnGetAsync()
        {
            var authorInPaginationModel = new AuthorFilterAndPaginationModel
            {
                AuthorFilterModels = new AuthorFilterModel(),
                PaginationFilterModels = new PaginationFilterModel()
            };

            PagedPesponse = await _authorService.GetFilteredAuthorsAsync(authorInPaginationModel.AuthorFilterModels, authorInPaginationModel.PaginationFilterModels);

            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {

            var nextPage = Request.Form[Constants.Shared.NEXT_PAGE];
            if (!string.IsNullOrWhiteSpace(nextPage))
            {
                int number = Convert.ToInt32(nextPage);
                AuthorFilterAndPaginationModel.PaginationFilterModels.PageNumber += number;
            }

            var previousPage = Request.Form[Constants.Shared.PREVIOUS_PAGE];
            if (!string.IsNullOrWhiteSpace(previousPage))
            {
                int number = Convert.ToInt32(previousPage);
                AuthorFilterAndPaginationModel.PaginationFilterModels.PageNumber -= number;
            }

            PagedPesponse = await _authorService.GetFilteredAuthorsAsync(AuthorFilterAndPaginationModel.AuthorFilterModels, AuthorFilterAndPaginationModel.PaginationFilterModels);
            return Page();
        }

        public async Task<IActionResult> OnPostDeleteAsync(long id)
        {
            await _authorService.DeleteAuthorAsync(id);
            return RedirectToPage("GetAuthors");
        }

    }
}
