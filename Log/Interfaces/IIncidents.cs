using Incidents.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Incidents.Interfaces
{
    public interface IIncidents
    {
        IEnumerable<Incidents> GetAllIncidents();
        int AddIncidents(Incidents incidents);
        //int UpdateEmployee(Employee employee);
        //Incidents GetEmployeeData(int id);
        //int DeleteEmployee(int id);
        //List<City> GetCities();
    }
}
