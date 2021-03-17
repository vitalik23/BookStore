using AutoMapper;
using Store.BusinessLogicLayer.Models.PrintingEditions;
using Store.BusinessLogicLayer.Providers;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.PrintingEdition;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Common.Exceptions;
using Store.Shared.Constants;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Store.Shared.Enums.Enums;
using System.Linq.Dynamic.Core;
using Store.DataAccessLayer.Models.Pagination;

namespace Store.BusinessLogicLayer.Services
{
    public class PrintingEditionService : IPrintingEditionService
    {

        private IPrintingEditionRepository _printingEditionRepository;
        private IAuthorInPrintingEditionService _authorInPrinting;
        private ConvertCurrencyProvider _convertCurrency;
        private IMapper _autoMapper;

        public PrintingEditionService( IAuthorInPrintingEditionService authorInPrinting, IPrintingEditionRepository printingEditionRepository,
                                       ConvertCurrencyProvider convertCurrency, IMapper autoMapper)
                                       
        {
            _printingEditionRepository = printingEditionRepository;
            _authorInPrinting = authorInPrinting;
            _convertCurrency = convertCurrency;
            _autoMapper = autoMapper;
        }

        public async Task CreatePrintingEditionAsync(PrintingEditionModel model)
        {
            

            var existsPrintingEdition = await _printingEditionRepository.GetPrintingEditionByTitleAsync(model.Title);

            if (existsPrintingEdition is not null)
            {
                throw new ServerException(Constants.Errors.ALREADY_EXISTS);
            }

            var printingEdition = _autoMapper.Map<PrintingEdition>(model);
            await _printingEditionRepository.CreateAsync(printingEdition);

            await _authorInPrinting.AddAuthorToPEAsync(model.AuthorsId, printingEdition.Id);
        }

        public async Task DeletePrintingEditionAsync(long id)
        {
            var printingEdition = await _printingEditionRepository.GetByIdAsync(id);
            if (printingEdition is null)
            {
                throw new ServerException(Constants.Errors.PRINTING_EDITION_NOT_FOUND);
            }
            await _printingEditionRepository.DeleteAsync(printingEdition);
        }

        public async Task<PagedResponse<PrintingEditionModel>> GetFilteredPrintingEditionsAsync(PrintingEditionFilterModel model, PaginationFilterModel pagination)
        {
            if (string.IsNullOrWhiteSpace(model.SortBy) && string.IsNullOrWhiteSpace(model.TypeSort))
            {
                model.SortBy = Constants.Sort.DefaultSortById;
                model.TypeSort = Constants.Sort.DefaultSortByAsc;
            }

            (IEnumerable<PrintingEdition> printingEditions, int count) printingEditions = await _printingEditionRepository.GetFilteredPrintingEditionsAsync(model, pagination);

            var printingEditionModel = _autoMapper.Map<IEnumerable<PrintingEditionModel>>(printingEditions.printingEditions);

            if (model.Currency is not null)
            {
                printingEditionModel.ToList().ForEach(item =>
                {
                    item.Price = _convertCurrency.Convert(item.Price.Value, item.Currency.Value, model.Currency);
                    item.Currency = (CurrencyType)model.Currency;
                });

            }

            var pagedResponse = new PagedResponse<PrintingEditionModel>
            {
                Data = printingEditionModel,
                PageNumber = pagination.PageNumber,
                PageSize = pagination.PageSize,
                TotalItems = printingEditions.count
            };

            return pagedResponse;

        }

        public async Task UpdatePrintingEditionAsync(PrintingEditionModel model)
        {
            

            var printingEdition = await GetPrintingEditionByIdAsync(model.Id);

            if (printingEdition is null)
            {
                throw new ServerException(Constants.Errors.PRINTING_EDITION_NOT_FOUND);
            }

            if (model.AuthorsId.Any())
            {
                printingEdition.AuthorInPrintingEdition.Clear();

                model.AuthorsId.ForEach(authorId => printingEdition.AuthorInPrintingEdition.Add(new AuthorInPrintingEdition
                {
                    AuthorId = authorId,
                    PrintingEditionId = model.Id
                }));
            }

            printingEdition.Title = model.Title;
            printingEdition.Description = model.Description;
            printingEdition.Price = model.Price.Value;
            printingEdition.Currency = model.Currency.Value;
            printingEdition.Type = model.Type.Value;

            await _printingEditionRepository.UpdateAsync(printingEdition);

        }

        public async Task<PrintingEdition> GetPrintingEditionByIdAsync(long id)
        {
            if (id <= default(long))
            {
                throw new ServerException(Constants.Errors.PRINTING_EDITION_NOT_FOUND);
            }

            var printingEdition = await _printingEditionRepository.GetPrintingEditionByIdAsync(id);

            return printingEdition;
        }

        public async Task<PrintingEditionModel> GetDataPrintingEditionAsync(long id)
        {

            var printingEdition = await GetPrintingEditionByIdAsync(id);

            if(printingEdition is null)
            {
                throw new ServerException(Constants.Errors.PRINTING_EDITION_NOT_FOUND);
            }

            var printingEditionModel = _autoMapper.Map<PrintingEditionModel>(printingEdition);
            printingEditionModel.AuthorsId = await _authorInPrinting.GetAuthorsIdOfPrintingEditionAsync(id);

            return printingEditionModel;

        }

        public async Task<decimal> GetMaxPricePrintingEditionAsync()
        {
            decimal maxPrice = await _printingEditionRepository.GetMaxPricePrintingEditionAsync();
            return maxPrice;
        }

    }
}
