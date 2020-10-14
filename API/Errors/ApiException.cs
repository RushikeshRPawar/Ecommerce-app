namespace API.Errors
{
    public class ApiException : ApiResponse
    {
        private readonly int _statusCode;
        private readonly string _message;
        public string Details {get;set;}
        public ApiException(int statusCode, string message = null, string details = null) : base(statusCode, message)
        {
            Details = details;
            _message = message;
            _statusCode = statusCode;
        }
    }
}