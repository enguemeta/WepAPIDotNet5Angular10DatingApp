using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class LoginDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        //[RegularExpression]
        public string Password { get; set; }
        
        
        
        
    }
}