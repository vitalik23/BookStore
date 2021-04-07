using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Store.BusinessLogicLayer.Models.Authors;
using Store.BusinessLogicLayer.Models.PrintingEditions;
using Store.BusinessLogicLayer.Services.Interfaces;

namespace Store.PresentationLayer.Areas.Administration.Pages
{
    public class UpdatePrintingEditionModel : PageModel
    {
        private IPrintingEditionService _printingEditionService;
        private IAuthorService _authorService;

        public UpdatePrintingEditionModel(IPrintingEditionService printingEditionService, IAuthorService authorService)
        {
            _printingEditionService = printingEditionService;
            _authorService = authorService;
        }

        [BindProperty]
        public PrintingEditionModel PrintingEditionModel { get; set; }

        public IEnumerable<AuthorModel> Authors { get; set; }

        public async Task<IActionResult> OnGetAsync(long id)
        {
            var printingEdition = await _printingEditionService.GetDataPrintingEditionAsync(id);
            PrintingEditionModel = printingEdition;

            Authors = await _authorService.GetAllAuthorsAsync();
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            await _printingEditionService.UpdatePrintingEditionAsync(PrintingEditionModel);
            return RedirectToPage("GetPrintingEditions");
        }
    }
}
