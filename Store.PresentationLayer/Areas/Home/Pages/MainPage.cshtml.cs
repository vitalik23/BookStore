using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Store.PresentationLayer.Areas.Home.Pages
{
    public class MainPageModel : PageModel
    {
        public IActionResult OnGet()
        {
            return Page();
        }
    }
}
