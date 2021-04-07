using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Store.BusinessLogicLayer.Models.Users;
using Store.BusinessLogicLayer.Services.Interfaces;

namespace Store.PresentationLayer.Areas.Administration.Pages
{
    public class UpdateUserModel : PageModel
    {
        private IAdminService _adminService;

        public UpdateUserModel(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [BindProperty]
        public UserModel UserModel { get; set; }

        [BindProperty]
        public string Id  { get; set; }

        public IActionResult OnGet(string id)
        {
            Id = id;
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            UserModel.Id = Id;
            await _adminService.UpdateUserAsync(UserModel);
            return RedirectToPage("GetUsers");
        }
    }
}
