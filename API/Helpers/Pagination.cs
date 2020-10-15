using System.Collections.Generic;
using API.Dtos;

namespace API.Helpers
{
    public class Pagination<T>  where T:class 
    {
        public Pagination(int pageIndex, int pageSize, int count, IReadOnlyCollection<ProductToReturnDto> data)
        {
            PageIndex = pageIndex;
            PageSize = pageSize;
            Count = count;
            Data = data;
        }

        public int PageIndex { get; set; }
        public int PageSize{get;set;}
        public int Count { get; set; }
        public IReadOnlyCollection<ProductToReturnDto> Data { get; set; }
    }
} 