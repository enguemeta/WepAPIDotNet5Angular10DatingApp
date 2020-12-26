using System;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime dateOdBirth){
             var today = DateTime.Now;
             var age = today.Year - dateOdBirth.Year;
             if(dateOdBirth.Date > today.AddYears(-age)) age--;
             return age;
        }
    }
}