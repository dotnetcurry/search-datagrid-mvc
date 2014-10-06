using A3_DataSearch.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace A3_DataSearch.Controllers
{
    public class PeopleSearchController : ApiController
    {

        ApplicationEntities ctx;

        public PeopleSearchController()
        {
            ctx = new ApplicationEntities(); 
        }

        /// <summary>
        /// The Method Perform
        /// PersonInfo serach based upon the Field and its value
        /// </summary>
        /// <param name="field"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        [Route("Persons/{field}/{value}")]
        public List<PersonInfo> GetPersonInfo(string field, string value)
        {
            List<PersonInfo> Res = new List<PersonInfo>();
            if (value.Length != 0)
            { 
            
            Res = (from per in ctx.PersonInfoes.ToList()
                      where GetPropertyValueForObject(per, field).ToString().StartsWith(value)
                      select per).ToList();
            }

            return Res;
        }

        /// <summary>
        /// The Method Perform
        /// PersonInfo serach based upon the Field and its value
        /// </summary>
        /// <param name="field"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        [Route("Persons")]
        public List<PersonInfo> GetPersonInfo()
        {
            List<PersonInfo> Res = new List<PersonInfo>();
             

                Res = (from per in ctx.PersonInfoes.ToList()
                                              select per).ToList();

            return Res;
        }

        /// <summary>
        /// Method to Get Distinct values for properties
        /// Te value property is passed through the field 
        /// </summary>
        /// <param name="field"></param>
        /// <returns></returns>
        [Route("Person/{field}")]
        public List<string> GetPropertyValues(string field)
        {
            List<string> propertyValues = new List<string>();

           var res = (from p in ctx.PersonInfoes.ToList()
                             select GetPropertyValueForObject(p, field)).ToList().Distinct();

           foreach (var item in res)
            {
                propertyValues.Add(item.ToString());
            }

            return propertyValues;
        }



        /// <summary>
        /// Helper Method to Perform serach on any Property and its any value
        /// </summary>
        /// <param name="src"></param>
        /// <param name="propName"></param>
        /// <returns></returns>
        static object GetPropertyValueForObject(object src, string pName)
        {
            var val = src.GetType().GetProperty(pName).GetValue(src, null);
            return val;
        }
    }
}
 