package com.example.service;

import com.example.entity.Employee;
import java.util.*;

public interface EmployeeService {
    
    Employee createEmployee(Employee employee);

    Employee getEmployee(Long id);

    List<Employee> getEmployees();

    Employee updatEmployee(Long id, Employee employee);

    void deleteEmployee(Long id);

    List<Employee> getEmployees(String name);

}
