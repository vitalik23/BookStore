using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Store.BusinessLogicLayer.Models.PrintingEditions;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.Shared.Constants;
using System.Threading.Tasks;

namespace Store.PresentationLayer.Controllers
{
    [Route(Constants.Routes.PRINTING_EDITION)]
    [ApiController]
    public class PrintingEditionController : ControllerBase
    {
        private IPrintingEditionService _printingEditionService;

        public PrintingEditionController(IPrintingEditionService printingEditionService)
        {
            _printingEditionService = printingEditionService;
        }

        [Authorize(Roles = Constants.AuthRoles.ADMIN_ROLE, AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpPost]
        [Route(Constants.Routes.CREATE_PRINTING_EDITION)]
        public async Task<IActionResult> CreatePrintingEditionAsync( PrintingEditionModel model)
        {
            await _printingEditionService.CreatePrintingEditionAsync(model);
            return Ok();
        }

        [HttpPost]
        [Route(Constants.Routes.GET_PRINTING_EDITIONS)]
        public async Task<IActionResult> GetPrintingEditionAsync(PrintingEditionFilterAndPaginationModel model)
        {
            var printingEditions = await _printingEditionService.GetFilteredPrintingEditionsAsync(model.PrintingEditionFilterModels, model.PaginationFilterModels);
            return Ok(printingEditions);
        }

        [Authorize(Roles = Constants.AuthRoles.ADMIN_ROLE, AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpPut]
        [Route(Constants.Routes.UPDATE_PRINTING_EDITION)]
        public async Task<IActionResult> UpdatePrintingEditionAsync(PrintingEditionModel model)
        {
            await _printingEditionService.UpdatePrintingEditionAsync(model);
            return Ok();
        }

        [Authorize(Roles = Constants.AuthRoles.ADMIN_ROLE, AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpGet]
        [Route(Constants.Routes.DELETE_PRINTING_EDITION)]
        public async Task<IActionResult> DeletePrintingEditionAsync(long id)
        {
            await _printingEditionService.DeletePrintingEditionAsync(id);
            return Ok();
        }

        [HttpGet]
        [Route(Constants.Routes.GET_PRINTING_EDITION)]
        public async Task<IActionResult> GetPrintingEditionAsync(long id)
        {
            var printingEdition = await _printingEditionService.GetDataPrintingEditionAsync(id);
            return Ok(printingEdition);
        }

        [HttpPost]
        [Route(Constants.Routes.GET_MAX_PRICE_PRINTING_EDITION)]
        public async Task<IActionResult> GetMaxPricePrintingEditionAsync()
        {
            decimal maxPrice = await _printingEditionService.GetMaxPricePrintingEditionAsync();
            return Ok(maxPrice);
        }

    }
}