
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Store.BusinessLogicLayer.Models.PrintingEditions;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.DataAccessLayer.Models.Pagination;
using Store.DataAccessLayer.Models.PrintingEdition;
using Store.Shared.Constants;

namespace Store.PresentationLayer.Areas.Administration.Pages
{
    [Authorize]
    public class GetPrintingEditionsModel : PageModel
    {

        private IPrintingEditionService _printingEditionService;

        public GetPrintingEditionsModel(IPrintingEditionService printingEditionService)
        {
            _printingEditionService = printingEditionService;
        }

        public PagedResponse<PrintingEditionModel> PagedPesponse { get; set; }

        [BindProperty]
        public PrintingEditionFilterAndPaginationModel PrintingEditionFilterAndPaginationModel { get; set; }

        public async Task<IActionResult> OnGetAsync()
        {

            var printingEdition = new PrintingEditionFilterAndPaginationModel 
            { 
                PaginationFilterModels = new PaginationFilterModel(),
                PrintingEditionFilterModels = new PrintingEditionFilterModel()
            };

            PagedPesponse = await _printingEditionService.GetFilteredPrintingEditionsAsync(printingEdition.PrintingEditionFilterModels, printingEdition.PaginationFilterModels);

            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var nextPage = Request.Form[Constants.Shared.NEXT_PAGE];
            if (!string.IsNullOrWhiteSpace(nextPage))
            {
                int number = Convert.ToInt32(nextPage);
                PrintingEditionFilterAndPaginationModel.PaginationFilterModels.PageNumber += number;
            }

            var previousPage = Request.Form[Constants.Shared.PREVIOUS_PAGE];
            if (!string.IsNullOrWhiteSpace(previousPage))
            {
                int number = Convert.ToInt32(previousPage);
                PrintingEditionFilterAndPaginationModel.PaginationFilterModels.PageNumber -= number;
            }


            PagedPesponse = await _printingEditionService.GetFilteredPrintingEditionsAsync(PrintingEditionFilterAndPaginationModel.PrintingEditionFilterModels, PrintingEditionFilterAndPaginationModel.PaginationFilterModels);
            return Page();
        }

        public async Task<IActionResult> OnPostDeleteAsync(long id)
        {
            await _printingEditionService.DeletePrintingEditionAsync(id);
            return RedirectToPage("GetPrintingEditions");
        }

    }
}
