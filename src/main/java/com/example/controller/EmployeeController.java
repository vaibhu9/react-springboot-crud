package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.entity.Employee;
import com.example.service.EmployeeService;
import java.util.*;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class EmployeeController {
    
    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee){
        return employeeService.createEmployee(employee);
    }

    @GetMapping
    public List<Employee> getEmployees(){
        return employeeService.getEmployees();
    }

    @GetMapping("/{id}")
    public Employee getEmployee(@PathVariable Long id){
        return employeeService.getEmployee(id);
    }

    @PutMapping("/{id}")
    public Employee updatEmployee(@PathVariable Long id, @RequestBody Employee employee){
        return employeeService.updatEmployee(id, employee);
    }

    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id){
        employeeService.deleteEmployee(id);
        return "Employee deleted with give id : "+id;
    }

    @GetMapping("/by-name")
    public List<Employee> getEmployeesByNameContaining(@RequestParam(value = "name", required = false) String name) {
        return employeeService.getEmployees(name);
    }
}
