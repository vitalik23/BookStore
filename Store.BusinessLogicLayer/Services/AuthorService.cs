using AutoMapper;
using Store.BusinessLogicLayer.Models.Authors;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.Author;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Common.Exceptions;
using Store.Shared.Constants;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
using Store.DataAccessLayer.Models.Pagination;

namespace Store.BusinessLogicLayer.Services
{
    public class AuthorService : IAuthorService
    {
        private IAuthorRepository _authorRepository;
        private IMapper _autoMapper;

        public AuthorService(IAuthorRepository authorRepository, IMapper autoMapper)
        {
            _authorRepository = authorRepository;
            _autoMapper = autoMapper;
        }

        public async Task CreateAuthorAsync(AuthorModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                throw new ServerException(Constants.Errors.NAME_IS_REQUIRED);
            }

            var authorName = await _authorRepository.GetAuthorByNameAsync(model.Name);
            
            if (authorName is not null)
            {
                throw new ServerException(Constants.Errors.ALREADY_EXISTS);
            
            }
            var author = _autoMapper.Map<Author>(model);
            await _authorRepository.CreateAsync(author);
        }

        public async Task DeleteAuthorAsync(long id)
        {
            var author = await _authorRepository.GetByIdAsync(id);
            if (author is null)
            {
                throw new ServerException(Constants.Errors.AUTHOR_NOT_FOUND);
            }
            await _authorRepository.DeleteAsync(author);
        }

        public async Task<PagedResponse<AuthorModel>> GetFilteredAuthorsAsync(AuthorFilterModel model, PaginationFilterModel pagination)
        {
            if (string.IsNullOrWhiteSpace(model.SortBy) && string.IsNullOrWhiteSpace(model.TypeSort))
            {
                model.SortBy = Constants.Sort.DefaultSortById;
                model.TypeSort = Constants.Sort.DefaultSortByAsc;
            }

            (IEnumerable<Author> authors, int count) tupleAuthors = await _authorRepository.GetFilteredAuthorsAsync(model, pagination);

            var authorModel = _autoMapper.Map<IEnumerable<AuthorModel>>(tupleAuthors.authors);

            var pagedResponse = new PagedResponse<AuthorModel>
            {
                Data = authorModel,
                PageNumber = pagination.PageNumber,
                PageSize = pagination.PageSize,
                TotalItems = tupleAuthors.count
            };

            return pagedResponse;

        }

        public async Task<AuthorModel> GetAuthorAsync(long id)
        {
            var author = await _authorRepository.GetByIdAsync(id);

            if (author is null)
            {
                throw new ServerException(Constants.Errors.AUTHOR_NOT_FOUND);
            }

            var authorModel = _autoMapper.Map<AuthorModel>(author);

            return authorModel;
        }

        public async Task UpdateAuthorAsync(AuthorModel model)
        {
            var author = await _authorRepository.GetByIdAsync(model.Id);

            if(author is null)
            {
                throw new ServerException(Constants.Errors.AUTHOR_NOT_FOUND);
            }

            if (!string.IsNullOrWhiteSpace(model.Name))
            {
                author.Name = model.Name;
            }

            await _authorRepository.UpdateAsync(author);
        }

        public async Task<IEnumerable<AuthorModel>> GetAllAuthorsAsync()
        {
            var allAuthors = _autoMapper.Map<IEnumerable<AuthorModel>>(await _authorRepository.GetAsync());
            return allAuthors;
        }

    }
}
