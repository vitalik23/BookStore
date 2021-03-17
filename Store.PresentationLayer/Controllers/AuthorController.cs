using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Store.BusinessLogicLayer.Models.Authors;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.Shared.Constants;
using System.Threading.Tasks;

namespace Store.PresentationLayer.Controllers
{
    
    [Route(Constants.Routes.AUTHOR)]
    [ApiController]
    public class AuthorController : ControllerBase
    {

        private IAuthorService _authorService;
        public AuthorController(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        [Authorize(Roles = Constants.AuthRoles.ADMIN_ROLE, AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpPost]
        [Route(Constants.Routes.CREATE_AUTHOR)]
        public async Task<IActionResult> CreateAuthorAsync(AuthorModel model)
        {
            await _authorService.CreateAuthorAsync(model);
            return Ok();
        }

        [Authorize(Roles = Constants.AuthRoles.ADMIN_ROLE, AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpGet]
        [Route(Constants.Routes.GET_AUTHOR + Constants.Routes.ID)]
        public async Task<IActionResult> GetAuthorAsync(long id)
        {
            await _authorService.GetAuthorAsync(id);
            return Ok();
        }

        [Authorize(Roles = Constants.AuthRoles.ADMIN_ROLE, AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpGet]
        [Route(Constants.Routes.DELETE_AUTHOR + Constants.Routes.ID)]
        public async Task<IActionResult> DeleteAuthorAsync(long id)
        {
            await _authorService.DeleteAuthorAsync(id);
            return Ok();
        }

        [Authorize(Roles = Constants.AuthRoles.ADMIN_ROLE, AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpPut]
        [Route(Constants.Routes.UPDATE_AUTHOR)]
        public async Task<IActionResult> UpdateAuthorAsync(AuthorModel model)
        {
            await _authorService.UpdateAuthorAsync(model);
            return Ok();
        }

        [Authorize(Roles = Constants.AuthRoles.ADMIN_ROLE, AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpPost]
        [Route(Constants.Routes.GET_AUTHORS)]
        public async Task<IActionResult> GetAuthorAsync(AuthorFilterAndPaginationModel model)
        {
            var authors = await _authorService.GetFilteredAuthorsAsync(model.AuthorFilterModels, model.PaginationFilterModels);
            return Ok(authors);
        }

    }
}